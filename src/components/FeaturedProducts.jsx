import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products.js";

function Stars({ rating }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i + 1 <= rounded;
        return (
          <span
            key={i}
            className={filled ? "text-yellow-400" : "text-gray-200"}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

function formatPriceBadge(product) {
  if (product.price === 0) return "Sur devis";
  return product.priceLabel ?? "Sur devis";
}

export default function FeaturedProducts() {
  const navigate = useNavigate();

  const featured = useMemo(() => {
    return products.filter((p) => p.featured).slice(0, 8);
  }, []);

  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-widest">
              SFIB SECURITY
            </p>
            <h2
              className="text-4xl font-black text-[#0B1F3A]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Produits Vedettes
            </h2>
          </div>

          <Link
            to="/products"
            className="text-[#1D6FF2] font-semibold hover:underline"
          >
            Voir tous les produits →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const priceBadge = formatPriceBadge(product);
            const rating = typeof product.rating === "number" ? product.rating : 0;
            return (
              <div
                key={product.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                onClick={() => navigate("/products")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") navigate("/products");
                }}
              >
                <div className="relative h-[200px] w-full bg-[#F4F6FA]">
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-[#1D6FF2]/10 px-2 py-1 text-xs font-semibold text-[#1D6FF2]">
                    {product.category}
                  </div>
                  <div className="absolute right-4 top-4 z-10 rounded-full bg-[#0B1F3A] px-2 py-1 text-xs font-bold text-white">
                    {priceBadge}
                  </div>

                  <div className="flex h-full w-full items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                      draggable={false}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-1 text-xs font-medium uppercase tracking-widest text-gray-400">
                    {product.brand}
                  </div>

                  <div
                    className="mb-3 overflow-hidden text-base font-bold leading-snug text-[#1A1A2E] max-h-[2.6em]"
                    title={product.name}
                  >
                    {product.name}
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between gap-4">
                      <Stars rating={rating} />
                      <button
                        type="button"
                        className="rounded-full bg-[#1D6FF2] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1558d6] transition duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/products");
                        }}
                      >
                        Devis →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
