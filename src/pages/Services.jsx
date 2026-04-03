import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/servicesData";

function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

function ServiceRow({ service, reversed }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} 
      min-h-[500px] transition-all duration-1000 ease-out
      ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
    >
      <div className="relative w-full lg:w-[55%] min-h-[300px] lg:min-h-[500px] overflow-hidden group">
        <img
          src={`${import.meta.env.BASE_URL}${service.image}`}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-16 bg-white">
        <span className="text-[#1D6FF2] font-black text-6xl lg:text-8xl opacity-10 mb-4">
          {service.number}
        </span>

        <h3 className="text-[#0B1F3A] text-2xl lg:text-4xl font-black mb-6">
          {service.title}
        </h3>

        <div className="w-16 h-1 bg-[#1D6FF2] rounded-full mb-6" />

        <p className="text-gray-600 text-base lg:text-lg mb-8 max-w-lg">
          {service.description}
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-[#1D6FF2] font-semibold text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300"
        >
          En savoir plus →
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* 🔥 HERO UPDATED */}
      <div className="relative py-24 px-8 text-white text-center overflow-hidden
      bg-gradient-to-br from-[#081a33] via-[#0d2b50] to-[#081a33]">

        {/* Glow effect */}
        <div className="absolute inset-0 opacity-20 
        bg-[radial-gradient(circle_at_top,_#3b82f6,_transparent_70%)]"></div>

        <p className="text-[#00AEEF] text-xs font-semibold uppercase tracking-[0.4em] mb-4">
          NOS SOLUTIONS
        </p>

        <h1 className="text-4xl md:text-5xl font-black mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          La sécurité en toute confiance
        </h1>

        <p className="text-gray-300 text-base md:text-lg opacity-90 max-w-xl mx-auto">
          11 domaines d'expertise pour protéger vos biens
        </p>
      </div>

      {/* SERVICES */}
      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1D6FF2]/10 to-transparent" />

        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} reversed={index % 2 !== 0} />
        ))}
      </div>

      {/* CTA */}
      <div className="relative py-24 text-center bg-gray-50">
        <div className="max-w-2xl mx-auto px-8">
          <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-[0.4em] mb-4">
            Prêt à sécuriser votre activité ?
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#0B1F3A] mb-6">
            Contactez-nous
          </h2>

          <p className="text-gray-500 text-lg mb-10">
            Nos experts sont à votre disposition pour étudier votre projet
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#1D6FF2] text-white px-10 py-4 
            rounded-full font-bold text-lg hover:bg-[#1558d6] transition"
          >
            Demander un devis →
          </Link>
        </div>
      </div>

    </div>
  );
}