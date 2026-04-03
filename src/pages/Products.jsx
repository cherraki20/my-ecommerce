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
      const aP = CAT_PRIORITY[a.category] ?? 99;
      const bP = CAT_PRIORITY[b.category] ?? 99;
      if (aP !== bP) return aP - bP;

      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.rating - a.rating;
    });

    return list.slice(0, 10);
  }, [category, brand, priceRange, sort, q]);

  return (
    <div className="bg-[#F4F6FA] min-h-screen">

      {/* 🔥 HERO MODERN */}
      <div className="relative py-24 px-8 text-white text-center overflow-hidden
        bg-gradient-to-br from-[#081a33] via-[#0d2b50] to-[#081a33]">

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
          Nos Produits
        </h1>

        <p className="text-gray-300 text-lg max-w-xl mx-auto opacity-90">
          Découvrez notre gamme complète de systèmes de sécurité
        </p>
      </div>

      {/* CONTENT */}
      <div className="py-16 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-10 lg:flex-row">

          {/* FILTERS */}
          <aside className="w-full lg:w-72">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-sm font-bold uppercase text-gray-700 mb-6">
                Filtres
              </h2>

              <div className="space-y-5">
                <select
                  value={category}
                  onChange={(e) => setParam("category", e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                >
                  {categoryOptions.map((o) => (
                    <option key={o.value || "all"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <select
                  value={priceRange}
                  onChange={(e) => setParam("price", e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                >
                  {priceOptions.map((o) => (
                    <option key={o.value || "any"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <select
                  value={brand}
                  onChange={(e) => setParam("brand", e.target.value)}
                  className="w-full rounded-xl border px-3 py-3"
                >
                  {brandOptions.map((o) => (
                    <option key={o.value || "brand"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">
                {filtered.length} produits trouvés
              </p>

              <select
                value={sort}
                onChange={(e) => setParam("sort", e.target.value)}
                className="rounded-xl border px-3 py-2"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow">
                <p className="text-gray-500">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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