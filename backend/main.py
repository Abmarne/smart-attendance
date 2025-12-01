# backend/main.py
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from typing import List, Dict
from io import BytesIO
from PIL import Image
import uvicorn

app = FastAPI(title="Smart Attendance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# --- in-memory stub DB ---
STUDENTS = [
    {"roll": "2101", "name": "Ravi Kumar", "attendance": 72},
    {"roll": "2045", "name": "Asha Patel", "attendance": 71},
    {"roll": "2122", "name": "Mira Singh", "attendance": 95}
]

class LoginPayload(BaseModel):
    email: str
    password: str

@app.post("/api/login")
async def login(payload: LoginPayload):
    # stub auth - replace with real auth
    return {"ok": True, "token": "fake-jwt-token"}

@app.get("/api/students")
async def get_students():
    return STUDENTS

@app.post("/api/attendance/mark")
async def mark_attendance(payload: Dict):
    """
    Expecting JSON with {"image": "data:image/jpeg;base64,...."}
    We'll decode the image and (optionally) run face recognition / detection.
    """
    image_b64 = payload.get("image", "")
    if not image_b64:
        return {"error":"no image"}
    # strip header if present
    if "," in image_b64:
        header, image_b64 = image_b64.split(",", 1)
    try:
        img_bytes = base64.b64decode(image_b64)
        img = Image.open(BytesIO(img_bytes)).convert("RGB")
        # Save or process image:
        # img.save("last_capture.jpg")
    except Exception as e:
        return {"error": str(e)}

    # PLACEHOLDER: implement face recognition here
    # Example (pseudo):
    # detected_students = run_face_recognition(img)
    # For now return stub:
    detected = [
        {"roll":"2101","name":"Ravi Kumar"},
        {"roll":"2122","name":"Mira Singh"}
    ]
    # You should update attendance records accordingly in a real DB
    return {"ok": True, "detected": detected, "count": len(detected)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
