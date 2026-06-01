import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar() {

  return (

    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        AI Healthcare
      </h1>

      <div className="flex gap-5 items-center">

        <Link href="/">
          Home
        </Link>

        <Link href="/appointments">
          Book
        </Link>

        <Link href="/my-appointments">
          My Appointments
        </Link>

        <LogoutButton />

      </div>

    </nav>
  );
}