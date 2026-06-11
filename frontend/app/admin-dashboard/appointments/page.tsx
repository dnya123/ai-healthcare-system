"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AppointmentsPage() {

  const [appointments,
    setAppointments] = useState([]);
  
  const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
      useState("all");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/appointments",
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

    const updateAppointmentStatus = async (
  id: string,
  status: string
) => {

  try {

    await axios.put(
      `http://localhost:5000/api/admin/appointments/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );

    toast.success("Status Updated");

    fetchAppointments();

  } catch (error) {

    console.log(error);
  }
};

    if (loading) {
      return <LoadingSpinner />;
    }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Manage Appointments
      </h1>

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search patient or doctor..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 p-3 border rounded-xl"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="p-3 border rounded-xl"
        >
          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>

        </select>

      </div>

      <div className="grid gap-6">

  {appointments
    .filter((appointment: any) => {

      const matchesSearch =
        appointment.patient?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        appointment.doctorName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    })
    .map((appointment: any) => (

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

              <p className="mb-3">
  Status:
  {" "}
  <span className="font-semibold">
    {appointment.status}
  </span>
</p>

<select
  id={`status-${appointment._id}`}
  defaultValue={appointment.status}
  className="border p-2 rounded-lg mr-3"
>
  <option value="pending">
    Pending
  </option>

  <option value="confirmed">
    Confirmed
  </option>

  <option value="completed">
    Completed
  </option>

  <option value="cancelled">
    Cancelled
  </option>
</select>

<button
  onClick={() => {

    const status =
      (
        document.getElementById(
          `status-${appointment._id}`
        ) as HTMLSelectElement
      ).value;

    updateAppointmentStatus(
      appointment._id,
      status
    );
  }}
  className="bg-blue-500 text-white px-5 py-2 rounded-xl mt-3"
>
  Update Status
</button>

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