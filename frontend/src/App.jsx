// frontend/src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TeacherLogin from "./pages/TeacherLogin";
import Dashboard from "./pages/Dashboard";
import MarkAttendance from "./pages/MarkAttendance";
import StudentList from "./pages/StudentList";
import { useTheme } from "./theme/ThemeContext";

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen">
      <nav className="w-full h-16 flex items-center justify-between px-6 bg-[var(--color-surface)] border-b" role="navigation">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">Smart Attendance</Link>
        </div>
        <div className="flex items-center gap-3">
          <select value={theme} onChange={(e)=>setTheme(e.target.value)} className="p-2 rounded-md border">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="soft">Soft</option>
          </select>
        </div>
      </nav>

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<TeacherLogin/>}/>
          <Route path="/mark" element={<MarkAttendance/>}/>
          <Route path="/students" element={<StudentList/>}/>
        </Routes>
      </div>
    </div>
  );
}
