"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/dashboard/Sidebar";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/doctor",
        {
          withCredentials: true,
        }
      );

      setPatients(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          My Patients
        </h1>

        {patients.length === 0 ? (

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            No Patients Found
          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-4 text-left">Patient</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Appointment Date</th>
                  <th className="p-4 text-left">Time Slot</th>
                  <th className="p-4 text-left">Status</th>
                </tr>

              </thead>

              <tbody>

                {patients.map((appointment: any) => (

                  <tr
                    key={appointment._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4 font-semibold">
                      {appointment.patient?.name}
                    </td>

                    <td className="p-4">
                      {appointment.patient?.email}
                    </td>

                    <td className="p-4">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString("en-GB")}
                    </td>

                    <td className="p-4">
                      {appointment.timeSlot}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm
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

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </div>
  );
}