import Hero from "../components/Hero.jsx";
import CategoryCards from "../components/CategoryCards.jsx";
import ClientLogos from "../components/ClientLogos.jsx";
import TrustedBrands from "../components/TrustedBrands.jsx";
import { Award, Camera, Lock, MapPin, ShieldAlert, ShieldCheck, Users } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { services } from "../data/servicesData";

const solutions = [
  {
    icon: ShieldAlert,
    color: "bg-blue-600",
    title: "Protection & Antivol",
    image: "images/Protection & Antivol.jpg",
    desc: "Systèmes EAS Sensormatic, tags, étiquettes et portiques antivols pour la grande distribution et le retail.",
    items: ["Portiques EAS", "Tags & Étiquettes", "Détacheurs"],
    link: "/products?category=eas-sensormatic",
  },
  {
    icon: Camera,
    color: "bg-indigo-600",
    title: "Surveillance & Détection",
    image: "images/Surveillance & Détection.png",
    desc: "Vidéosurveillance HD, anti-intrusion et détection incendie pour sécuriser vos locaux 24h/24.",
    items: ["Caméras IP HD", "Alarmes anti-intrusion", "Détection incendie"],
    link: "/products?category=video-surveillance",
  },
  {
    icon: Lock,
    color: "bg-cyan-600",
    title: "Contrôle & Gestion",
    image: "images/Contrôle & Gestion.png",
    desc: "Contrôle d'accès Kantech, sonorisation ITC et comptage de passage pour optimiser votre espace.",
    items: ["Contrôle d'accès", "Sonorisation", "Compteur de passage"],
    link: "/products?category=controle-d-acces",
  },
];

const whySFIB = [
  {
    icon: ShieldCheck,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Expertise Reconnue",
    desc: "Leader en sécurité électronique au Maroc",
  },
  {
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-400/10",
    title: "Références Prestigieuses",
    desc: "Les plus grandes enseignes du Maroc nous font confiance",
  },
  {
    icon: MapPin,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    title: "4 Agences",
    desc: "Présents à Casablanca, Agadir, Marrakech et Tanger",
  },
  {
    icon: Award,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    title: "5 Marques Partenaires",
    desc: "Distributeur officiel Sensormatic, Kantech, InVue, Dahua et plus",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Hero />

      {/* NOS SOLUTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#1D6FF2] text-sm font-semibold uppercase tracking-widest mb-3">
              Ce que nous faisons
            </p>
            <h2
              className="text-4xl font-black text-[#0B1F3A]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Nos Solutions de Sécurité
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Des solutions complètes et intégrées pour protéger votre activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={i}
                  className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl
                             transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => navigate(s.link)}
                >
                  {/* TOP — image + icon + title */}
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <img
                      src={`${import.meta.env.BASE_URL}${s.image}`}
                      className="absolute inset-0 w-full h-full object-cover
                                 opacity-100 group-hover:scale-105
                                 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-6">
                      <Icon className="w-10 h-10 text-white mb-3 drop-shadow-lg" />
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">{s.title}</h3>
                    </div>
                  </div>

                  {/* BOTTOM — content */}
                  <div className="p-6 bg-white">
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                      {s.desc}
                    </p>
                    <ul className="space-y-2 mb-5">
                      {s.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-[#0B1F3A] font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1D6FF2] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-[#1D6FF2] text-sm font-semibold
                                    gap-2 group-hover:gap-3 transition-all duration-200">
                      Voir les produits <span>→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APERÇU SERVICES */}
      <section className="bg-white py-0 border-t border-gray-100">
        {services.slice(0, 2).map((service, index) => (
          <div
            key={service.id}
            className={`flex flex-col ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
            } min-h-[480px]`}
          >
            {/* IMAGE */}
            <div className="relative w-full lg:w-[55%] min-h-[280px] lg:min-h-[480px] overflow-hidden group">
              <img
                src={`${import.meta.env.BASE_URL}${service.image}`}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* TEXT */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-16 bg-white">
              <span
                className="text-[#1D6FF2] font-black text-7xl opacity-10 leading-none mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {service.number}
              </span>
              <h3
                className="text-[#0B1F3A] text-2xl lg:text-3xl font-black mb-4 leading-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {service.title}
              </h3>
              <div className="w-14 h-1 bg-[#1D6FF2] rounded-full mb-5" />
              <p className="text-gray-500 text-base leading-relaxed mb-7 max-w-md">
                {service.description}
              </p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[#1D6FF2] font-semibold text-sm
                           uppercase tracking-widest hover:gap-4 transition-all duration-300"
              >
                En savoir plus
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center py-16 bg-gray-50 border-t border-gray-100">
          <p className="text-gray-500 mb-6 text-lg">
            Découvrez nos <span className="text-[#0B1F3A] font-bold">11 solutions</span> de sécurité complètes
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-3 border-2 border-[#1D6FF2] text-[#1D6FF2]
                       px-10 py-4 rounded-full font-bold text-base
                       hover:bg-[#1D6FF2] hover:text-white
                       transition-all duration-300"
          >
            Voir tous nos services
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <CategoryCards />
      <ClientLogos />
      <TrustedBrands />

      {/* POURQUOI SFIB */}
      <section className="py-24 bg-[#0B1F3A]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-[#1D6FF2] text-sm font-semibold uppercase tracking-widest mb-3">
              Notre Engagement
            </p>
            <h2
              className="text-4xl font-black text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Pourquoi choisir SFIB ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySFIB.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8
                             hover:bg-white/10 hover:border-[#1D6FF2]/40
                             transition-all duration-300 group"
                >
                  <div className={`${item.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
