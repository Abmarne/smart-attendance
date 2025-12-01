import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherLogin(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // call backend /api/login — here we stub
    // TODO: replace with real API call
    nav("/");
  };

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-2 gap-8 items-center">
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Welcome back, Teacher</h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">Sign in to manage attendance</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 rounded-lg border" placeholder="teacher@school.edu" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 rounded-lg border" placeholder="•••••••" />
          </div>

          <div className="flex items-center justify-between">
            <button className="btn-primary">Login</button>
            <a className="text-sm text-[var(--color-muted)]">Forgot?</a>
          </div>
        </form>
      </div>

      <div className="card flex items-center justify-center">
        <div className="text-center">
          <div className="h-48 w-48 bg-[var(--color-primary)] rounded-full mb-4 opacity-10" />
          <h3 className="text-lg font-medium">Face Recognition</h3>
          <p className="text-sm text-[var(--color-muted)] mt-2">Quickly mark attendance using webcam</p>
        </div>
      </div>
    </div>
  );
}
