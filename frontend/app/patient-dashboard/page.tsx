"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default function PatientDashboard() {
  const router = useRouter();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

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

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.appointments || [];

      setAppointments(data);
    } catch (error) {
      console.log(error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  

  // Analytics
  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (a) => a.status === "confirmed"
  ).length;

  const completedAppointments = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  const cancelledAppointments = appointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  // Pagination
  const indexOfLastAppointment =
    currentPage * appointmentsPerPage;

  const indexOfFirstAppointment =
    indexOfLastAppointment - appointmentsPerPage;

  const currentAppointments =
    appointments.slice(
      indexOfFirstAppointment,
      indexOfLastAppointment
    );

  const totalPages = Math.ceil(
    appointments.length / appointmentsPerPage
  );

  if (loading) {
    return <LoadingSpinner />;
  }


return (
  <div className="flex">

    <Sidebar />

    <div className="flex-1 p-8">
      <h1 className="text-5xl font-bold mb-10">
        Patient Dashboard
      </h1>

      <div className="flex gap-4 mb-8">

        

      </div>

      {/* Navigation */}

      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <Link
          href="/history"
          className="bg-card text-card-foreground p-6 rounded-3xl shadow-lg border hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold text-blue-600">
            📋 Appointment History
          </h2>

          <p className="text-muted-foreground mt-2">
            View all your previous appointments
          </p>

        </Link>

        <Link
          href="/profile"
          className="bg-card text-card-foreground p-6 rounded-3xl shadow-lg border hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold text-purple-600">
            👤 My Profile
          </h2>

          <p className="text-muted-foreground mt-2">
            Manage your account information
          </p>

        </Link>

      </div>

      {/* Analytics */}

      <div className="grid md:grid-cols-5 gap-6 mb-10">

        <div className="bg-card p-6 rounded-3xl shadow-lg border">
          <h2 className="text-lg font-semibold">
            Total
          </h2>

          <p className="text-4xl font-bold mt-3">
            {totalAppointments}
          </p>
        </div>

        <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg font-semibold">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-3">
            {pendingAppointments}
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg font-semibold">
            Confirmed
          </h2>

          <p className="text-4xl font-bold mt-3">
            {confirmedAppointments}
          </p>
        </div>

        <div className="bg-green-100 dark:bg-green-900 p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg font-semibold">
            Completed
          </h2>

          <p className="text-4xl font-bold mt-3">
            {completedAppointments}
          </p>
        </div>

        <div className="bg-red-100 dark:bg-red-900 p-6 rounded-3xl shadow-lg">
          <h2 className="text-lg font-semibold">
            Cancelled
          </h2>

          <p className="text-4xl font-bold mt-3">
            {cancelledAppointments}
          </p>
        </div>

      </div>

      {/* Recent Appointments */}

      <h2 className="text-3xl font-bold mb-6">
        Recent Appointments
      </h2>

      {appointments.length === 0 ? (

        <div className="bg-card p-6 rounded-3xl shadow-lg border">
          No appointments found
        </div>

      ) : (

        <>
          <div className="grid gap-6">

            {currentAppointments.map((appointment: any) => (

              <div
                key={appointment._id}
                className="bg-card text-card-foreground p-6 rounded-3xl shadow-lg border hover:shadow-xl transition"
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
                        : appointment.status === "confirmed"
                        ? "bg-blue-500"
                        : appointment.status === "completed"
                        ? "bg-green-500"
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

          {/* Pagination */}

          {totalPages > 1 && (

            <div className="flex justify-center items-center gap-3 mt-10">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>

                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
                className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>

            </div>

          )}

        </>

      )}

       </div>
    </div>
  );
}