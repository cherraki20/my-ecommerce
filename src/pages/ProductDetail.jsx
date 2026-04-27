import { useNavigate, useParams } from "react-router-dom";
import { Star, ShieldCheck, Zap, BookmarkPlus, BookmarkCheck, ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useWishlist } from "../hooks/useWishlist.js";

function Rating({ value }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rounded ? "fill-[#1D6FF2] text-[#1D6FF2]" : "fill-transparent text-gray-300"
          }`}
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
  return "#1D6FF2";
};

export default function ProductDetail() {
  const { productId } = useParams();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();
  const isFavorite = isInWishlist(productId);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/products");
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error(data?.error || data?.message || "Erreur de chargement.");
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.id,
          name: p.name ?? "",
          image: p.image ?? "",
          url: p.url ?? "",
          brand: p.brand ?? "SFIB",
          category: p.category ?? "",
          description: p.description ?? "",
          price: typeof p.price === "number" ? p.price : 0,
          rating: typeof p.rating === "number" ? p.rating : 5,
        }));
        if (!alive) return;
        setProducts(normalized);
      } catch (e) {
        if (!alive) return;
        setProducts([]);
        setError(e?.message || "Erreur de chargement.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(productId)) ?? null,
    [products, productId]
  );

  const imageSrc = useMemo(() => {
    const img = product?.image || "";
    if (!img) return "";
    if (/^https?:\/\//i.test(img)) return img;
    if (img.startsWith("data:")) return img;
    if (img.startsWith("/")) return img;
    return `${import.meta.env.BASE_URL}${img}`;
  }, [product?.image]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1D6FF2]/20 border-t-[#1D6FF2] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center flex-col px-4 text-center">
        <h2 className="text-2xl font-bold text-[#0B1F3A] mb-4">Produit non trouvé</h2>
        <button
          onClick={() => navigate("/products")}
          className="rounded-full bg-[#1D6FF2] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#0B1F3A]"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  const brandColor = getBrandColor(product.brand);

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24">

      {/* Breadcrumb / Back bar */}
      <div className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3 flex-wrap">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1D6FF2] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Retour
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{product.brand}</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-bold text-[#0B1F3A] line-clamp-1">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-12">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start xl:gap-20">

          {/* ── IMAGE ── */}
          <div className="group animate-fadeIn">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-10 flex items-center justify-center aspect-square hover:shadow-xl transition-shadow duration-500">
              <img
                src={imageSrc}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* ── INFO ── */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>

            {/* Brand + category badges */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border"
                style={{
                  borderColor: brandColor,
                  color: brandColor,
                  backgroundColor: `${brandColor}18`,
                }}
              >
                {product.brand}
              </span>
              <span className="h-px w-6 bg-gray-200"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {product.category.replace(/-/g, " ")}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl font-black leading-tight text-[#0B1F3A] sm:text-5xl tracking-tight mb-6">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-8">
              <Rating value={product.rating} />
              <span className="text-xs font-bold text-gray-400 border-l border-gray-200 pl-4 uppercase tracking-widest">
                Security Grade A+
              </span>
            </div>

            {/* Price card */}
            <div className="mb-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <span className="block text-[10px] font-black text-[#1D6FF2] uppercase tracking-[0.3em] mb-1">
                Tarification
              </span>
              <p className="text-4xl font-black text-[#0B1F3A]">
                {product.price === 0 ? "Sur devis" : `${product.price.toLocaleString()} MAD`}
              </p>
            </div>

            {/* Description */}
            <p className="mb-10 text-gray-600 leading-relaxed text-base font-medium">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#0B1F3A] px-10 py-4 text-sm font-black text-white shadow-lg transition-all hover:bg-[#1D6FF2] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
              >
                <Zap className="h-4 w-4 fill-white" />
                DEMANDER UN DEVIS
              </button>

              <button
                type="button"
                onClick={() =>
                  isFavorite ? removeFromWishlist(product.id) : addToWishlist(product)
                }
                className={`flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black border-2 transition-all hover:-translate-y-0.5 active:scale-95 ${
                  isFavorite
                    ? "bg-[#1D6FF2] border-[#1D6FF2] text-white shadow-lg"
                    : "bg-white border-gray-200 text-gray-500 hover:border-[#1D6FF2] hover:text-[#1D6FF2]"
                }`}
              >
                {isFavorite ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <BookmarkPlus className="h-4 w-4" />
                )}
                {isFavorite ? "Sauvegardé" : "Sauvegarder"}
              </button>
            </div>

            {/* Guarantee badge */}
            <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-2xl p-4">
              <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider">
                  Garanti Professionnel
                </h4>
                <p className="text-xs text-green-600 mt-0.5">
                  Support technique dédié 24/7 pour installations critiques.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SPECS SECTION ── */}
        {product.description && (
          <div className="mt-20 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xl font-black text-[#0B1F3A] uppercase tracking-widest whitespace-nowrap">
                Spécifications Techniques
              </h2>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-[#1D6FF2]/30 to-transparent"></div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
