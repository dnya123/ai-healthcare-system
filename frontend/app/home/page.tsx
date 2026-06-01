export default function HomePage() {
  return (
      <div className="text-center">

      <h1 className="text-6xl font-bold">
        AI Healthcare System
      </h1>

      <p className="text-xl text-gray-600 mt-5">
        Book appointments with doctors online
      </p>

      <div className="flex gap-4">
        <a
          href="/appointments"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Book Appointment
        </a>

        <a
          href="/my-appointments"
          className="bg-green-600 text-white px-6 py-3 rounded-xl"
        >
          My Appointments
        </a>
      </div>
    </div>
  );
}