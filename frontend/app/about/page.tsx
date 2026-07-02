export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About AI Healthcare
          </h1>

          <p className="text-xl max-w-3xl mx-auto">
            AI Healthcare is a modern healthcare management system that
            connects patients and doctors through a secure, fast, and
            intelligent platform.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-5">
            🎯 Our Mission
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8">
            Our mission is to simplify healthcare by providing patients
            with easy appointment booking, secure medical records, and
            seamless communication with experienced doctors using modern
            technology.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-green-600 mb-5">
            👁️ Our Vision
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8">
            We envision a future where every patient has instant access
            to quality healthcare services through AI-powered healthcare
            management systems.
          </p>
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🏥</div>

            <h3 className="text-xl font-bold mb-3">
              Expert Doctors
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Experienced healthcare professionals available for patients.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🤖</div>

            <h3 className="text-xl font-bold mb-3">
              AI Assistance
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Smart healthcare management for faster and better service.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">📅</div>

            <h3 className="text-xl font-bold mb-3">
              Easy Booking
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Book appointments online anytime with just a few clicks.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center hover:shadow-2xl transition">
            <div className="text-5xl mb-4">🔒</div>

            <h3 className="text-xl font-bold mb-3">
              Secure Data
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              Patient information is protected using secure authentication.
            </p>
          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-10 text-center">

            <div>
              <h2 className="text-5xl font-bold">
                100+
              </h2>

              <p className="mt-3 text-lg">
                Doctors
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">
                5000+
              </h2>

              <p className="mt-3 text-lg">
                Patients
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">
                98%
              </h2>

              <p className="mt-3 text-lg">
                Satisfaction
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-bold">
                24/7
              </h2>

              <p className="mt-3 text-lg">
                Support
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}