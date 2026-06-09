"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/users/me",
        {
          withCredentials: true,
        }
      );

      setUser(response.data);

      setName(response.data.name);
      setEmail(response.data.email);

    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {

    try {

      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );

      alert(response.data.message);

      fetchProfile();

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };

  if (!user) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Profile
      </h1>

      <div className="flex gap-4 mb-8">

      <Link
        href="/history"
        className="bg-blue-500 text-white px-5 py-3 rounded-xl"
      >
        Appointment History
      </Link>

      <Link
        href="/change-password"
        className="bg-green-500 text-white px-5 py-3 rounded-xl"
      >
        Change Password
      </Link>

    </div>

      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-xl">

        <label className="block mb-2 font-semibold">
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-5"
        />

        <label className="block mb-2 font-semibold">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded-xl mb-5"
        />

        <p className="mb-5">
          Role:
          {" "}
          <strong>{user.role}</strong>
        </p>

        <button
          onClick={updateProfile}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}