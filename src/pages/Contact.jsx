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

    window.setTimeout(() => {
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
    <div className="bg-surface">
      <section className="relative overflow-hidden bg-primary py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(29,109,242,0.22),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
            Contactez-nous
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 sm:text-xl">
            Parlons de votre projet de sécurité électronique.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* LEFT: Form */}
            <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-heading text-xl font-bold text-ink">
                Envoyer un message
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-ink"
                  >
                    Nom complet*
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-ink"
                  >
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-ink"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-ink"
                  >
                    Société
                  </label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-ink"
                  >
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  >
                    <option value="Demande de devis">Demande de devis</option>
                    <option value="Support technique">Support technique</option>
                    <option value="Information produit">
                      Information produit
                    </option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-ink"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-2 w-full resize-y rounded-xl border border-ink/10 bg-surface px-4 py-3 font-body text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none"
                  />
                </div>

                {sent ? (
                  <div className="flex items-start gap-3 rounded-xl bg-emerald-50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div className="text-sm font-semibold text-emerald-700">
                      Message envoyé avec succès!
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-accent py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/90 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Envoi..." : "Envoyer le message"}
                </button>
              </form>
            </div>

            {/* RIGHT: Info */}
            <div className="space-y-6">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                  <div>
                    <div className="font-heading text-lg font-bold text-ink">
                      Siège Social (Casablanca)
                    </div>
                    <div className="mt-2 text-sm text-ink/70">
                      {address}
                    </div>
                    <a
                      href={telHref(phone)}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
                    >
                      <Phone className="h-4 w-4 text-accent" />
                      {phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="font-heading text-lg font-bold text-ink">
                  Nos Agences
                </div>
                <ul className="mt-4 space-y-2 text-sm text-ink/70">
                  {branches.map((b) => (
                    <li key={b.city} className="flex items-center gap-2">
                      <span className="font-semibold text-ink">{b.city}</span>
                      <span className="text-ink/60">:</span>
                      <a
                        href={telHref(b.phone)}
                        className="font-medium text-accent hover:underline"
                      >
                        {b.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-accent" />
                  <div>
                    <div className="font-heading text-lg font-bold text-ink">
                      Email
                    </div>
                    <a
                      href="mailto:sfib@sfib.ma"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
                    >
                      sfib@sfib.ma
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="font-heading text-lg font-bold text-ink">
                  Réseaux Sociaux
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    <Facebook className="h-4 w-4" aria-hidden />
                    Facebook
                  </a>
                  <a
                    href={social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    <Twitter className="h-4 w-4" aria-hidden />
                    Twitter
                  </a>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="font-heading text-lg font-bold text-ink">
                  Localisation
                </div>
                <div className="relative mt-4 overflow-hidden rounded-xl bg-primary">
                  <iframe
                    title="Casablanca, Val d'Anfa"
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Casablanca,+Val+d%27Anfa&output=embed"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/85">
                    <div className="px-6 text-center">
                      <div className="font-heading text-sm font-bold text-white sm:text-base">
                        Casablanca, Val d&apos;Anfa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                  Vous avez un projet de sécurité ?
                </h3>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  Contactez-nous et recevez un accompagnement sur mesure.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-accent/90 hover:shadow-xl"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

