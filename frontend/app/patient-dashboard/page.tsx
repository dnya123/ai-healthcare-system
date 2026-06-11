"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function PatientDashboard() {

  const [appointments, setAppointments] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    setLoading(true);

    try {

      const response = await axios.get(
        "http://localhost:5000/api/appointments/my",
        {
          withCredentials: true,
        }
      );

      console.log(
        "Appointments:",
        response.data
      );

      setAppointments(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "confirmed"
    ).length;

  const completedAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "completed"
    ).length;

  const cancelledAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "cancelled"
    ).length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Patient Dashboard
      </h1>

      {/* Navigation Cards */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <Link
          href="/history"
          className="
            bg-white
            p-6
            rounded-3xl
            shadow-lg
            hover:shadow-2xl
            transition
            border-l-8
            border-blue-500
          "
        >
          <h2 className="text-2xl font-bold text-blue-600">
            📋 Appointment History
          </h2>

          <p className="text-gray-600 mt-2">
            View all your previous appointments
          </p>

        </Link>

        <Link
          href="/profile"
          className="
            bg-white
            p-6
            rounded-3xl
            shadow-lg
            hover:shadow-2xl
            transition
            border-l-8
            border-purple-500
          "
        >
          <h2 className="text-2xl font-bold text-purple-600">
            👤 My Profile
          </h2>

          <p className="text-gray-600 mt-2">
            Manage your account information
          </p>

        </Link>

      </div>

      {/* Analytics Cards */}

      <div className="grid md:grid-cols-5 gap-6">

        <div className="bg-white p-6 rounded-3xl shadow-lg">

          <h2 className="text-lg font-semibold">
            Total Appointments
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalAppointments}
          </p>

        </div>

        <div className="bg-yellow-100 p-6 rounded-3xl shadow-lg">

          <h2 className="text-lg font-semibold">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-3">
            {pendingAppointments}
          </p>

        </div>

        <div className="bg-blue-100 p-6 rounded-3xl shadow-lg">

          <h2 className="text-lg font-semibold">
            Confirmed
          </h2>

          <p className="text-4xl font-bold mt-3">
            {confirmedAppointments}
          </p>

        </div>

        <div className="bg-green-100 p-6 rounded-3xl shadow-lg">

          <h2 className="text-lg font-semibold">
            Completed
          </h2>

          <p className="text-4xl font-bold mt-3">
            {completedAppointments}
          </p>

        </div>

        <div className="bg-red-100 p-6 rounded-3xl shadow-lg">

          <h2 className="text-lg font-semibold">
            Cancelled
          </h2>

          <p className="text-4xl font-bold mt-3">
            {cancelledAppointments}
          </p>

        </div>

      </div>

    </div>

  );
}