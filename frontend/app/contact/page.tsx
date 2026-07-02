export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="text-xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out for appointments,
            support, or any healthcare-related queries.
          </p>

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        {/* Contact Form */}

        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-8">
            Send us a Message
          </h2>

          <form className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-xl p-4 dark:bg-slate-700"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-xl p-4 dark:bg-slate-700"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-xl p-4 dark:bg-slate-700"
            />

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full border rounded-xl p-4 dark:bg-slate-700"
            ></textarea>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
            >
              Send Message
            </button>

          </form>

        </div>

        {/* Contact Details */}

        <div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl mb-8">

            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-6 text-lg">

              <p>
                📍 <strong>Address</strong><br />
                AI Healthcare Center<br />
                Pune, Maharashtra, India
              </p>

              <p>
                📞 <strong>Phone</strong><br />
                +91 98765 43210
              </p>

              <p>
                ✉️ <strong>Email</strong><br />
                support@aihealthcare.com
              </p>

              <p>
                🕒 <strong>Working Hours</strong><br />
                Monday - Saturday<br />
                9:00 AM - 7:00 PM
              </p>

            </div>

          </div>

          {/* Google Map */}

          <div className="rounded-3xl overflow-hidden shadow-xl">

            <iframe
              src="https://www.google.com/maps?q=Pune&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              className="border-0"
            ></iframe>

          </div>

        </div>

      </section>

      {/* Footer Cards */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-4">
              ❤️
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Patient Care
            </h3>

            <p>
              We provide quality healthcare with compassion.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-4">
              👨‍⚕️
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Expert Doctors
            </h3>

            <p>
              Consult experienced and trusted medical professionals.
            </p>

          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg text-center">

            <div className="text-5xl mb-4">
              🤖
            </div>

            <h3 className="text-2xl font-bold mb-3">
              AI Powered
            </h3>

            <p>
              Modern technology for better healthcare management.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}