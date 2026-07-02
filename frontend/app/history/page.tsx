"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

export default function HistoryPage() {

  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState("");

  const [doctorName, setDoctorName] = useState("");

  const [appointmentDate, setAppointmentDate] = useState("");

  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, [currentPage]);

  
    const cancelAppointment = async (id: string) => {

      if (
        !window.confirm(
          "Are you sure you want to cancel this appointment?"
        )
      ) {
        return;
      }

      try {

        await axios.put(
          `http://localhost:5000/api/appointments/cancel/${id}`,
          {},
          {
            withCredentials: true,
          }
        );

        toast.success(
          "Appointment cancelled successfully"
        );

       

        fetchAppointments();

      } catch (error) {

        toast.error(
          "Failed to cancel appointment"
        );

      }
    };

     const updateAppointment = async () => {

  try {

    await axios.put(
      `http://localhost:5000/api/appointments/update/${editingId}`,
      {
        doctorName,
        appointmentDate,
        timeSlot,
      },
      {
        withCredentials: true,
      }
    );

    toast.success("Appointment updated successfully");

    setEditingId("");
    fetchAppointments();

  } catch (error) {

    toast.error("Failed to update appointment");

  }

};

    const fetchAppointments = async () => {
    setLoading(true);


    try {

      const response =
       await axios.get(
        `http://localhost:5000/api/appointments/my?page=${currentPage}`,
        {
          withCredentials: true,
        }
      );

      setAppointments(response.data.appointments);
      setTotalPages(response.data.totalPages);
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

      {editingId && (

  <div className="bg-white p-6 rounded-3xl shadow-lg mb-8">

    <h2 className="text-2xl font-bold mb-5">
      Edit Appointment
    </h2>

    <input
      type="text"
      value={doctorName}
      onChange={(e) =>
        setDoctorName(e.target.value)
      }
      className="w-full border p-3 rounded-xl mb-4"
      placeholder="Doctor Name"
    />

    <input
      type="date"
      value={appointmentDate}
      onChange={(e) =>
        setAppointmentDate(e.target.value)
      }
      className="w-full border p-3 rounded-xl mb-4"
    />

    <input
      type="text"
      value={timeSlot}
      onChange={(e) =>
        setTimeSlot(e.target.value)
      }
      className="w-full border p-3 rounded-xl mb-4"
      placeholder="Time Slot"
    />

    <button
      onClick={updateAppointment}
      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
    >
      Save Changes
    </button>

  </div>

)}

      {appointments.length === 0 ? (

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h2 className="text-2xl font-semibold">
            No Appointments Found
          </h2>

        </div>

      ) : (

        <div className="grid gap-6">

          {appointments.map((appointment: any) => (

            <div
              key={appointment._id}
              className="bg-white p-6 rounded-3xl shadow-lg"
            >

              <h2 className="text-2xl font-bold">
                Dr. {appointment.doctorName}
              </h2>

              <p>
                Date:{" "}
                {new Date(
                  appointment.appointmentDate
                ).toLocaleDateString("en-GB")}
              </p>

              <p>
                Time: {appointment.timeSlot}
              </p>

              <p>
                Symptoms: {appointment.symptoms}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span className="font-semibold">
                  {appointment.status}
                </span>
              </p>

              {appointment.status === "pending" && (

                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() =>
                      cancelAppointment(
                        appointment._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                  >
                    Cancel Appointment
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(
                        appointment._id
                      );

                      setDoctorName(
                        appointment.doctorName
                      );

                      setAppointmentDate(
                        appointment.appointmentDate?.split(
                          "T"
                        )[0]
                      );

                      setTimeSlot(
                        appointment.timeSlot
                      );
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                  >
                    Edit
                  </button>

                </div>

              )}

            </div>

          ))}

          <div className="flex justify-center items-center gap-4 mt-8">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

      )}

    </div>

  );

}