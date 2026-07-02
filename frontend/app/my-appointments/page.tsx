"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "@/components/appointments/AppointmentCard";

export default function MyAppointmentsPage() {

  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments = async () => {

    try {

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/my`,
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

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Appointments
      </h1>

      {appointments.length === 0 ? (

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-3xl font-semibold mb-3">
            No Appointments Found
          </h2>

          <p className="text-gray-500">
            Book your first appointment
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {appointments.map(
            (appointment: any) => (

              <AppointmentCard
                key={appointment._id}
                doctorName={
                  appointment.doctorName
                }
                appointmentDate={
                  appointment.appointmentDate
                }
                timeSlot={
                  appointment.timeSlot
                }
                status={
                  appointment.status
                }
              />
            )
          )}

        </div>

      )}

    </div>
  );
}