"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import toast from "react-hot-toast";
import Image from "next/image";
export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);

    try {

      const response = await axios.get(
        "http://localhost:5000/api/users/me",
        {
          withCredentials: true,
        }
      );

      setUser(response.data);
      setLoading(false);

      setName(response.data.name);
      setEmail(response.data.email);

    } catch (error) {
      setLoading(false);
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

      toast.success(response.data.message);

      fetchProfile();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };

  const uploadImage = async () => {

  if (!image) {
  toast.error("Please select an image");
  return;
}

  try {

    const formData = new FormData();

    formData.append("image", image);

    const response = await axios.put(
      "http://localhost:5000/api/users/profile-image",
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success(response.data.message);

    fetchProfile();

  } catch (error: any) {

    toast.error(
    error.response?.data?.message ||
    "Image upload failed"
  );

  }
};

    if (loading) {
    return <LoadingSpinner />;
    }

  return (

    <div className="min-h-screen bg-background text-foreground p-10">

      <h1 className="text-5xl font-bold mb-10">
        My Profile
      </h1>

     <div className="flex flex-wrap gap-4 mb-10">

      <Link
  href={
    user?.role === "admin"
      ? "/admin-dashboard"
      : user?.role === "doctor"
      ? "/doctor-dashboard"
      : "/dashboard"
  }
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
>
  Dashboard
</Link>

<Link
  href="/change-password"
  className="bg-orange-500 text-white px-5 py-3 rounded-xl"
>
  Change Password
</Link>
    </div>

      <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-lg border max-w-xl w-full mx-auto">

  <div className="flex flex-col items-center mb-6">

  <Image
    src={
      user?.profileImage
        ? `http://localhost:5000/uploads/${user.profileImage}`
        : "/default-avatar.png"
    }
    alt="Profile"
    width={128}
    height={128}
    className="rounded-full object-cover border-4 border-blue-500 shadow-lg"
  />

  <div className="text-center mt-4">
    <h2 className="text-2xl font-bold">
      {user?.name}
    </h2>

    <p className="text-muted-foreground">
      {user?.email}
    </p>

    <p className="text-blue-600 font-semibold capitalize">
      {user?.role}
    </p>
  </div>

</div>

        <label className="block mb-2 font-semibold">
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full border bg-background text-foreground p-3 rounded-xl mb-5"
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
          className="w-full border bg-background text-foreground p-3 rounded-xl mb-5"
        />
           <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="mb-4 block w-full text-sm text-foreground"
          />
            <div className="flex gap-4 mt-6">

  <button
    type="button"
    onClick={uploadImage}
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
  >
    Upload Image
  </button>

  <button
    onClick={updateProfile}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
  >
    Save Changes
  </button>

</div>

    </div>
    </div>
  );
}