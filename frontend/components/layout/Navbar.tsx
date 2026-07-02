"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { HeartPulse } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);

    } catch {
      setUser(null);
    }
  };

  const router = useRouter();

const logout = async () => {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    setUser(null);

    router.push("/login");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-600"
        >
          <HeartPulse className="w-8 h-8" />
          AI Healthcare
        </Link>

        {/* Menu */}
        <div className="hidden md:flex gap-8 font-medium">

          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="/doctors" className="hover:text-blue-600">
            Doctors
          </Link>

          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>

        </div>

        {/* Right Side */}
       <div className="flex items-center gap-4">

  <ThemeToggle />

  {user ? (

    <button
      onClick={logout}
      className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
    >
      Logout
    </button>

  ) : (

    <>
      <Link
        href="/login"
        className="px-5 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
      >
        Login
      </Link>

      <Link
        href="/register"
        className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Register
      </Link>
    </>

  )}

</div>

      </div>

    </nav>
  );
}