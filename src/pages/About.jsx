import {
  Building,
  Building2,
  Handshake,
  MapPin,
  Phone,
  ShoppingCart,
  Star,
  Award,
  ShieldCheck,
  Wrench,
  Lightbulb,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { contactInfo } from "../data/contact.js";
import { brands } from "../data/brands.js";

const milestones = [
  { year: "1986", fr: "Création de SFIB", en: "We Founded SFIB", icon: "Building2" },
  { year: "1990", fr: "Partenariat avec Sensormatic® / Tyco", en: "Partnership with Sensormatic® / Tyco", icon: "Handshake" },
  { year: "1994", fr: "Installation du 1er Marjane Bouregreg", en: "Equipping first Marjane Bouregreg", icon: "ShoppingCart" },
  { year: "2010", fr: "Installation du Mall Almazar", en: "Equipping Almazar Mall", icon: "Building" },
  { year: "2011", fr: "Installation du Morocco Mall", en: "Equipping Morocco Mall", icon: "Star" },
];

const iconMap = {
  Building2,
  Handshake,
  ShoppingCart,
  Building,
  Star,
};

function BrandLogo({ brand }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="h-16 w-36 flex-shrink-0 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center p-4">
        <span className="text-center font-heading text-xs font-bold tracking-tight text-white/50">
          {brand.name}
        </span>
      </div>
    );
  }

  return (
    <div className="h-16 w-36 flex-shrink-0 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-center p-3 transition-transform duration-300 hover:scale-110">
      <img
        src={brand.logo}
        alt={brand.name}
        onError={() => setFailed(true)}
        className="max-h-full max-w-full object-contain mix-blend-multiply"
      />
    </div>
  );
}

function PartnerBrandsMarquee() {
  const doubled = [...brands, ...brands];

  return (
    <section className="border-y border-white/5 bg-[#081428] py-12 sm:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,111,242,0.05)_0%,transparent_100%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-sm font-bold tracking-widest text-[#00AEEF] uppercase sm:mb-10">
          Nos Marques Partenaires
        </h2>
      </div>

      <div className="relative overflow-hidden">
        {/* Fading edges for marquee */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#081428] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#081428] to-transparent z-10" />
        
        <div className="animate-brand-scroll flex w-max items-center gap-12 sm:gap-16 lg:gap-20">
          {doubled.map((brand, i) => (
            <BrandLogo key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PageCta() {
  return (
    <section className="relative py-20 overflow-hidden bg-[#0B1F3A]">
      <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,111,242,0.1)_0%,transparent_100%)]" />
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#00AEEF]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-10 sm:p-14 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#1D6FF2]/20 rounded-full blur-[60px]" />
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between relative z-10">
            <div className="max-w-2xl">
              <h3 className="font-heading text-3xl font-black text-white sm:text-4xl" style={{ fontFamily: "'Syne', sans-serif" }}>
                Prêt à sécuriser votre entreprise ?
              </h3>
              <p className="mt-4 text-lg text-white/70">
                Parlez à nos experts et obtenez une solution sur-mesure adaptée à vos besoins spécifiques.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1D6FF2] to-[#00AEEF] px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(29,111,242,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(29,111,242,0.5)] hover:scale-105"
            >
              Contactez-nous
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const offices = [
    {
      city: `${contactInfo.headquarters.city} (${contactInfo.headquarters.label})`,
      address: contactInfo.headquarters.address,
      phone: contactInfo.headquarters.phone,
    },
    ...contactInfo.branches,
  ];

  return (
    <div className="bg-[#0B1F3A] min-h-screen">
      {/* Premium Dark Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-48 lg:pb-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(29,111,242,0.15),transparent_70%)]" />
          <div className="absolute -top-40 -left-20 w-96 h-96 bg-[#1D6FF2]/10 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-10 w-80 h-80 bg-[#00AEEF]/15 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-block text-[#00AEEF] text-sm font-bold uppercase tracking-[0.2em] mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            Depuis 1986
          </p>
          <h1 className="font-heading text-5xl font-black text-white sm:text-6xl md:text-7xl mb-6 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            L'Expertise Sécurité
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D6FF2] to-[#00AEEF]">
              Au Cœur du Maroc
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70 leading-relaxed md:text-xl">
            SFIB est le leader dans la distribution et l'intégration de systèmes de sécurité électronique. Nous allions 40 ans de savoir-faire aux technologies de pointe pour protéger ce qui compte le plus pour vous.
          </p>
        </div>
      </section>

      {/* Valeurs / Expertise - Glassmorphism Cards */}
      <section className="relative py-12 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Solutions Sur-Mesure", desc: "Des systèmes adaptés à chaque besoin : vidéosurveillance, détection incendie, contrôle d'accès." },
              { icon: Lightbulb, title: "Expertise & Conseil", desc: "Un accompagnement personnalisé par nos ingénieurs dès la conception de votre projet." },
              { icon: Wrench, title: "Installation & Maintenance", desc: "Un service après-vente réactif pour garantir la pérennité et la fiabilité de vos installations." },
            ].map((value, idx) => (
              <div key={idx} className="group relative rounded-3xl bg-[#0F294D]/60 backdrop-blur-xl border border-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-[#15345E]/80 hover:border-[#1D6FF2]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-[#1D6FF2]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D6FF2]/10 text-[#00AEEF] ring-1 ring-[#1D6FF2]/20 group-hover:bg-[#1D6FF2] group-hover:text-white group-hover:ring-[#1D6FF2] transition-all duration-300">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>{value.title}</h3>
                <p className="text-white/60 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal Timeline Milestones Graphic Component */}
      <section className="relative py-32 overflow-hidden bg-[#0B1F3A] mt-20">
        {/* Slanted Background Map */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-slate-600/60 to-slate-800/60"
            style={{ clipPath: 'polygon(0 0, 70% 0, 30% 100%, 0 100%)' }}
          />
           <div 
            className="absolute inset-0 bg-gradient-to-br from-[#0076B6]/60 to-[#0B1F3A]"
            style={{ clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 30% 100%)' }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-32 max-w-lg">
            <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-wider leading-tight" style={{ fontFamily: "'Syne', sans-serif", textShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
              Historique <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 font-light">Milestones</span>
            </h2>
          </div>

          {/* 40 Years Badge (Absolute position top right over the angle) */}
          <div className="absolute top-10 right-10 lg:right-40 hidden md:flex items-center justify-center w-56 h-56 z-20">
            {/* Outer cogwheel style using dashes */}
            <div className="absolute inset-0 rounded-full border-[6px] border-[#0A1A31] shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-gradient-to-br from-[#2a456c] to-[#0A1A31]" />
            <div className="absolute inset-2 outline outline-2 outline-white/20 outline-offset-4 rounded-full border-[8px] border-dashed border-gray-400/50 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-[#1b2b45] to-[#0B1F3A] shadow-inner flex flex-col items-center justify-center p-4">
              <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>40</span>
              <span className="text-xs font-bold text-[#00AEEF] tracking-[0.2em] uppercase mt-1 mb-2">Years - Ans</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="text-[10px] font-medium tracking-widest text-[#00AEEF] mt-2 mb-0.5">DEPUIS</span>
              <span className="text-xl font-bold text-white tracking-widest leading-none drop-shadow-sm" style={{ fontFamily: "'Syne', sans-serif" }}>1986</span>
            </div>
          </div>

          {/* Horizontal Timeline Line */}
          <div className="relative mt-20 md:mt-0 pt-20 pb-20 overflow-x-auto hide-scrollbar">
            <div className="min-w-[800px]">
              {/* The Line */}
              <div className="absolute top-[89px] left-0 right-0 h-[2px] bg-white" />
              
              <div className="grid grid-cols-5 gap-4 relative">
                {milestones.map((milestone, i) => {
                  const Icon = iconMap[milestone.icon];
                  return (
                    <div key={milestone.year} className="relative group text-white">
                      {/* Ticker / Dot on the line */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full mt-[10px] shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[10px] bg-white mt-[10px] z-10" />

                      {/* Year text above the line */}
                      <div className="text-center absolute bottom-[calc(100%+10px)] left-0 w-full mb-2">
                        <p className="text-xl font-bold text-white tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>{milestone.year}</p>
                      </div>

                      {/* Description below the line */}
                      <div className="mt-8 text-center px-2">
                        <p className="text-sm font-bold leading-tight mb-1" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{milestone.fr}</p>
                        <p className="text-xs italic font-medium opacity-80" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{milestone.en}</p>
                      </div>

                      {/* Decorative Icon floating bottom */}
                      <div className="mt-14 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300 group-hover:-translate-y-2 transform">
                         <Icon className="w-10 h-10 stroke-1 text-white opacity-40 group-hover:stroke-2 group-hover:text-[#00AEEF] group-hover:opacity-100 transition-all drop-shadow-md" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Slogan Text Bottom Right */}
          <div className="mt-10 flex justify-end">
             <div className="text-right max-w-xl text-white">
                <p className="text-xs leading-relaxed mb-6 font-medium text-white/90 drop-shadow-md" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                  SFIB vous offre des solutions de qualité pour vous aider à minimiser les risques. Que cela soit grâce au contrôle d'accès ou à la protection antivol, tous vos sites, même les plus vastes, seront munis de systèmes de sécurité élégants et performants.
                </p>
                <div className="border-t border-white/20 pt-4 text-right">
                  <div className="mb-2">
                    <p className="text-xs font-bold tracking-widest uppercase">Leader sur le marché</p>
                    <p className="text-[10px] tracking-widest text-[#00AEEF]/80 uppercase mt-0.5">Leader on the market and innovator</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase">Savoir Faire et Compétence</p>
                    <p className="text-[10px] tracking-widest text-[#00AEEF]/80 uppercase mt-0.5">Knowhow and proficiency</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <PartnerBrandsMarquee />

      <PartnerBrandsMarquee />

      {/* Global Reach / Map Section */}
      <section className="relative py-24 pb-32 overflow-hidden bg-[#0A1A31]">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#1D6FF2 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.1),transparent_60%)] rounded-full blur-3xl z-0 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 relative z-20">
            <h2 className="text-[#00AEEF] text-sm font-bold tracking-[0.3em] uppercase mb-4 opacity-80">Présence Internationale</h2>
            <h3 className="font-heading text-4xl font-light text-white uppercase tracking-wide leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Notre Réseau <br/>
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00AEEF]">Au-Delà des Frontières</span>
            </h3>
          </div>

          {/* 3D Global-to-Local Map Visual (Zoomed In) */}
          <div className="relative w-full max-w-7xl mx-auto h-[500px] lg:h-[700px] rounded-3xl overflow-visible group/map -mt-4">
             
             {/* 1. Base Layer: Global Map (100%) */}
             <div 
               className="absolute inset-0 z-0 opacity-10" 
               style={{ 
                 backgroundImage: 'url("/images/world-map.svg")', 
                 backgroundSize: '100%', 
                 backgroundPosition: 'center', 
                 backgroundRepeat: 'no-repeat',
                 filter: 'invert(1)' 
               }} 
             />

             {/* 2. Radial focal glow */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,174,239,0.08)_0%,transparent_70%)] z-0" />

             {/* 3. The "LIFTED" Morocco Layer (Enlarged) */}
             <div className="absolute top-[50%] left-[50%] w-[50%] md:w-[45%] lg:w-[38%] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 hover:scale-105">
                {/* 3D Shadow layer (The "Hza" effect) */}
                <div className="absolute inset-0 translate-x-4 translate-y-8 opacity-40 blur-xl pointer-events-none"
                  style={{
                    backgroundImage: 'url("/images/morocco-map-full.svg")',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'brightness(0) blur(4px)'
                  }}
                />
                
                {/* The main map silhouette */}
                <div className="relative w-full aspect-square animate-[cardFloat_4s_ease-in-out_infinite]"
                  style={{
                    backgroundImage: 'url("/images/morocco-map-full.svg")',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    filter: 'drop-shadow(0 0 25px rgba(0,174,239,0.4))'
                  }}>
                  
                  {/* Glowing City Nodes + Labels on the lifted map */}
                  {[
                    { name: 'TANGER', t: '5%', l: '55%', d: '0s' },
                    { name: 'RABAT', t: '16%', l: '49%', d: '1s' },
                    { name: 'FÈS', t: '16%', l: '60%', d: '1.2s' },
                    { name: 'CASA', t: '22%', l: '42%', d: '0.5s' },
                    { name: 'MARRAKECH', t: '32%', l: '35%', d: '1.5s' },
                    { name: 'AGADIR', t: '43%', l: '24%', d: '2s' },
                  ].map((node) => (
                    <div key={node.name} 
                         className="absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2"
                         style={{ top: node.t, left: node.l }}>
                      {/* Node point */}
                      <div className="relative w-2 h-2 bg-[#00AEEF] rounded-full shadow-[0_0_8px_white] ring-2 ring-white">
                        <div className="absolute inset-0 bg-[#00AEEF] rounded-full animate-ping opacity-75" style={{ animationDelay: node.d }} />
                      </div>
                      {/* Node Label */}
                      <span className="text-xs md:text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest uppercase ml-1">
                        {node.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Main Label MAROC / MOROCCO */}
                <div className="absolute -bottom-16 left-0 text-left">
                  <h4 className="text-5xl md:text-7xl font-black tracking-widest text-[#00AEEF] drop-shadow-lg leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>MAROC</h4>
                  <p className="text-xl md:text-3xl font-light tracking-[0.3em] text-white/50 uppercase mt-2">Morocco</p>
                </div>
             </div>

             {/* 4. Connectivity Nodes in the rest of the world (Faded) */}
             <div className="absolute inset-0 z-5 pointer-events-none opacity-40">
                <div className="absolute top-[58%] left-[40.5%] w-2 h-2 rounded-full bg-[#1D6FF2] shadow-[0_0_10px_#1D6FF2]" /> {/* West Africa */}
                <div className="absolute top-[30%] left-[52%] w-2 h-2 rounded-full bg-[#1D6FF2] shadow-[0_0_10px_#1D6FF2]" /> {/* Europe */}
             </div>
          </div>
        </div>
      </section>

      {/* Agences (Offices) Section */}
      <section className="bg-white py-20 relative z-10">
        <div className="absolute inset-0 bg-[#f4f7f6] z-0" style={{ backgroundImage: "linear-gradient(135deg, rgba(29,111,242,0.03) 0%, transparent 100%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-16">
            <h2 className="text-[#1D6FF2] text-sm font-bold tracking-widest uppercase mb-2">Présence Locale</h2>
            <h3 className="font-heading text-4xl font-black text-[#0B1F3A]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Nos Agences
            </h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <div
                key={office.city}
                className="group relative rounded-3xl bg-white border border-gray-100 p-8 pt-10 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-[0_20px_40px_rgba(29,111,242,0.08)] overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1D6FF2] to-[#00AEEF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#1D6FF2]/5 text-[#1D6FF2] flex items-center justify-center mb-6 group-hover:bg-[#1D6FF2] group-hover:text-white transition-colors duration-300 shadow-sm border border-gray-50">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="font-heading text-xl font-bold text-[#0B1F3A] mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {office.city}
                  </div>
                  {office.address ? (
                    <p className="text-sm leading-relaxed text-gray-500 mb-6 flex-grow">
                      {office.address}
                    </p>
                  ) : <div className="flex-grow" />}
                  <a
                    href={`tel:${office.phone.replace(/\s|\/+/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1F3A] transition-colors duration-300 hover:text-[#1D6FF2] bg-gray-50 px-4 py-2 rounded-full group-hover:bg-blue-50"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    {office.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </div>
  );
}
