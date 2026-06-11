"use client";

import { useState } from "react";
import axios from "axios";

export default function AppointmentsPage() {

  const [doctorName, setDoctorName] =
    useState("");

  const [appointmentDate,
    setAppointmentDate] =
    useState("");

  const [timeSlot, setTimeSlot] =
    useState("");

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/appointments",

        {
          doctorName,
          appointmentDate,
          timeSlot,
        },

        {
          withCredentials: true,
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      toast.success(response.data.message);

      // CLEAR FORM
      setDoctorName("");
      setAppointmentDate("");
      setTimeSlot("");

    } catch (error: any) {

      toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold mb-8">
          Book Appointment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Doctor Name"
            className="w-full border p-4 rounded-xl"
            value={doctorName}
            onChange={(e) =>
              setDoctorName(
                e.target.value
              )
            }
            required
          />

          <input
            type="date"
            className="w-full border p-4 rounded-xl"
            value={appointmentDate}
            onChange={(e) =>
              setAppointmentDate(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Time Slot"
            className="w-full border p-4 rounded-xl"
            value={timeSlot}
            onChange={(e) =>
              setTimeSlot(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl w-full hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>

        </form>

      </div>

    </div>
  );
}