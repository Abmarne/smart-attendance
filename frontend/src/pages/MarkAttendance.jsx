import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function MarkAttendance(){
  const webcamRef = useRef(null);
  const [snap, setSnap] = useState(null);
  const [status, setStatus] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSnap(imageSrc);
  }, [webcamRef, setSnap]);

  const submitImage = async () => {
    setStatus("Uploading...");
    try {
      // send base64 to backend
      const res = await fetch("/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: snap })
      });
      const json = await res.json();
      setStatus("Done: " + (json.detected?.length || 0) + " detected");
    } catch (err) {
      setStatus("Error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Camera Preview</h3>
        <div className="flex gap-6">
          <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="rounded-lg border" />
            <div className="mt-3 flex gap-3">
              <button onClick={capture} className="btn-primary">Capture</button>
              <button onClick={() => { setSnap(null); setStatus(null); }} className="btn-ghost">Reset</button>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm text-[var(--color-muted)]">Captured</h4>
            <div className="mt-2">
              {snap ? (
                <>
                  <img src={snap} alt="capture" className="rounded-lg border max-h-64 object-contain" />
                  <div className="mt-3">
                    <button onClick={submitImage} className="btn-primary">Send to Server</button>
                    <div className="text-sm mt-2 text-[var(--color-muted)]">Status: {status || "Idle"}</div>
                  </div>
                </>
              ) : (
                <div className="h-48 bg-[rgba(0,0,0,0.04)] rounded-lg flex items-center justify-center text-[var(--color-muted)]">No capture</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
