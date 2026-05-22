export default function HeroSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            AI Powered Healthcare Appointment System
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Book appointments, manage health records,
            and get AI-powered healthcare assistance.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
              Book Appointment
            </button>

            <button className="border px-6 py-3 rounded-xl">
              Explore Doctors
            </button>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309"
            alt="Healthcare"
            className="rounded-3xl shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}