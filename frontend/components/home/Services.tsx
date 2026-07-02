import {
  Brain,
  CalendarCheck,
  FileText,
  Pill,
} from "lucide-react";

const services = [
  {
    title: "AI Disease Prediction",
    description:
      "Predict diseases using Artificial Intelligence with high accuracy.",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Book Appointment",
    description:
      "Schedule appointments with experienced doctors in seconds.",
    icon: CalendarCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Medical Reports",
    description:
      "Store and access all your medical reports securely online.",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Digital Prescriptions",
    description:
      "View and download prescriptions from your doctor anytime.",
    icon: Pill,
    color: "from-orange-500 to-red-500",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Our Services
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Everything you need for better healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${service.color} text-white mb-6`}
                >
                  <Icon size={32} />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}