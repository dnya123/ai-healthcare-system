"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentsPage() {

  const [appointments,
    setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/appointments",
          {
            withCredentials: true,
          }
        );

      setAppointments(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteAppointment =
    async (id: string) => {

      if (
        !confirm(
          "Delete this appointment?"
        )
      ) {
        return;
      }

      try {

        await axios.delete(
          `http://localhost:5000/api/admin/appointments/${id}`,
          {
            withCredentials: true,
          }
        );

        fetchAppointments();

      } catch (error) {
        console.log(error);
      }
    };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Manage Appointments
      </h1>

      <div className="grid gap-6">

        {appointments.map(
          (appointment: any) => (

            <div
              key={appointment._id}
              className="bg-white p-6 rounded-3xl shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                {
                  appointment.patient?.name
                }
              </h2>

              <p>
                {
                  appointment.patient?.email
                }
              </p>

              <p>
                Doctor:
                {" "}
                {
                  appointment.doctorName
                }
              </p>

              <p>
                Status:
                {" "}
                {
                  appointment.status
                }
              </p>

              <button
                onClick={() =>
                  deleteAppointment(
                    appointment._id
                  )
                }
                className="bg-red-500 text-white px-5 py-2 rounded-xl mt-4"
              >
                Delete Appointment
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}