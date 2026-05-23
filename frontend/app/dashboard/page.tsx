import Sidebar from "@/components/dashboard/Sidebar";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">
          Patient Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <DashboardCard
            title="Appointments"
            value="12"
          />

          <DashboardCard
            title="Reports"
            value="5"
          />

          <DashboardCard
            title="Prescriptions"
            value="8"
          />

        </div>

      </div>

    </div>
  );
}