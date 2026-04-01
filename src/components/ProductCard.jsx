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
          className={`h-4 w-4 ${
            i < rounded ? "fill-amber-400 text-amber-400" : "fill-transparent text-ink/25"
          }`}
          strokeWidth={i < rounded ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt=""
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
          {product.brand}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1 font-heading text-lg font-bold text-ink transition-colors duration-300 ease-in-out hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3">
          <Rating value={product.rating} />
        </div>
        <p className="mt-4 font-heading text-xl font-bold text-accent">
          ${product.price.toLocaleString()}
        </p>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-auto w-full rounded-full bg-accent py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-accent/90 hover:shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
