// import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Services from "@/components/home/Services";
import FeaturedDoctors from "@/components/home/FeaturedDoctors";

export default function Home() {
  return (
    <main>
      
      <HeroSection />
      <section className="py-20 bg-white dark:bg-slate-800">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      Why Choose AI Healthcare?
    </h2>

    <p className="text-center text-gray-500 mb-14">
      We combine expert medical care with modern AI technology.
    </p>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="text-center">

        <div className="text-6xl mb-4">⚡</div>

        <h3 className="text-2xl font-bold mb-2">
          Fast Appointments
        </h3>

        <p>
          Book appointments in just a few clicks.
        </p>

      </div>

      <div className="text-center">

        <div className="text-6xl mb-4">🤖</div>

        <h3 className="text-2xl font-bold mb-2">
          AI Powered
        </h3>

        <p>
          Smart healthcare management system.
        </p>

      </div>

      <div className="text-center">

        <div className="text-6xl mb-4">👨‍⚕️</div>

        <h3 className="text-2xl font-bold mb-2">
          Qualified Doctors
        </h3>

        <p>
          Experienced and trusted specialists.
        </p>

      </div>

      <div className="text-center">

        <div className="text-6xl mb-4">🔒</div>

        <h3 className="text-2xl font-bold mb-2">
          Secure Records
        </h3>

        <p>
          Your medical information is safe and private.
        </p>

      </div>

    </div>

  </div>

</section>

<section className="py-20 bg-slate-50 dark:bg-slate-900">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      What Our Patients Say
    </h2>

    <p className="text-center text-gray-500 mb-14">
      Trusted by hundreds of happy patients.
    </p>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Testimonial 1 */}

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">

        <div className="text-yellow-400 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          "The appointment booking process was quick and simple.
          The doctors were very professional and supportive."
        </p>

        <h3 className="text-xl font-bold">
          Priya Sharma
        </h3>

        <p className="text-sm text-gray-500">
          Patient
        </p>

      </div>

      {/* Testimonial 2 */}

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">

        <div className="text-yellow-400 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          "AI Healthcare made managing my appointments so easy.
          Highly recommended!"
        </p>

        <h3 className="text-xl font-bold">
          Rahul Patil
        </h3>

        <p className="text-sm text-gray-500">
          Patient
        </p>

      </div>

      {/* Testimonial 3 */}

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition">

        <div className="text-yellow-400 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          "Excellent doctors, modern interface, and secure medical
          records. Wonderful experience."
        </p>

        <h3 className="text-xl font-bold">
          Sneha Kulkarni
        </h3>

        <p className="text-sm text-gray-500">
          Patient
        </p>

      </div>

    </div>

  </div>

</section>
      <Services />
      <FeaturedDoctors />
      {/* Call To Action */}

<section className="py-20 bg-blue-600 text-white">

  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-5xl font-bold mb-6">
      Your Health Comes First
    </h2>

    <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
      Book appointments with experienced doctors, manage your
      medical records, and receive quality healthcare anytime,
      anywhere.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-6">

      <a
        href="/appointments"
        className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
      >
        Book Appointment
      </a>

      <a
        href="/contact"
        className="border-2 border-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition"
      >
        Contact Us
      </a>

    </div>

  </div>

</section>

    </main>
  );
}