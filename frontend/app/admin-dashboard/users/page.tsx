"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            withCredentials: true,
          }
        );

      setUsers(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {

    if (!confirm("Delete this user?")) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Manage Users
      </h1>

      <div className="grid gap-6">

        {users.map((user: any) => (

          <div
            key={user._id}
            className="bg-white p-6 rounded-3xl shadow-lg"
          >

            <h2 className="text-2xl font-bold">
              {user.name}
            </h2>

            <p>{user.email}</p>

            <p>
              Role:
              {" "}
              <span className="font-semibold">
                {user.role}
              </span>
            </p>

            <button
              onClick={() =>
                deleteUser(user._id)
              }
              className="bg-red-500 text-white px-5 py-2 rounded-xl mt-4"
            >
              Delete User
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}