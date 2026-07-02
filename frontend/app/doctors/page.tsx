"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/doctors"
      );

      setDoctors(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-center mb-16">
          Meet Our Doctors
        </h1>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-10
            justify-items-center
          "
        >
          {doctors.map((doctor: any) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
            />
          ))}
        </div>

      </div>

    </div>
  );
}