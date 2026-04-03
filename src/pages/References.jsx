import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clients } from "../data/clients";

const sectors = [
  { label: "Tous", value: "Tous", emoji: "🏢" },
  { label: "Mode", value: "Mode", emoji: "👗" },
  { label: "Luxe", value: "Luxe", emoji: "💎" },
  { label: "Grande Distribution", value: "Grande Distribution", emoji: "🛒" },
  { label: "Chaussures", value: "Chaussures", emoji: "👟" },
  { label: "Centres Commerciaux", value: "Centres Commerciaux", emoji: "🏬" },
  { label: "Hôtellerie", value: "Hôtellerie", emoji: "🏨" },
  { label: "Industrie", value: "Industrie", emoji: "🏭" },
  { label: "Sport", value: "Sport", emoji: "⚽" },
  { label: "Services", value: "Services", emoji: "💼" },
  { label: "Beauté", value: "Beauté", emoji: "✨" },
];

const prestigious = [
  "Gucci", "Fendi", "Christian Dior", "Louis Vuitton",
  "Zara", "Marjane", "Carrefour", "Morocco Mall",
  "Coca-Cola", "Visa", "Accenture", "Adidas"
];

function ClientCard({ client }) {
  const [imgError, setImgError] = useState(false);
  const hasLogo = client.logo && !imgError;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 
      flex flex-col items-center justify-center text-center
      aspect-[4/3] p-6
      hover:shadow-2xl hover:border-[#1D6FF2]/30
      hover:-translate-y-2 hover:scale-[1.02]
      transition-all duration-500 ease-out overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[#1D6FF2]/5 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {hasLogo ? (
        <img
          src={`${import.meta.env.BASE_URL}${client.logo}`}
          alt={client.name}
          className="relative z-10 h-14 w-auto max-w-[85%] object-contain
          transition-all duration-500 group-hover:scale-110"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1D6FF2] to-[#0B1F3A] 
            flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-xl">
              {client.name.charAt(0)}
            </span>
          </div>
          <span className="text-xs font-bold text-[#0B1F3A]">
            {client.name}
          </span>
        </div>
      )}
    </div>
  );
}

export default function References() {
  const [active, setActive] = useState("Tous");
  const navigate = useNavigate();

  const filtered = active === "Tous"
    ? clients
    : clients.filter(c => c.sector === active);

  const sectorCounts = {};
  clients.forEach(c => {
    sectorCounts[c.sector] = (sectorCounts[c.sector] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-[#F4F6FA]">

      {/* 🔥 HERO MODERN */}
      <div className="relative py-24 px-8 text-white text-center overflow-hidden
        bg-gradient-to-br from-[#081a33] via-[#0d2b50] to-[#081a33]">

        {/* Glow effect */}
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
          Nos Références
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mx-auto opacity-90">
          Plus de <span className="text-white font-bold">{clients.length}</span> marques 
          prestigieuses nous font confiance à travers le Maroc
        </p>
      </div>

      {/* STATS */}
      <div className="relative -mt-8 z-10 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl py-8 px-6">
          <div className="flex justify-center items-center divide-x divide-gray-200">
            {[
              { number: `${clients.length}+`, label: "Clients" },
              { number: `${Object.keys(sectorCounts).length}`, label: "Secteurs" },
              { number: "4", label: "Villes" },
              { number: "25+", label: "Années" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center px-6 sm:px-12">
                <span className="text-3xl sm:text-4xl font-black text-[#1D6FF2]">{s.number}</span>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* باقي الكود ديالك كما هو 👇 */}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#0B1F3A]">
            Explorez par secteur
          </h2>
          <p className="text-gray-500 mt-2">
            Filtrez les références selon votre domaine d'activité
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {sectors.map(s => (
            <button
              key={s.value}
              onClick={() => setActive(s.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300
              ${active === s.value
                ? "bg-[#1D6FF2] text-white scale-105"
                : "bg-white text-gray-600 hover:text-[#1D6FF2]"
              }`}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(client => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>

      <div className="bg-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-8">
          <h2 className="text-4xl font-black text-[#0B1F3A] mb-4">
            Vous souhaitez nous rejoindre ?
          </h2>
          <p className="text-gray-500 mb-8 text-lg">
            Contactez-nous pour discuter de votre projet
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-[#1D6FF2] text-white px-10 py-4 rounded-full font-semibold text-lg"
          >
            Demander un devis
          </button>
        </div>
      </div>

    </div>
  );
}