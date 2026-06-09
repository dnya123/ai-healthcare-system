import Link from "next/link";

export default function NotFound() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">

      <h1 className="text-8xl font-bold text-red-500">
        404
      </h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
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