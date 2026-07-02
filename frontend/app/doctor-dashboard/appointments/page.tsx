"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DoctorAppointments() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/doctor-dashboard");
  }, [router]);

  return null;
}