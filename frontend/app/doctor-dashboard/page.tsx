"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/appointments/all",
        {
          withCredentials: true,
        }
      );

      setAppointments(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/appointments/status/${id}`,
        { status },
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
        Doctor Dashboard
      </h1>

      {appointments.length === 0 ? (

        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">

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

                <h2 className="text-2xl font-bold mb-2">
                  Dr. {appointment.doctorName}
                </h2>

                <p className="text-gray-600">
                  Patient: {appointment.patient?.name}
                </p>

                <p className="text-gray-500 text-sm">
                  Email: {appointment.patient?.email}
                </p>

                <p>
                  Date:{" "}
                  {new Date(
                    appointment.appointmentDate
                  ).toLocaleDateString("en-GB")}
                </p>

                <p>
                  Time: {appointment.timeSlot}
                </p>

                <p className="mb-4">
                  Status:{" "}
                  <span className="font-semibold">
                    {appointment.status}
                  </span>
                </p>

                {appointment.status === "pending" && (
                  <div className="flex gap-4">

                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "confirmed"
                      )
                    }
                    className="bg-green-500 text-white px-5 py-2 rounded-xl"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        appointment._id,
                        "cancelled"
                      )
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-xl"
                  >
                    Reject
                  </button>
               
                </div>

                  )}

              </div>

            )
          )}
      

        </div>

      )}
    

    </div>
  );
}