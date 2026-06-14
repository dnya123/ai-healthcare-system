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
      <div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Recent Appointments
  </h2>

  {appointments.length === 0 ? (

    <div className="bg-white p-6 rounded-3xl shadow-lg">
      No appointments found
    </div>

  ) : (

    <div className="grid gap-6">

  {appointments.map((appointment: any) => (

    <div
      key={appointment._id}
      className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition"
    >

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          👨‍⚕️ Dr. {appointment.doctorName}
        </h2>

        <span
          className={`px-4 py-1 rounded-full text-white text-sm font-semibold
          ${
            appointment.status === "pending"
              ? "bg-yellow-500"
              : appointment.status === "completed"
              ? "bg-green-500"
              : appointment.status === "confirmed"
              ? "bg-blue-500"
              : "bg-red-500"
          }`}
        >
          {appointment.status}
        </span>

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <p>
          📅 <strong>Date:</strong>{" "}
          {new Date(
            appointment.appointmentDate
          ).toLocaleDateString("en-GB")}
        </p>

        <p>
          ⏰ <strong>Time:</strong>{" "}
          {appointment.timeSlot}
        </p>

      </div>

    </div>

       ))}

    </div>

  )}

</div>

</div>

);
}
