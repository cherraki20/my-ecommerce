import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    id: 1,
    brand: "DSC Security",
    category: "Anti-Intrusion",
    image: "produit/anti-intrusion.png",
    color: "#6b7280",
  },
  {
    id: 2,
    brand: "Tyco / Kantech",
    category: "Contrôle d'Accès",
    image: "produit/acces.png",
    color: "#1D6FF2",
  },
  {
    id: 3,
    brand: "Sensormatic",
    category: "Systèmes EAS",
    image: "produit/eas.png",
    color: "#2a9d8f",
  },
  {
    id: 4,
    brand: "ITC Audio",
    category: "Sonorisation",
    image: "produit/sonorisation.png",
    color: "#e9c46a",
  },
  {
    id: 5,
    brand: "American Dynamics",
    category: "Vidéo Surveillance",
    image: "produit/surveillance.png",
    color: "#457b9d",
  },
  {
    id: 6,
    brand: "Aguilera",
    category: "Détection Incendie",
    image: "produit/incendie.png",
    color: "#f4a261",
  },
];

const slides = [
  {
    label: "SFIB SECURITY",
    title: "Anti-Intrusion",
    subtitle: "Systèmes DSC pour votre protection 24h/24",
    cta: "Découvrir",
  },
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
    return slides.slice(0, cards.length);
  }, []);

  const getCardStyle = (offset, color) => {
    const absOffset = Math.abs(offset);
    const isCenter = offset === 0;

    if (absOffset > 2.5) return { opacity: 0, pointerEvents: "none", zIndex: 0 };

    const zIndex = isCenter ? 40 : 20 - Math.floor(absOffset * 2);
    const scale = isCenter ? 1 : Math.max(0.6, 0.82 - absOffset * 0.12);
    const opacity = isCenter ? 1 : Math.max(0, 0.85 - absOffset * 0.2);

    const transform = `
      translateX(${offset * 240}px)
      translateZ(${-absOffset * 200}px)
      rotateY(${offset * -35}deg)
      scale(${scale})
    `;

    return {
      transform,
      zIndex,
      opacity,
      filter: isCenter ? "none" : `brightness(0.65)`,
      boxShadow: isCenter
        ? `0 40px 80px rgba(0,0,0,0.35), 0 0 60px ${color}30`
        : `0 20px 40px rgba(0,0,0,0.25)`,
      transition: "all 0.8s cubic-bezier(0.25, 1, 0.2, 1)",
      pointerEvents: isCenter ? "auto" : "none",
      backfaceVisibility: "hidden",
      WebkitFontSmoothing: "antialiased",
      transformStyle: "preserve-3d",
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

  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 260;
  const cardHeight = typeof window !== 'undefined' && window.innerWidth < 768 ? 240 : 340;

  return (
    <section className="relative min-h-[100svh] md:min-h-screen bg-[#0B1F3A] overflow-hidden flex items-center pt-20 md:pt-0">
      <div className="absolute inset-0">
        <img
          src="/my-ecommerce/images/bg-herov3.jpg"
          className="w-full h-full object-cover object-center"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050d1a] via-[#0B1F3A]/90 to-[#0B1F3A]/60" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(135deg, rgba(29,111,242,0.25) 0%, transparent 40%, transparent 60%, rgba(0,174,239,0.12) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1F3A] to-transparent" />
      </div>

      <div className="relative z-10 flex w-full flex-col md:flex-row items-center justify-between">
        <div className="relative z-10 w-full md:w-1/2 px-6 md:px-16 flex flex-col justify-center text-center md:text-left">
          <div className="relative min-h-[420px] md:min-h-[520px]">
            {slidesSafe.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${i === safeActive
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
                  }`}
              >
                <p className="hidden md:block text-[#1D6FF2] text-sm font-semibold uppercase tracking-widest mb-4">
                  SFIB SECURITY
                </p>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {slides[activeIndex].title}
                </h1>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-6 md:mb-8 px-2 sm:px-0">
                  {slides[activeIndex].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                  <button
                    type="button"
                    className="bg-[#1D6FF2] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#1558d6] transition duration-300 text-sm sm:text-base"
                  >
                    {slides[activeIndex].cta}
                  </button>
                  <button
                    type="button"
                    className="border border-white/40 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:border-white transition duration-300 text-sm sm:text-base"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}

            <div className="absolute bottom-4 md:bottom-8 left-0 w-full flex justify-center gap-2">
              {slidesSafe.map((_, i) => {
                const active = i === safeActive;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${active
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

        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center mt-6 md:mt-0">
          <div
            style={{
              perspective: "1400px",
              perspectiveOrigin: "center center",
            }}
            className="relative h-[260px] sm:h-[300px] md:h-[420px] scale-[0.6] sm:scale-[0.7] md:scale-100 origin-top"
          >
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
                let offset = index - safeActive;
                if (offset > Math.floor(cards.length / 2)) offset -= cards.length;
                if (offset < -Math.floor(cards.length / 2)) offset += cards.length;
                const isActive = offset === 0;

                return (
                  <button
                    key={card.id || index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="absolute left-1/2 top-0 select-none cursor-pointer p-0"
                    style={{
                      marginLeft: -(cardWidth / 2),
                      width: cardWidth,
                      height: cardHeight,
                      ...getCardStyle(offset, card.color),
                      background: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: isActive
                        ? '0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(29,111,242,0.1)'
                        : '0 20px 40px rgba(0,0,0,0.4)',
                    }}
                    aria-label={`Show ${card.category}`}
                  >
                    {/* 1. TOP COLOR BAR */}
                    <div style={{
                      background: card.color,
                      padding: '10px 16px',
                      textAlign: 'center'
                    }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'white',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                      }}>
                        {card.brand}
                      </span>
                    </div>

                    {/* 2. IMAGE AREA */}
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px',
                      background: '#f8f9fa'
                    }}>
                      <img
                        src={`${import.meta.env.BASE_URL}${card.image}`}
                        alt={card.category}
                        style={{
                          maxWidth: '90%',
                          maxHeight: '160px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>

                    {/* 3. BOTTOM TEXT */}
                    <div style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      background: 'white'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        color: '#1A1A2E',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '2px'
                      }}>
                        {card.category}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: '#6b7280'
                      }}>
                        {card.brand}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Premium arrows - smaller on mobile */}
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={goPrev}
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-300 ease-out hover:bg-[#1D6FF2] hover:border-[#1D6FF2] hover:scale-110 hover:shadow-[0_0_20px_rgba(29,111,242,0.4)]"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            {/* Active brand indicator - hidden on small mobile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
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
              className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-300 ease-out hover:bg-[#1D6FF2] hover:border-[#1D6FF2] hover:scale-110 hover:shadow-[0_0_20px_rgba(29,111,242,0.4)]"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}