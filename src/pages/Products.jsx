import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

const CAT_PRIORITY = {
  "anti-intrusion": 1,
  "controle-d-acces": 2,
  "eas-sensormatic": 3,
  "sonorisation": 4,
  "video-surveillance": 5,
  "detection-incendie": 6,
};

const categoryOptions = [
  { value: "", label: "Toutes les catégories" },
  { value: "anti-intrusion", label: "Anti-Intrusion" },
  { value: "controle-d-acces", label: "Contrôle d'Accès" },
  { value: "eas-sensormatic", label: "EAS Sensormatic" },
  { value: "sonorisation", label: "Sonorisation" },
  { value: "video-surveillance", label: "Vidéosurveillance" },
  { value: "detection-incendie", label: "Incendie" },
];

const brandOptions = [
  { value: "", label: "Toutes les marques" },
  ...Array.from(new Set(products.map((p) => p.brand)))
    .sort()
    .map((b) => ({ value: b, label: b })),
];

const priceOptions = [
  { value: "", label: "Tout prix" },
  { value: "0-0", label: "Sur devis" },
  { value: "0-500", label: "Moins de 500$" },
  { value: "500-2000", label: "500$ – 2000$" },
  { value: "2001-", label: "Plus de 2000$" },
];

const sortOptions = [
  { value: "rating", label: "Évaluation" },
  { value: "price-asc", label: "Prix: Croissant" },
  { value: "price-desc", label: "Prix: Décroissant" },
];

function matchesPriceRange(price, range) {
  if (!range) return true;
  if (range === "0-0") return price === 0;
  
  const [min, max] = range.split("-").map(Number);
  if (isNaN(max)) return price >= min;
  return price >= min && price <= max;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const brand = searchParams.get("brand") ?? "";
  const priceRange = searchParams.get("price") ?? "";
  const sort = searchParams.get("sort") ?? "rating";
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const setParam = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!value) next.delete(key);
        else next.set(key, value);
        return next;
      });
    },
    [setSearchParams]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (!matchesPriceRange(p.price, priceRange)) return false;
      if (q) {
        const blob = `${p.name} ${p.brand} ${p.description}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      // 1. Sort by category priority from Hero
      const aP = CAT_PRIORITY[a.category] ?? 99;
      const bP = CAT_PRIORITY[b.category] ?? 99;
      if (aP !== bP) return aP - bP;

      // 2. Sort by user choice
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.rating - a.rating;
    });

    return list;
  }, [category, brand, priceRange, sort, q]);

  return (
    <div className="bg-[#F4F6FA]">
      <div className="bg-[#0B1F3A] py-16 px-8 text-white text-center">
        <h1
          className="text-4xl font-black mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Nos Produits
        </h1>
        <p className="text-gray-300 text-lg">
          Découvrez notre gamme complète de systèmes de sécurité
        </p>
      </div>

      <div className="py-12 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-ink">
                Filters
              </h2>

              <div className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-xs font-semibold text-ink/60">
                    Category
                  </span>
                  <select
                    value={category}
                    onChange={(e) => setParam("category", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2.5 font-body text-sm text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {categoryOptions.map((o) => (
                      <option key={o.value || "all"} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-ink/60">
                    Price range
                  </span>
                  <select
                    value={priceRange}
                    onChange={(e) => setParam("price", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2.5 font-body text-sm text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {priceOptions.map((o) => (
                      <option key={o.value || "any"} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-ink/60">Brand</span>
                  <select
                    value={brand}
                    onChange={(e) => setParam("brand", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink/10 bg-surface px-3 py-2.5 font-body text-sm text-ink transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    {brandOptions.map((o) => (
                      <option key={o.value || "all-brands"} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink/60">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}{" "}
                found
              </p>
              <label className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink/60">
                  Sort by
                </span>
                <select
                  value={sort}
                  onChange={(e) => setParam("sort", e.target.value)}
                  className="rounded-xl border border-ink/10 bg-white px-3 py-2.5 font-body text-sm text-ink shadow-sm transition-colors duration-300 ease-in-out focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:min-w-[220px]"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <p className="font-body text-ink/70">
                  No products match your filters.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setSearchParams(new URLSearchParams(), { replace: true })
                  }
                  className="mt-4 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-accent/90"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
