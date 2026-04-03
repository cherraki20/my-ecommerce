import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useCart } from "../hooks/useCart.js";

function Rating({ value }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rounded ? "fill-amber-400 text-amber-400" : "fill-transparent text-ink/25"}`}
          strokeWidth={i < rounded ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

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

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const brandColor = getBrandColor(product.brand);
  const productUrl = product.url || "#";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <a href={productUrl} target="_blank" rel="noopener noreferrer" className="block">

        <div style={{ background: brandColor }} className="py-2 text-center">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {product.brand}
          </span>
        </div>

        <div className="h-36 flex items-center justify-center bg-gray-50 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[120px] max-w-full object-contain transition-transform duration-500 hover:scale-110"
            draggable={false}
          />
        </div>

      </a>

      <div className="flex flex-1 flex-col p-5 text-center">

        <a href={productUrl} target="_blank" rel="noopener noreferrer">
          <h3 className="line-clamp-2 min-h-[3rem] text-sm font-extrabold uppercase text-[#1A1A2E] hover:text-accent transition">
            {product.name}
          </h3>
        </a>

        <p className="mt-1 text-xs text-gray-400 font-semibold">
          {product.brand}
        </p>

        <div className="mt-3 flex justify-center">
          <Rating value={product.rating} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-4">

          {product.price === 0 ? (
            <span className="text-sm font-bold text-accent"></span>
          ) : (
            <span className="text-lg font-black text-accent">
              ${product.price.toLocaleString()}
            </span>
          )}

          {product.price === 0 ? (
            <a href={productUrl} target="_blank" rel="noopener noreferrer" className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition truncate max-w-[120px]">
              Accès officiel
            </a>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="bg-accent text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition"
            >
              Ajouter
            </button>
          )}

        </div>
      </div>
    </article>
  );
}