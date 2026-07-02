"use client";

type DoctorCardProps = {
  doctor: any;
};

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 w-80 hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={
          doctor.profileImage
            ? `http://localhost:5000/uploads/${doctor.profileImage}`
            : "/doctor-placeholder.png"
        }
        alt={doctor.name}
        className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
      />

      <h2 className="text-2xl font-bold text-center">
        {doctor.name}
      </h2>

      <p className="text-center text-blue-600 mt-2">
        {doctor.specialization || "General Physician"}
      </p>

      <p className="text-center text-gray-500 mt-2">
        {doctor.email}
      </p>

      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
        Book Appointment
      </button>

    </div>
  );
}