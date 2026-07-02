"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          withCredentials: true,
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success("User Deleted");

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  const updateUserRole = async (
    id: string,
    role: string
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}`,
        { role },
        {
          withCredentials: true,
        }
      );

      toast.success("Role Updated");

      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Search
  const filteredUsers = users.filter((user: any) =>
    user.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    user.email
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLastUser =
    currentPage * usersPerPage;

  const indexOfFirstUser =
    indexOfLastUser - usersPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstUser,
      indexOfLastUser
    );

  const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Manage Users
      </h1>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full p-3 border rounded-xl mb-6"
      />

      {filteredUsers.length === 0 ? (

        <div className="bg-white p-10 rounded-3xl shadow-lg text-center">

          <h2 className="text-2xl font-bold text-gray-600">
            No Users Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another name or email.
          </p>

        </div>

      ) : (

        <>
          <div className="grid gap-6">

            {currentUsers.map((user: any) => (

              <div
                key={user._id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-600">
                  {user.email}
                </p>

                <p className="mt-2">
                  Role:
                  <span className="font-semibold text-blue-600">
                    {" "}
                    {user.role}
                  </span>
                </p>

                <div className="mt-4">

                  <label className="block mb-2 font-medium">
                    Change Role
                  </label>

                  <select
                    defaultValue={user.role}
                    onChange={(e) =>
                      updateUserRole(
                        user._id,
                        e.target.value
                      )
                    }
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="patient">
                      Patient
                    </option>

                    <option value="doctor">
                      Doctor
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>

                <button
                  onClick={() =>
                    deleteUser(user._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl mt-4"
                >
                  Delete User
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