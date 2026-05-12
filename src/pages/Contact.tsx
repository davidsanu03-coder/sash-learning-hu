import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSend = () => {
    const phoneNumber = "2349139951243"; // WhatsApp format

    const message = `
📩 New Contact Message

👤 Name: ${form.name}
📧 Email: ${form.email}
📝 Subject: ${form.subject}
💬 Message: ${form.message}
    `;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT: FORM */}
        <div className="bg-white p-10 rounded-2xl shadow-sm border">
          <h1 className="text-3xl font-bold text-[#0B2C5F] mb-2">
            Contact Us
          </h1>
          <p className="text-slate-500 mb-8">
            Send us a message via WhatsApp. We respond quickly.
          </p>

          <div className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#0B2C5F]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#0B2C5F]"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#0B2C5F]"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#0B2C5F]"
            />

            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Send on WhatsApp
            </button>
          </div>
        </div>

        {/* RIGHT: INFO PANEL */}
        <div className="bg-[#0B2C5F] text-white p-10 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="space-y-6 text-sm">

            <div>
              <p className="text-slate-300">Address</p>
              <p className="font-semibold">Lagos, Nigeria</p>
            </div>

            <div>
              <p className="text-slate-300">Phone</p>
              <p className="font-semibold">09139951243</p>
            </div>

            <div>
              <p className="text-slate-300">Email</p>
              <p className="font-semibold">sashlearninghub@email.com</p>
            </div>

            <div className="pt-6 border-t border-white/20">
              <p className="text-slate-300 mb-2">Working Hours</p>
              <p>Mon - Fri: 8AM - 5PM</p>
              <p>Sat: 9AM - 2PM</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}