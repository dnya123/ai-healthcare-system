"use client";

import Link from "next/link";

export default function Sidebar() {
  return (

    <div className="w-64 min-h-screen bg-blue-600 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        AI HealthCare
      </h1>

      <div className="flex flex-col gap-5">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/appointments">
          Appointments
        </Link>

        <Link href="/reports">
          Medical Reports
        </Link>

        <Link href="/prescriptions">
          Prescriptions
        </Link>

        <Link href="/profile">
          Profile
        </Link>

      </div>

    </div>
  );
}