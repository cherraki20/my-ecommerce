import {
  Building,
  Building2,
  Handshake,
  MapPin,
  Phone,
  ShoppingCart,
  Star,
  Award,
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
      <span className="shrink-0 px-2 text-center font-heading text-lg font-bold tracking-tight text-ink/80">
        {brand.name}
      </span>
    );
  }

  return (
    <img
      src={brand.logo}
      alt={brand.name}
      onError={() => setFailed(true)}
      className="h-12 max-w-[160px] shrink-0 object-contain transition-all duration-300 ease-in-out hover:scale-110 md:h-14"
    />
  );
}

function PartnerBrandsMarquee() {
  const doubled = [...brands, ...brands];

  return (
    <section className="border-y border-ink/5 bg-surface/60 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-ink sm:mb-10 sm:text-3xl">
          Nos Marques Partenaires
        </h2>
      </div>

      <div className="overflow-hidden">
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
    <section className="bg-primary py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                Besoin d'aide pour votre projet ?
              </h3>
              <p className="mt-2 max-w-xl text-sm text-white/70 sm:text-base">
                Parlez à nos équipes et obtenez une solution adaptée à vos besoins
                en sécurité électronique.
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
    <>
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(29,109,242,0.22),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Qui Sommes Nous
          </h1>
          <p className="mt-4 text-lg font-medium text-accent sm:text-xl">
            La sécurité en toute confiance
          </p>
        </div>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4 text-ink/80">
              <p className="leading-relaxed">
                SFIB est une société spécialisée dans la distribution et
                l’intégration de systèmes de sécurité électronique au Maroc.
                Depuis notre création, nous accompagnons nos clients dans la
                mise en œuvre de solutions adaptées à leurs besoins en matière
                de sécurité.
              </p>
              <p className="leading-relaxed">
                Notre expertise couvre l’ensemble des domaines de la sécurité
                électronique : systèmes antivols EAS, vidéosurveillance,
                anti-intrusion, détection incendie, contrôle d’accès et
                sonorisation.
              </p>
              <p className="leading-relaxed">
                Nous nous engageons à vous accompagner pendant tout le
                processus de vos projets de sécurité électronique, depuis la
                conception jusqu’à la maintenance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-heading text-lg font-bold text-ink">
                      4 Agences au Maroc
                    </div>
                    <div className="mt-1 text-sm text-ink/70">Présence locale</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-heading text-lg font-bold text-ink">
                      5 Marques partenaires
                    </div>
                    <div className="mt-1 text-sm text-ink/70">Solutions fiables</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1F3A] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
            Notre Histoire
          </h2>

          <div className="mt-10 hidden lg:block">
            <div className="relative">
              <div className="absolute left-0 right-0 top-10 h-px bg-white/30" />
              <div className="grid grid-cols-5 gap-6">
                {milestones.map((milestone) => {
                  const Icon = iconMap[milestone.icon];
                  return (
                    <div key={milestone.year} className="relative text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#1D6FF2] bg-white text-[#0B1F3A]">
                        <Icon className="h-8 w-8" aria-hidden />
                      </div>
                      <p className="mt-4 text-xl font-bold text-[#1D6FF2]">
                        {milestone.year}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">
                        {milestone.fr}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:hidden">
            {milestones.map((milestone) => {
              const Icon = iconMap[milestone.icon];
              return (
                <div key={milestone.year} className="rounded-xl border border-white/15 bg-white/5 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#0B1F3A]">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#1D6FF2]">{milestone.year}</p>
                      <p className="text-sm font-semibold text-white">{milestone.fr}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PartnerBrandsMarquee />

      <section className="bg-surface py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">
            Nos Agences
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <div
                key={office.city}
                className="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-accent" aria-hidden />
                  <div>
                    <div className="font-heading text-lg font-bold text-ink">
                      {office.city}
                    </div>
                    {office.address ? (
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {office.address}
                      </p>
                    ) : null}
                    <a
                      href={`tel:${office.phone.replace(/\s|\/+/g, "")}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/80 transition-colors duration-300 hover:text-accent"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {office.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta />
    </>
  );
}
