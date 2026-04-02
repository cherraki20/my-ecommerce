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
      {/* IMAGE SIDE — 55% */}
      <div className="relative w-full lg:w-[55%] min-h-[300px] lg:min-h-[500px] overflow-hidden group">
        <img
          src={`${import.meta.env.BASE_URL}${service.image}`}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 
                     group-hover:scale-105"
        />
      </div>

      {/* TEXT SIDE — 45% */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-16 lg:py-16 bg-white">
        {/* Service number */}
        <span
          className="text-[#1D6FF2] font-black text-6xl lg:text-8xl opacity-10 leading-none mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {service.number}
        </span>

        {/* Title */}
        <h3
          className="text-[#0B1F3A] text-2xl lg:text-4xl font-black mb-6 leading-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {service.title}
        </h3>

        {/* Accent line */}
        <div className="w-16 h-1 bg-[#1D6FF2] rounded-full mb-6" />

        {/* Description */}
        <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
          {service.description}
        </p>

        {/* CTA Button */}
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-[#1D6FF2] font-semibold text-sm 
                     uppercase tracking-widest group/btn hover:gap-4 transition-all duration-300"
        >
          En savoir plus
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* HERO */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src="images/q6.png"
          alt="SFIB - Nos Solutions"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/70 via-[#0B1F3A]/60 to-[#0B1F3A]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <p className="text-[#00AEEF] text-xs font-semibold uppercase tracking-[0.4em] mb-4">
            NOS SOLUTIONS
          </p>
          <h1
            className="text-4xl md:text-[48px] font-black text-white mb-6 max-w-3xl leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            La sécurité en toute confiance
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-xl">
            11 domaines d'expertise pour protéger vos biens
          </p>
        </div>
      </div>

      {/* SERVICES ALTERNATING ROWS */}
      <div className="relative">
        {/* Decorative side line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1D6FF2]/10 to-transparent" />

        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} reversed={index % 2 !== 0} />
        ))}
      </div>

      {/* BOTTOM CTA */}
      <div className="relative py-24 text-center overflow-hidden bg-gray-50">
        <div className="relative z-10 max-w-2xl mx-auto px-8">
          <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-[0.4em] mb-4">
            Prêt à sécuriser votre activité ?
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-[#0B1F3A] mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Contactez-nous
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Nos experts sont à votre disposition pour étudier votre projet et vous proposer
            la solution la plus adaptée.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#1D6FF2] text-white px-10 py-4 
                       rounded-full font-bold text-lg shadow-lg shadow-[#1D6FF2]/20
                       hover:bg-[#1558d6] hover:shadow-xl hover:shadow-[#1D6FF2]/30 
                       hover:-translate-y-0.5 transition-all duration-300"
          >
            Demander un devis
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
