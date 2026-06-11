"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AdminDashboard() {

  const router = useRouter();

  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    setLoading(true);

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/stats",
          {
            withCredentials: true,
          }
        );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const logout = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      router.push("/login");

    } catch (error) {

      console.log(error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="flex gap-4 mb-10">

        <Link
          href="/admin-dashboard/users"
          className="bg-blue-500 text-white px-5 py-3 rounded-xl"
        >
          Manage Users
        </Link>

        <Link
          href="/admin-dashboard/appointments"
          className="bg-green-500 text-white px-5 py-3 rounded-xl"
        >
          Manage Appointments
        </Link>

        <Link
          href="/profile"
          className="bg-purple-500 text-white px-5 py-3 rounded-xl"
        >
          Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Users
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.users}
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Doctors
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.doctors}
          </p>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-xl font-semibold">
            Total Appointments
          </h2>

          <p className="text-5xl font-bold mt-4">
            {stats.appointments}
          </p>

        </div>

      </div>

    </div>
  );
}