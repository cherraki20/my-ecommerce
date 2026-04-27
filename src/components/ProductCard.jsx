import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist.js";
import { brandsData } from "../data/brandsData.js";

const getBrandColor = (brand) => {
  const b = brand?.toLowerCase() || "";
  if (b.includes("sensormatic")) return "#2a9d8f";
  if (b.includes("kantech")) return "#1D6FF2";
  if (b.includes("itc")) return "#e9c46a";
  if (b.includes("american dynamics")) return "#457b9d";
  if (b.includes("aguilera")) return "#f4a261";
  if (b.includes("dsc") || b.includes("intrusion")) return "#6b7280";
  return "#0B1F3A";
};

export default function ProductCard({ product, fromProducts = false }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(product.id);

  const brandData = brandsData.find((b) => b.name === product.brand);
  const brandColor = brandData?.color || getBrandColor(product.brand);
  const productUrl = product.url || "";
  const hasUrl = productUrl && productUrl !== "#";

  const categoryLabel = product.category
    ? product.category.replace(/-/g, " ")
    : null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">

      {/* ── IMAGE AREA ── */}
      <div className="relative h-52 bg-[#F8F9FA] flex items-center justify-center p-6 overflow-hidden">
        <Link
          to={`/products/${product.id}`}
          state={{ fromProducts }}
          className="absolute inset-0"
          aria-label={product.name}
        />

        <img
          src={product.image}
          alt={product.name}
          className="relative z-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />

        {/* Category badge — top left */}
        {categoryLabel && (
          <span
            className="absolute top-3 left-3 z-10 text-[10px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full"
            style={{ backgroundColor: brandColor }}
          >
            {categoryLabel}
          </span>
        )}

        {/* Wishlist icon — top right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            isFavorite ? removeFromWishlist(product.id) : addToWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
            isFavorite
              ? "bg-[#1D6FF2] text-white shadow-lg"
              : "bg-white/80 backdrop-blur-sm text-gray-400 hover:text-[#1D6FF2] shadow-sm"
          }`}
          title={isFavorite ? "Retirer de la liste" : "Ajouter à la liste"}
        >
          <Bookmark className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* ── INFO AREA ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Brand */}
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          {product.brand}
        </span>

        {/* Product name */}
        <Link to={`/products/${product.id}`} state={{ fromProducts }}>
          <h3 className="text-base font-bold text-[#1A1A2E] line-clamp-2 mb-4 hover:text-[#1D6FF2] transition-colors duration-200 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Divider + CTA */}
        <div className="mt-auto border-t border-gray-100 pt-4">
          {hasUrl ? (
            <button
              onClick={(e) => { e.stopPropagation(); window.open(productUrl, "_blank"); }}
              className="w-full bg-[#0B1F3A] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1D6FF2] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Voir le produit
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          ) : (
            <Link 
              to={`/products/${product.id}`} 
              state={{ fromProducts }}
              className="block w-full border border-[#1D6FF2] text-[#1D6FF2] rounded-xl py-2.5 text-sm font-semibold hover:bg-[#1D6FF2] hover:text-white transition-all duration-300 text-center"
            >
              Détails & Devis
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}