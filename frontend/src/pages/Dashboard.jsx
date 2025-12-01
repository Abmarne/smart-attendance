import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard(){
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex gap-6">
        <div className="card flex-1">
          <h3 className="text-sm text-[var(--color-muted)]">Total Students</h3>
          <div className="text-3xl font-semibold mt-2">452</div>
        </div>
        <div className="card flex-1">
          <h3 className="text-sm text-[var(--color-muted)]">Today's Attendance</h3>
          <div className="text-3xl font-semibold mt-2">388</div>
        </div>
        <div className="card flex-1">
          <h3 className="text-sm text-[var(--color-muted)]">Avg Attendance</h3>
          <div className="text-3xl font-semibold mt-2">86%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card col-span-2">
          <h4 className="text-lg font-medium mb-4">Attendance Trend</h4>
          <div className="h-48 bg-[rgba(0,0,0,0.04)] rounded-lg flex items-center justify-center text-[var(--color-muted)]">[Chart placeholder]</div>
        </div>

        <div className="card">
          <h4 className="text-lg font-medium mb-4">Students At Risk</h4>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div>
                <div className="font-medium">Ravi Kumar</div>
                <div className="text-sm text-[var(--color-muted)]">Roll: 2101</div>
              </div>
              <div className="text-sm text-[var(--color-warning)]">72%</div>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <div className="font-medium">Asha Patel</div>
                <div className="text-sm text-[var(--color-muted)]">Roll: 2045</div>
              </div>
              <div className="text-sm text-[var(--color-warning)]">71%</div>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to="/mark" className="btn-primary">Mark Attendance</Link>
        <Link to="/students" className="btn-ghost">Student List</Link>
      </div>
    </div>
  );
}
