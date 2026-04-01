import { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "../hooks/useCart.js";
import { products } from "../data/products.js";

const categoryOptions = [
  { value: "", label: "All categories" },
  { value: "surveillance", label: "Surveillance" },
  { value: "alarm", label: "Alarm Systems" },
  { value: "access", label: "Access Control" },
];

const brandOptions = [
  { value: "", label: "All brands" },
  ...Array.from(new Set(products.map((p) => p.brand)))
    .sort()
    .map((b) => ({ value: b, label: b })),
];

const priceOptions = [
  { value: "", label: "Any price" },
  { value: "0-199", label: "Under $200" },
  { value: "200-500", label: "$200 – $500" },
  { value: "501-", label: "Over $500" },
];

const sortOptions = [
  { value: "rating", label: "Rating" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function matchesPriceRange(price, range) {
  if (!range) return true;
  if (range === "0-199") return price < 200;
  if (range === "200-500") return price >= 200 && price <= 500;
  if (range === "501-") return price > 500;
  return true;
}

function Rating({ value }) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rounded
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-ink/25"
          }`}
          strokeWidth={i < rounded ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function ProductCardStyled({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide">
          {product.brand}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1 font-heading text-base font-bold text-[#1A1A2E] transition-colors duration-300 ease-in-out hover:text-[#1D6FF2]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3">
          <Rating value={product.rating} />
        </div>

        {product.price === 0 ? (
          <span className="mt-4 text-[#1D6FF2] font-bold text-sm">Sur devis</span>
        ) : (
          <p className="mt-4 font-heading text-base font-bold text-[#1D6FF2]">
            ${product.price.toLocaleString()}
          </p>
        )}

        {product.price === 0 ? (
          <button
            type="button"
            className="mt-auto bg-[#1D6FF2] text-white text-xs px-3 py-1.5 rounded-full hover:bg-[#1558d6] transition duration-200"
          >
            Demander un devis
          </button>
        ) : (
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="mt-auto w-full rounded-full bg-[#1D6FF2] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#1558d6]"
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
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
                  <ProductCardStyled key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
