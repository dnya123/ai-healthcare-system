"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DoctorDashboard() {
  const router = useRouter();

  const [appointments, setAppointments] = useState([]);

  const [search, setSearch] =
  useState("");

const [statusFilter, setStatusFilter] =
  useState("all");

    const totalAppointments =
    appointments.length;

    const pendingAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "pending"
    ).length;

    const completedAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "completed"
    ).length;

    const cancelledAppointments =
    appointments.filter(
      (a: any) =>
        a.status === "cancelled"
    ).length;

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
      toast.success(
        `Appointment ${status}`
      );

      fetchAppointments();
      

    } catch (error) {

  console.log(error);

  toast.error(
    "Failed to update appointment"
  );
}
  };

  const logout = async () => {

  try {

    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    router.push("/login");

  } catch (error) {

    console.log(error);
  }
};

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-6">
        Doctor Dashboard
      </h1>

      <div className="flex gap-4 mb-8">

        <Link
          href="/doctor-profile"
          className="bg-purple-500 text-white px-5 py-3 rounded-xl"
        >
          My Profile
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-3 rounded-xl"
        >
          Logout
        </button>

      </div>

      <div className="mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Search Patient"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-xl flex-1"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="border p-3 rounded-xl"
        >

          <option value="all">
            All
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

      <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow-lg">

            <h2 className="text-lg font-semibold">
              Total Appointments
            </h2>

            <p className="text-4xl font-bold mt-3">
              {totalAppointments}
            </p>

          </div>

      <div className="bg-yellow-100 p-6 rounded-3xl shadow-lg">

        <h2 className="text-lg font-semibold">
          Pending
        </h2>

        <p className="text-4xl font-bold mt-3">
          {pendingAppointments}
        </p>

      </div>

      <div className="bg-green-100 p-6 rounded-3xl shadow-lg">

        <h2 className="text-lg font-semibold">
          Completed
        </h2>

        <p className="text-4xl font-bold mt-3">
          {completedAppointments}
        </p>

      </div>

      <div className="bg-red-100 p-6 rounded-3xl shadow-lg">

    <h2 className="text-lg font-semibold">
      Cancelled
    </h2>

    <p className="text-4xl font-bold mt-3">
      {cancelledAppointments}
    </p>

  </div>

</div>

      {appointments.length === 0 ? (

        <div className="bg-white p-8 rounded-3xl shadow-lg text-center">

          <h2 className="text-2xl font-semibold">
            No Appointments Found
          </h2>

        </div>

      ) : (

        <div className="grid gap-6">

          {appointments
        .filter((appointment: any) => {

          const matchesSearch =
            appointment.patient?.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesStatus =
            statusFilter === "all" ||
            appointment.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        })
        .map(
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