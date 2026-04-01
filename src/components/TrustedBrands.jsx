import { useState } from "react";
import { brands } from "../data/brands.js";

function BrandMark({ brand }) {
  const [failed, setFailed] = useState(false);
  const showAsText = failed || !brand.logo;

  if (showAsText) {
    return <span className="px-4 text-lg font-bold text-[#0B1F3A]">{brand.name}</span>;
  }

  return (
    <img
      src={brand.logo}
      alt={brand.name}
      onError={() => setFailed(true)}
      className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-110"
    />
  );
}

export default function TrustedBrands() {
  const doubled = [...brands, ...brands];

  return (
    <section className="border-y border-ink/5 bg-gray-200/60 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-ink sm:mb-10 sm:text-3xl">
          Trusted Brands
        </h2>
      </div>
      <div className="overflow-hidden">
        <div className="animate-brand-scroll flex w-max items-center gap-12 sm:gap-16 lg:gap-20">
          {doubled.map((brand, i) => (
            <BrandMark key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
