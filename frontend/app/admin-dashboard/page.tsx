"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    appointments: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

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
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

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