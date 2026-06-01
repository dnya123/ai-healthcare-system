"use client";

import axios from "axios";

export default function LogoutButton() {

  const handleLogout = async () => {

    await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Logout
    </button>
  );
}