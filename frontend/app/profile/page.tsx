"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );

      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.put(
          "http://localhost:5000/api/users/profile-image",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Profile updated successfully");
      fetchProfile();

    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div className="p-10">User not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        My Profile
      </h1>

      <div className="flex justify-center gap-4 mb-8">

        <Link
          href="/patient-dashboard"
          className="bg-purple-600 text-white px-5 py-3 rounded-xl"
        >
          Dashboard
        </Link>

        <Link
          href="/history"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          Appointment History
        </Link>

        <Link
          href="/change-password"
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Change Password
        </Link>

      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl max-w-xl mx-auto">

        <div className="flex flex-col items-center">

          <Image
            src={
              preview
                ? preview
                : user.profileImage
                ? `http://localhost:5000/uploads/${user.profileImage}`
                : "/default-avatar.png"
            }
            alt="Profile"
            width={130}
            height={130}
            className="rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user.name}
          </h2>

          <p className="text-gray-500">
            {user.email}
          </p>

          <p className="text-blue-600 font-semibold capitalize mb-8">
            {user.role}
          </p>

        </div>

        <label className="block mb-2 font-semibold">
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-xl mb-5"
        />

        <label className="block mb-2 font-semibold">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-xl mb-5"
        />

        <label className="block mb-2 font-semibold">
          Profile Image
        </label>

        <input
          type="file"
          accept="image/*"
          className="mb-5"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        <button
          onClick={updateProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}