"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments`,
        {
          withCredentials: true,
        }
      );

      setAppointments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Delete this appointment?")) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("Appointment Deleted");
      fetchAppointments();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const updateAppointmentStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      toast.success("Status Updated");
      fetchAppointments();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Filter appointments

  const filteredAppointments = appointments.filter(
    (appointment: any) => {
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

      return matchesSearch && matchesStatus;
    }
  );

  // Pagination

  const indexOfLastAppointment =
    currentPage * appointmentsPerPage;

  const indexOfFirstAppointment =
    indexOfLastAppointment - appointmentsPerPage;

  const currentAppointments =
    filteredAppointments.slice(
      indexOfFirstAppointment,
      indexOfLastAppointment
    );

  const totalPages = Math.ceil(
    filteredAppointments.length /
      appointmentsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Manage Appointments
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search patient or doctor..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 p-3 border rounded-xl"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="p-3 border rounded-xl"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {filteredAppointments.length === 0 ? (

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-2xl font-bold text-gray-600">
            No Appointments Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another search or change the status filter.
          </p>

        </div>

      ) : (

        <>
          <div className="grid gap-6">

            {currentAppointments.map((appointment: any) => (

              <div
                key={appointment._id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">
                  {appointment.patient?.name}
                </h2>

                <p>{appointment.patient?.email}</p>

                <p>
                  Doctor: {appointment.doctorName}
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
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => {
                    const status = (
                      document.getElementById(
                        `status-${appointment._id}`
                      ) as HTMLSelectElement
                    ).value;

                    updateAppointmentStatus(
                      appointment._id,
                      status
                    );
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl mt-3 mr-3"
                >
                  Update Status
                </button>

                <button
                  onClick={() =>
                    deleteAppointment(
                      appointment._id
                    )
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl mt-3"
                >
                  Delete Appointment
                </button>

              </div>

            ))}

          </div>

          {/* Pagination */}

          <div className="flex justify-center items-center gap-4 mt-10">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
              className="bg-gray-300 px-5 py-2 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>

            <span className="font-semibold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
              className="bg-blue-500 text-white px-5 py-2 rounded-xl disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>

      )}

    </div>
  );
}