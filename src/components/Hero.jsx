import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    id: 2,
    brand: "Tyco / Kantech",
    category: "Contrôle d'Accès",
    image: "/images/q1.png",
    bgImage: "/images/bg_kantech.png",
    color: "#1D6FF2",
  },
  {
    id: 3,
    brand: "Sensormatic",
    category: "Systèmes EAS",
    image: "/images/q2.png",
    bgImage: "/images/bg_sensormatic.png",
    color: "#2a9d8f",
  },
  {
    id: 4,
    brand: "ITC Audio",
    category: "Sonorisation",
    image: "/images/q3.png",
    bgImage: "/images/bg_itc.png",
    color: "#e9c46a",
  },
  {
    id: 5,
    brand: "American Dynamics",
    category: "Vidéo Surveillance",
    image: "/images/q4.png",
    bgImage: "/images/bg_american_dynamics.png",
    color: "#457b9d",
  },
  {
    id: 6,
    brand: "Aguilera",
    category: "Détection Incendie",
    image: "/images/q5.png",
    bgImage: "/images/bg_aguilera.png",
    color: "#f4a261",
  },
];

const slides = [
  {
    label: "SFIB SECURITY",
    title: "Contrôle d'Accès",
    subtitle: "Solutions Kantech pour entreprises",
    cta: "Voir les produits",
  },
  {
    label: "SFIB SECURITY",
    title: "Systèmes Antivols EAS",
    subtitle: "Leader Sensormatic au Maroc",
    cta: "En savoir plus",
  },
  {
    label: "SFIB SECURITY",
    title: "Sonorisation Pro",
    subtitle: "Audio ITC pour tous espaces",
    cta: "Explorer",
  },
  {
    label: "SFIB SECURITY",
    title: "Vidéo Surveillance",
    subtitle: "Caméras HD American Dynamics",
    cta: "Voir les caméras",
  },
  {
    label: "SFIB SECURITY",
    title: "Détection Incendie",
    subtitle: "Systèmes Aguilera",
    cta: "En savoir plus",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.floor(cards.length / 2)
  );
  const intervalRef = useRef(null);

  const safeActive = Math.min(Math.max(activeIndex, 0), cards.length - 1);

  const slidesSafe = useMemo(() => {
    // Keep safe bounds if activeIndex ever changes unexpectedly.
    return slides.slice(0, cards.length);
  }, []);

  const getCardStyle = (offset, color) => {
    const absOffset = Math.abs(offset);

    if (absOffset > 2) return { display: "none" };

    const isCenter = offset === 0;
    const scale = isCenter ? 1.05 : Math.max(0.55, 0.78 - absOffset * 0.12);
    const zIndex = isCenter ? 20 : 10 - absOffset;
    const opacity = isCenter ? 1 : Math.max(0.35, 0.65 - absOffset * 0.15);

    const transform = `
      translateX(${offset * 200}px)
      translateZ(${-absOffset * 180}px)
      rotateY(${offset * -35}deg)
      scale(${scale})
    `;

    return {
      transform,
      zIndex,
      opacity,
      filter: isCenter ? "none" : `blur(${absOffset * 1.5}px) brightness(0.6)`,
      boxShadow: isCenter
        ? `0 40px 80px rgba(0,0,0,0.35), 0 0 60px ${color}30, 0 0 120px ${color}15`
        : `0 20px 40px rgba(0,0,0,0.25)`,
      transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
    };
  };

  const goPrev = () => {
    setActiveIndex((i) => (i - 1 + cards.length) % cards.length);
  };

  const goNext = () => {
    setActiveIndex((i) => (i + 1) % cards.length);
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % cards.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  const activeSlide = slidesSafe[safeActive] ?? slidesSafe[0];

  return (
    <section className="relative min-h-[100svh] md:min-h-screen bg-[#0B1F3A] overflow-hidden flex items-center pt-20 md:pt-0">
      {/* Background — multi-layer premium */}
      <div className="absolute inset-0">
        {/* Base image */}
        <img
          src="/images/q6.png"
          className="w-full h-full object-cover object-center"
          alt=""
        />

        {/* Dark gradient overlay — left to right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />

        {/* Diagonal accent gradient */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(135deg, rgba(29,111,242,0.25) 0%, transparent 40%, transparent 60%, rgba(0,174,239,0.12) 100%)",
          }}
        />

        {/* Radial spotlight behind the text area */}
        <div
          className="absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(29,111,242,0.35), transparent 65%)",
          }}
        />

        {/* Floating animated orbs */}
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl"
          style={{
            top: "10%",
            right: "15%",
            background: "rgba(29,111,242,0.12)",
            animation: "heroFloat 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-56 h-56 rounded-full blur-3xl"
          style={{
            bottom: "15%",
            left: "5%",
            background: "rgba(0,174,239,0.08)",
            animation: "heroFloat 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-40 h-40 rounded-full blur-2xl"
          style={{
            top: "60%",
            right: "35%",
            background: "rgba(29,111,242,0.06)",
            animation: "heroFloat 12s ease-in-out infinite 2s",
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1F3A] to-transparent" />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col md:flex-row items-center justify-between">
        {/* Left: text content */}
        <div className="relative z-10 w-full md:w-1/2 px-6 md:px-16 flex flex-col justify-center text-center md:text-left">
          <div className="relative min-h-[520px]">
            {slidesSafe.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  i === safeActive
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="hidden md:block text-[#1D6FF2] text-sm font-semibold uppercase tracking-widest mb-4">
                  SFIB SECURITY
                </p>
                <h1
                  className="text-6xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {slides[activeIndex].title}
                </h1>
                <p className="text-gray-300 text-xl mb-8">
                  {slides[activeIndex].subtitle}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <button
                    type="button"
                    className="bg-[#1D6FF2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1558d6] transition duration-300"
                  >
                    {slides[activeIndex].cta}
                  </button>
                  <button
                    type="button"
                    className="border border-white/40 text-white px-8 py-3 rounded-full font-semibold hover:border-white transition duration-300"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}

            {/* Dots (bottom left, synced) */}
            <div className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center gap-2">
              {slidesSafe.map((_, i) => {
                const active = i === safeActive;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active
                        ? "w-8 bg-[#1D6FF2]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Select slide ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 3D carousel */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center mt-10 md:mt-0">
          <div
            style={{
              perspective: "1400px",
              perspectiveOrigin: "center center",
            }}
            className="relative h-[300px] md:h-[420px] scale-[0.7] md:scale-100 origin-top"
          >
            {/* Cards container */}
            <div
              style={{
                position: "relative",
                width: "600px",
                margin: "auto",
                transformStyle: "preserve-3d",
              }}
              className="h-full"
            >
              {cards.map((card, index) => {
                const offset = index - safeActive;
                const isActive = offset === 0;

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="absolute left-1/2 top-0 -ml-[150px] select-none cursor-pointer p-0"
                    style={{
                      width: 300,
                      height: 400,
                      borderRadius: 24,
                      overflow: "hidden",
                      border: isActive
                        ? `1.5px solid ${card.color}99`
                        : "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(8,20,40,0.75)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      boxShadow: isActive
                        ? `0 0 0 1px ${card.color}22, 0 30px 80px rgba(0,0,0,0.5), 0 0 50px ${card.color}25`
                        : "0 20px 50px rgba(0,0,0,0.35)",
                      ...(isActive
                        ? { animation: "cardFloat 3s ease-in-out infinite" }
                        : {}),
                      ...getCardStyle(offset, card.color),
                    }}
                    aria-label={`Show ${card.category}`}
                  >
                    {/* Full image top section */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ height: 250 }}
                    >
                      {/* Brand-specific background image */}
                      <img
                        src={card.bgImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      {/* Gradient overlay on image */}
                      <div
                        className="absolute inset-0 z-10"
                        style={{
                          background: `linear-gradient(to bottom, ${card.color}15 0%, transparent 40%, rgba(8,20,40,0.95) 100%)`,
                        }}
                      />
                      {/* Product Image with "Lens" effect */}
                      <div className="relative z-20 w-full h-full flex items-center justify-center p-8">
                        {/* 1. Brand Halo Glow */}
                        <div
                          className="absolute w-32 h-32 rounded-full blur-[35px] opacity-25"
                          style={{
                            background: `radial-gradient(circle, ${card.color}, transparent 70%)`,
                            transform: isActive ? "scale(1.4)" : "scale(1)",
                            transition: "all 0.8s ease-out",
                          }}
                        />
                        
                        {/* 2. Glassmorphism backdrop circle */}
                        <div
                          className="absolute w-40 h-40 rounded-full border border-white/5 backdrop-blur-[2px] bg-white/5 shadow-inner"
                          style={{
                            transform: isActive ? "scale(1.15)" : "scale(1)",
                            opacity: isActive ? 1 : 0.3,
                            transition: "all 0.8s ease-out",
                          }}
                        />

                        {/* 3. The Product itself */}
                        <img
                          src={card.image}
                          alt=""
                          className="relative max-h-full max-w-full object-contain"
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 15px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 15px ${card.color}33)`
                              : "drop-shadow(0 6px 15px rgba(0,0,0,0.5)) grayscale(0.2)",
                            transform: isActive ? "translateY(-10px) scale(1.05)" : "none",
                            transition: "all 0.8s ease-out",
                          }}
                          draggable={false}
                        />
                      </div>
                      {/* Brand color top stripe */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] z-20"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
                        }}
                      />
                    </div>

                    {/* Info panel */}
                    <div
                      className="relative flex flex-col items-start justify-center px-6 py-5"
                      style={{ height: 150 }}
                    >
                      {/* Left colored accent line */}
                      <div
                        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full"
                        style={{ background: card.color }}
                      />
                      {/* Category */}
                      <div
                        className="text-white text-[14px] font-extrabold uppercase tracking-widest leading-tight"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {card.category}
                      </div>
                      {/* Brand */}
                      <div
                        className="mt-2 text-[13px] font-semibold tracking-wide"
                        style={{ color: card.color }}
                      >
                        {card.brand}
                      </div>
                      {/* Bottom tag */}
                      {isActive && (
                        <div
                          className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                          style={{
                            background: `${card.color}18`,
                            border: `1px solid ${card.color}44`,
                            color: card.color,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: card.color }}
                          />
                          Solution active
                        </div>
                      )}
                    </div>

                    {/* Pulsing glow halo */}
                    {isActive && (
                      <div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-10 w-4/5 rounded-full"
                        style={{
                          background: card.color,
                          opacity: 0.18,
                          filter: "blur(20px)",
                          animation: "glowPulse 2s ease-in-out infinite",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Premium arrows */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-300 ease-out hover:bg-[#1D6FF2] hover:border-[#1D6FF2] hover:scale-110 hover:shadow-[0_0_20px_rgba(29,111,242,0.4)]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Active brand indicator */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: cards[safeActive].color,
                  boxShadow: `0 0 8px ${cards[safeActive].color}`,
                }}
              />
              <span className="text-white/70 text-xs font-medium tracking-wider uppercase">
                {cards[safeActive].brand}
              </span>
            </div>

            <button
              type="button"
              onClick={goNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-300 ease-out hover:bg-[#1D6FF2] hover:border-[#1D6FF2] hover:scale-110 hover:shadow-[0_0_20px_rgba(29,111,242,0.4)]"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
