"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);

  const [doctor, setDoctor] = useState("");

  const [appointmentDate,
    setAppointmentDate] =
    useState("");

  const [timeSlot, setTimeSlot] =
    useState("");

    useEffect(() => {
  fetchDoctors();
}, []);

const fetchDoctors = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/users/doctors"
    );

    setDoctors(response.data);

  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async (
    e: any
  ) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/appointments",

        {
          doctor,
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
      setDoctor("");
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

    <select
      className="w-full border p-4 rounded-xl"
      value={doctor}
      onChange={(e)=>setDoctor(e.target.value)}
      required
    >
      <option value="">Select Doctor</option>

      {doctors.map((doctor: any) => (

  <option
    key={doctor._id}
    value={doctor._id}
  >
    {doctor.name}
  </option>

      ))}
    </select>

          <input
            type="date"
            className="w-full border p-4 rounded-xl"
            min={new Date().toISOString().split("T")[0]}
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
    <select
      className="w-full border p-4 rounded-xl"
      value={timeSlot}
      onChange={(e) => setTimeSlot(e.target.value)}
      required
    >

      <option value="">
        Select Time
      </option>

      <option>09:00 AM</option>
      <option>10:00 AM</option>
      <option>11:00 AM</option>
      <option>12:00 PM</option>
      <option>02:00 PM</option>
      <option>03:00 PM</option>
      <option>04:00 PM</option>
      <option>05:00 PM</option>

    </select>

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