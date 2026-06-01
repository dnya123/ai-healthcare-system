"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "@/components/dashboard/Sidebar";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/appointments/my",
        {
          withCredentials: true,
        }
      );

      setAppointments(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Patient Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <DashboardCard
            title="Appointments"
            value={appointments.length.toString()}
          />

          <DashboardCard
            title="Reports"
            value="5"
          />

          <DashboardCard
            title="Prescriptions"
            value="8"
          />

        </div>

      </div>

    </div>
  );
}