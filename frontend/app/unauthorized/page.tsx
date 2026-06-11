import Link from "next/link";

export default function UnauthorizedPage() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-6xl font-bold text-red-500">
        Access Denied
      </h1>

      <p className="text-xl mt-4">
        You are not authorized to view this page.
      </p>

      <Link
        href="/"
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl"
      >
        Go Home
      </Link>

    </div>

  );
}