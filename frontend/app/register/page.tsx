"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: "patient",
        }
      );

      alert("Registration Successful");

      window.location.href = "/login";

    } catch (error: any) {

      alert(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-4 rounded-xl"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

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
            Register
          </Button>

          alert("Registration Successful");

            window.location.href = "/login";

        </form>

      </div>

    </div>
  );
}