"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          withCredentials: true,
        }
      );

      setRole(response.data.role);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-blue-700 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        AI HealthCare
      </h1>

      <div className="flex flex-col gap-5">

        {/* ADMIN */}

        {role === "admin" && (
          <>
            <Link href="/admin-dashboard">
              Dashboard
            </Link>

            <Link href="/admin-dashboard/users">
              Manage Users
            </Link>

            <Link href="/admin-dashboard/appointments">
              Appointments
            </Link>
          </>
        )}

        {/* DOCTOR */}

        {role === "doctor" && (
          <>
            <Link href="/doctor-dashboard">
              Dashboard
            </Link>

            <Link href="/doctor-dashboard/appointments">
              Appointments
            </Link>

            <Link href="/doctor-dashboard/patients">
              Patients
            </Link>
          </>
        )}

        {/* PATIENT */}

        {role === "patient" && (
          <>
            <Link href="/patient-dashboard">
              Dashboard
            </Link>

            <Link href="/history">
              Appointment History
            </Link>
          </>
        )}

        {/* COMMON LINKS */}

        <Link href="/profile">
          My Profile
        </Link>

        <Link href="/change-password">
          Change Password
        </Link>

      </div>

    </div>
  );
}