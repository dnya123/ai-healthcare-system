"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          AI HealthCare
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/doctors">Doctors</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}