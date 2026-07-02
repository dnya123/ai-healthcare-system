"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedDoctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/doctors`
      );

      setDoctors(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Meet Our Doctors
          </h2>

          <p className="text-muted-foreground mt-3">
            Experienced healthcare professionals ready to help you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {doctors.map((doctor: any) => (

            <div
              key={doctor._id}
              className="bg-card rounded-3xl shadow-lg border p-8 hover:-translate-y-2 hover:shadow-2xl transition"
            >

              <div className="flex justify-center">

                <Image
                  src={
                    doctor.profileImage
                      ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${doctor.profileImage}`
                      : "/default-avatar.png"
                  }
                  alt={doctor.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-blue-500"
                />

              </div>

              <div className="text-center mt-6">

                <h3 className="text-2xl font-bold">
                  {doctor.name}
                </h3>

                <p className="text-blue-600 font-semibold mt-2">
                  {doctor.specialization || "General Physician"}
                </p>

                <p className="text-muted-foreground mt-3">
                  {doctor.email}
                </p>

                <Link
                  href="/login"
                  className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
                >
                  Book Appointment
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}