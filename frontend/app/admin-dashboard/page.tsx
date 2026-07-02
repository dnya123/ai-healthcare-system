"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import DarkModeButton from "@/components/DarkModeButton";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
} from "react-icons/fa";
import Sidebar from "@/components/dashboard/Sidebar";

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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
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
  <div className="flex">

    <Sidebar />

    <div className="flex-1 p-10">
      {/* Header */}

      <div className="flex justify-between items-start mb-8">

        <div>

          <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-3">
            Today: {new Date().toLocaleDateString()}
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
            Welcome Admin 👋
            <br />
            Manage users, doctors and appointments from one place.
          </p>

        </div>

        

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-blue-500 text-white p-6 rounded-3xl shadow-lg">

          <div className="flex items-center gap-3 mb-4">
            <FaUsers size={40} />
            <h2 className="text-xl font-semibold">
              Total Users
            </h2>
          </div>

          <p className="text-5xl font-bold">
            {stats.users}
          </p>

        </div>

        <div className="bg-green-500 text-white p-6 rounded-3xl shadow-lg">

          <div className="flex items-center gap-3 mb-4">
            <FaUserMd size={40} />
            <h2 className="text-xl font-semibold">
              Total Doctors
            </h2>
          </div>

          <p className="text-5xl font-bold">
            {stats.doctors}
          </p>

        </div>

        <div className="bg-purple-500 text-white p-6 rounded-3xl shadow-lg">

          <div className="flex items-center gap-3 mb-4">
            <FaCalendarCheck size={40} />
            <h2 className="text-xl font-semibold">
              Total Appointments
            </h2>
          </div>

          <p className="text-5xl font-bold">
            {stats.appointments}
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="text-3xl font-bold mb-5 text-gray-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-4 gap-5">

        <Link
          href="/admin-dashboard/users"
          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-2xl text-center transition"
        >
          Manage Users
        </Link>

        <Link
          href="/admin-dashboard/appointments"
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl text-center transition"
        >
          Manage Appointments
        </Link>

        <Link
          href="/profile"
          className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-2xl text-center transition"
        >
          My Profile
        </Link>


      </div>

        </div>

  </div>
);
}