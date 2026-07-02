"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {

    e.preventDefault();

    try {

      const res =await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Login Successful");

      if (res.data.user.role === "admin") {

        window.location.href =
          "/admin-dashboard";

      } else if (
        res.data.user.role === "doctor"
      ) {

        window.location.href =
          "/doctor-dashboard";

      } else {

       window.location.href = "/patient-dashboard";
      }

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button className="w-full">
            Login
          </Button>

        </form>

      </div>

    </div>
  );
}