import React, { useEffect, useState } from "react";

export default function StudentList(){
  const [students, setStudents] = useState([]);

  useEffect(()=> {
    async function load(){
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    }
    load();
  }, []);

  return (
    <div className="card max-w-5xl mx-auto">
      <h3 className="text-lg font-medium mb-4">Students</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-[var(--color-muted)]">
              <th className="py-2">Photo</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.roll} className="border-t">
                <td className="py-3"><div className="w-12 h-12 rounded-lg bg-[rgba(0,0,0,0.04)]" /></td>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.attendance}%</td>
                <td><button className="btn-ghost">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
