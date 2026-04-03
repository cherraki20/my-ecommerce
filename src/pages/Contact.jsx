import { Facebook, Mail, MapPin, Phone, Twitter, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { contactInfo } from "../data/contact.js";

function telHref(phone) {
  const digits = String(phone).replace(/\D/g, "");
  return digits.startsWith("212") ? `tel:+${digits}` : `tel:+212${digits}`;
}

export default function Contact() {
  const {
    headquarters: { address, phone },
    branches,
    social,
  } = contactInfo;

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Demande de devis",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "Demande de devis",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="bg-[#F4F6FA] min-h-screen">

      {/* 🔥 HERO SAME STYLE */}
      <div className="relative py-24 px-8 text-white text-center overflow-hidden
        bg-gradient-to-br from-[#081a33] via-[#0d2b50] to-[#081a33]">

        <div className="absolute inset-0 opacity-20 
          bg-[radial-gradient(circle_at_top,_#3b82f6,_transparent_70%)]"></div>

        <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
          SFIB SECURITY
        </p>

        <h1
          className="text-5xl md:text-6xl font-black mb-4 
          drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Contactez-nous
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mx-auto opacity-90">
          Parlons de votre projet de sécurité électronique
        </p>
      </div>

      {/* CONTENT */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-2">

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-[#0B1F3A]">
              Envoyer un message
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">

              <input
                name="name"
                required
                placeholder="Nom complet"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              <input
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              <input
                name="company"
                placeholder="Société"
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              >
                <option>Demande de devis</option>
                <option>Support technique</option>
                <option>Information produit</option>
                <option>Autre</option>
              </select>

              <textarea
                name="message"
                required
                rows={5}
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              />

              {sent && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle2 /> Message envoyé avec succès
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D6FF2] text-white py-3 rounded-full font-semibold"
              >
                {loading ? "Envoi..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <div className="flex gap-3">
                <MapPin className="text-[#1D6FF2]" />
                <div>
                  <h3 className="font-bold text-[#0B1F3A]">Siège Social</h3>
                  <p className="text-gray-500">{address}</p>
                  <a href={telHref(phone)} className="text-[#1D6FF2]">
                    {phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-[#0B1F3A]">Agences</h3>
              {branches.map((b) => (
                <p key={b.city} className="text-gray-500">
                  {b.city}:{" "}
                  <a href={telHref(b.phone)} className="text-[#1D6FF2]">
                    {b.phone}
                  </a>
                </p>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-[#0B1F3A]">Email</h3>
              <a href="mailto:sfib@sfib.ma" className="text-[#1D6FF2]">
                sfib@sfib.ma
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition">
              <h3 className="font-bold text-[#0B1F3A]">Réseaux</h3>
              <div className="flex gap-3 mt-3">
                <a href={social.facebook}><Facebook /></a>
                <a href={social.twitter}><Twitter /></a>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow">
              <iframe
                className="w-full h-64"
                src="https://www.google.com/maps?q=Casablanca&output=embed"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#0B1F3A] py-16 text-center text-white">
        <h2 className="text-3xl font-black mb-4">
          Vous avez un projet ?
        </h2>
        <Link
          to="/contact"
          className="bg-[#1D6FF2] px-8 py-3 rounded-full"
        >
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}