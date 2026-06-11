"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HistoryPage() {

  const [appointments,
    setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/appointments/my",
          {
            withCredentials: true,
          }
        );

      setAppointments(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

      if (loading) {
      return <LoadingSpinner />;
    }
  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Appointment History
      </h1>

      {appointments.length === 0 ? (

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-semibold">
            No Appointments Found
          </h2>

        </div>

      ) : (

        <div className="grid gap-6">

          {appointments.map(
            (appointment: any) => (

              <div
                key={appointment._id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">
                  Dr. {appointment.doctorName}
                </h2>

                <p>
                  Date:
                  {" "}
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString("en-GB")}
                </p>

                <p>
                  Time:
                  {" "}
                  {appointment.timeSlot}
                </p>

                <p>
                  Symptoms:
                  {" "}
                  {appointment.symptoms}
                </p>

                <p className="mt-2">

                  Status:
                  {" "}

                  <span className="font-semibold">
                    {appointment.status}
                  </span>

                </p>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
}