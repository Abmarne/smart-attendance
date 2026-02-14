import logging

from passlib.context import CryptContext
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from app.core.config import settings

logger = logging.getLogger(__name__)
security = HTTPBearer(auto_error=False)

JWT_SECRET = settings.JWT_SECRET
JWT_ALGORITHM = settings.JWT_ALGORITHM

MAX_BCRYPT_BYTES = 72


def _normalize_password(password: str) -> str:
    """
    Ensure password does not exceed bcrypt 72-byte limit.
    """
    encoded = password.encode("utf-8")
    if len(encoded) > MAX_BCRYPT_BYTES:
        raise ValueError("Password too long")
    return password


def decode_jwt_token(token: str):
    try:
        if token.startswith("Bearer "):
            token = token.split(" ")[1]

        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM],
        )
        return payload
    except JWTError as e:
        logger.debug("JWT decode error: %s", e)
        return None


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    if not credentials or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = credentials.credentials
    payload = decode_jwt_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Minimal payload expectation: {"sub": "<user_id>", "role": "student"}
    user_id = payload.get("sub") or payload.get("user_id")
    role = payload.get("role")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    # Return a lightweight user object (can extend with email/name if in payload)
    return {"id": user_id, "role": role, "email": payload.get("email")}


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    password = _normalize_password(password)
    return pwd_context.hash(password)



def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        plain_password = _normalize_password(plain_password)
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError:
        return False

