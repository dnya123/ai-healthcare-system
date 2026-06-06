"use client";

import { useState } from "react";
import axios from "axios";

export default function ChangePasswordPage() {

  const [currentPassword,
    setCurrentPassword] = useState("");

  const [newPassword,
    setNewPassword] = useState("");

  const changePassword = async () => {

    try {

      const response =
        await axios.put(
          "http://localhost:5000/api/users/change-password",
          {
            currentPassword,
            newPassword,
          },
          {
            withCredentials: true,
          }
        );

      alert(response.data.message);

      setCurrentPassword("");
      setNewPassword("");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Change Password
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-xl">

        <label className="block mb-2 font-semibold">
          Current Password
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-5"
        />

        <label className="block mb-2 font-semibold">
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl mb-5"
        />

        <button
          onClick={changePassword}
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}