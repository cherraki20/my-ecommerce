import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation, useNavigate, Link } from "react-router-dom";
import {
  Lock,
  Tag,
  ShieldCheck,
  ScanLine,
  Unlock,
  ShieldAlert,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Filter,
  Grid
} from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import { categories } from "../data/categories.js";
import { brandsData } from "../data/brandsData.js";
import API_URL from "../utils/api.js";

const CATEGORY_SHOWCASE = {
  "detection-systems": {
    image: "/images/showcase/Systèmes de détection.jpg",
    ctaImage: "/images/showcase/cta/Systèmes de détection.jpg",
    title: "Protection des storefronts",
    description: "Les systèmes de détection EAS Sensormatic offrent une protection fiable contre le vol à l'étalage. Nos portiques antimagnétiques et antennes de détection assurent une surveillance discrète et efficace de vos zones sensibles.",
    ctaTitle: "Sécurisez votre magasin avec nos systèmes de détection",
    ctaDescription: "Prenez le contrôle de votre storefront with nos solutions de détection fiables et éprouvées."
  },
  "coffres-forts-emballages": {
    image: "/images/showcase/Boîtiers et antivols araignée.jpg",
    ctaImage: "/images/showcase/cta/Boîtiers et antivols araignée.png",
    title: "Sécurité renforcée",
    description: "Nos boîtiers de protection transparents et antivols araignée permettent un merchandising ouvert sécurisé. Protégez vos articles à haute valeur tout en les mettant en valeur.",
    ctaTitle: "Protégez vos produits avec nos boîtiers de sécurité",
    ctaDescription: "Des solutions de protection transparentes et efficaces pour un merchandising ouvert en toute confiance."
  },
  "etiquettes": {
    image: "/images/showcase/Étiquettes.jpg",
    ctaImage: "/images/showcase/cta/Étiquettes.jpg",
    title: "Protection discrète",
    description: "Les étiquettes EAS AM et RF Sensormatic offrent une protection invisible pour tous types de marchandises. Solution économique et efficace pour la prévention des pertes.",
    ctaTitle: "Sécurisez discrètement tous vos articles",
    ctaDescription: "Des étiquettes invisibles qui protègent vos marchandises sans altérer leur présentation."
  },
  "etiquettes-rigides": {
    image: "/images/showcase/Antivols rigides.jpg",
    ctaImage: "/images/showcase/cta/Antivols rigides.jpg",
    title: "Antivols performants",
    description: "Les tags durs SuperTag et antivols magnétiques Sensormatic garantissent une protection maximale des articles à forte valeur. Compatible avec tous les détacheurs de puissance.",
    ctaTitle: "Antivols robustes pour articles de valeur",
    ctaDescription: "Protection maximale pour vos produits sensibles avec nos solutions d'antivols rigides."
  },
  "detachers-deactivators": {
    image: "/images/showcase/Détacheurs et désactivateurs.jpg",
    ctaImage: "/images/showcase/cta/Détacheurs et désactivateurs.jpg",
    title: "Solution complète au point de vente",
    description: "Les détacheurs et désactiveurs Sensormatic permettent un retrait rapide et sécurisé des antivols au point de vente. Améliorez l'expérience client tout en maintenant une protection optimale.",
    ctaTitle: "Fluidifiez votre passage en caisse",
    ctaDescription: "Des solutions rapides et efficaces pour le retrait des antivols au point de vente."
  },
  "logiciels": {
    image: "/produit/kantech-software.png",
    ctaImage: "/produit/kantech-software.png",
    title: "Gestion de Sécurité EntraPass",
    description: "Le logiciel EntraPass de Kantech offre une interface conviviale pour gérer le contrôle d'accès sur une base locale ou à distance. Une solution évolutive qui grandit avec votre entreprise.",
    ctaTitle: "Optimisez votre gestion de sécurité avec EntraPass",
    ctaDescription: "Une visibilité complète et un contrôle total sur vos accès, où que vous soyez."
  },
  "controleurs-de-portes-et-peripheriques": {
    image: "/produit/kantech-controller.png",
    ctaImage: "/produit/kantech-controller.png",
    title: "Contrôleurs de Porte Haute Performance",
    description: "Les contrôleurs Kantech comme le KT-400 et le KT-1 sont l'épine dorsale de tout système de contrôle d'accès robuste, offrant une fiabilité inégalée et une installation simplifiée.",
    ctaTitle: "Fiabilisez vos accès avec les contrôleurs Kantech",
    ctaDescription: "Des composants robustes conçus pour une sécurité continue et une intégration parfaite."
  }
};

// Slugification utility
const slugify = (text) => {
  if (!text) return "";
  return text.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

// Dynamic Category Options based on brand
const getCategoryOptions = (brand) => {
  if (!brand) return [{ value: "", label: "Toutes" }];
  const options = [{ value: "", label: "Toutes" }];
  
  brand.categories.forEach(item => {
    const label = typeof item === "string" ? item : item.name;
    options.push({ value: slugify(label), label: label, raw: item });
  });
  return options;
};

// Get Subcategories if they exist for a selected category slug
const getSubcategoryOptions = (brand, categoryValue) => {
  if (!brand || !categoryValue) return [];
  
  // Find the selected category object
  const selectedCatObj = brand.categories.find(item => {
    const label = typeof item === "string" ? item : item.name;
    return slugify(label) === categoryValue;
  });

  if (!selectedCatObj || !selectedCatObj.subcategories) return [];

  return selectedCatObj.subcategories.map(sub => ({
    value: slugify(sub),
    label: sub
  }));
};

const sortOptions = [
  { value: "rating", label: "Évaluation" },
];

// REUSABLE BRAND CARD COMPONENT
const BrandCard = ({ brand, onClick, index }) => (
  <div
    onClick={onClick}
    className={`group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col items-center text-center h-full border-t-4 border-transparent hover:border-t-4 hover:border-t-[var(--brand-color)] animate-fadeIn-delay-${(index % 5) + 1} overflow-hidden`}
    style={{ '--brand-color': brand.color }}
  >
    {/* Product Count Badge */}
    {/* Product Count Badge REMOVED for clean premium look */}


    {/* Logo Container */}
    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 shadow-inner border border-gray-200/50">
      <img
        src={brand.logo}
        alt={brand.name}
        className="h-12 w-16 object-contain"
      />
    </div>
    
    <h3 className="text-2xl font-black text-[#0B1F3A] mb-1">{brand.name}</h3>
    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-4">{brand.tagline}</p>
    
    <div className="w-12 h-0.5 bg-gray-100 mb-4 group-hover:w-24 transition-all duration-500"></div>

    <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">
      {brand.description}
    </p>

    <div className="mt-auto w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {brand.categories.slice(0, 3).map((cat, i) => (
          <span 
            key={i} 
            className="text-[10px] font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase tracking-wider transition-colors group-hover:bg-[#1D6FF2]/10 group-hover:text-[#1D6FF2]"
          >
            {typeof cat === "string" ? cat : cat.name}
          </span>
        ))}
      </div>
      
      {/* Arrow Bottom Right */}
      <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="h-5 w-5" style={{ color: brand.color }} />
      </div>
    </div>
  </div>
);

// SKELETON COMPONENT
const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse h-96">
        <div className="bg-gray-100 rounded-xl h-48 w-full mb-6"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-100 rounded w-3/4 mb-6"></div>
        <div className="mt-auto pt-6 border-t border-gray-50 flex gap-4">
            <div className="h-10 bg-gray-100 rounded-xl flex-1"></div>
        </div>
    </div>
);

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json().catch(() => []);
        if (!res.ok) throw new Error(data?.error || data?.message || "Erreur de chargement.");
        const normalized = (Array.isArray(data) ? data : []).map((p) => ({
          id: p.id,
          name: p.name ?? "",
          image: p.image ?? "",
          url: p.url ?? "",
          brand: p.brand ?? "SFIB",
          category: p.category ?? "",
          subcategory: p.subcategory ?? "",
          description: p.description ?? "",
          rating: typeof p.rating === "number" ? p.rating : 5,
          inStock: p.inStock ?? true,
          featured: p.featured ?? false,
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
    return () => {
      alive = false;
    };
  }, []);

  const category = searchParams.get("category") ?? "";
  const subcategory = searchParams.get("sub") ?? "";
  const sort = searchParams.get("sort") ?? "rating";
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  const setParam = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!value) next.delete(key);
        else next.set(key, value);
        
        // If changing category, clear subcategory
        if (key === "category") next.delete("sub");
        
        return next;
      });
    },
    [setSearchParams]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (category && p.category !== category) return false;
      if (subcategory && p.subcategory !== subcategory) return false;
      if (selectedBrand && p.brand.toLowerCase() !== selectedBrand.name.toLowerCase()) return false;
      if (q) {
        const blob = `${p.name} ${p.brand} ${p.description}`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, subcategory, selectedBrand, q]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {selectedBrand === null ? (
        // ==============================================
        // LEVEL 1: BRANDS PAGE
        // ==============================================
        <div className="animate-fadeIn">
          <div className="relative min-h-[420px] flex items-center overflow-hidden bg-[#0B1F3A]">
            {/* Background image */}
            <img
              src="/back/sfib ass 2.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
            />
            
            {/* Gradient overlay - Stronger on the left for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A] via-[#0B1F3A]/80 to-transparent" />

            {/* Content — centered left */}
            <div className="relative z-10 max-w-7xl mx-auto px-8 py-20 w-full">
              <p className="text-[#1D6FF2] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                SFIB SECURITY — DISTRIBUTEUR OFFICIEL
              </p>
              <h1
                className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 max-w-2xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Nos Marques<br />
                <span className="italic text-white/80">Partenaires</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-xl mb-8 leading-relaxed">
                Découvrez notre sélection de marques leaders en sécurité électronique, 
                disponibles au Maroc via SFIB.
              </p>
              <button
                onClick={() => document.getElementById('brands-grid').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1D6FF2] text-white px-8 py-3 rounded-full font-semibold 
                          hover:bg-[#1558d6] transition duration-300"
              >
                Découvrir les marques ↓
              </button>
            </div>
          </div>

          <div id="brands-grid" className="py-20 px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {brandsData.map((brand, idx) => (
                <BrandCard 
                    key={brand.id} 
                    brand={brand} 
                    index={idx}
                    onClick={() => {
                        setSelectedBrand(brand);
                        setParam("category", "");
                        setParam("sub", "");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} 
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ==============================================
        // LEVEL 2: BRAND DETAIL
        // ==============================================
        <div className="animate-fadeIn">
          {/* Enhanced Brand Header */}
          <div 
            className="h-80 relative flex items-center overflow-hidden" 
            style={{ backgroundColor: selectedBrand.color }}
          >
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
            
            <div className="max-w-7xl mx-auto w-full px-8 flex flex-col md:flex-row items-center gap-10 relative z-10">
                {/* Floating Logo Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl transition-transform hover:scale-105">
                    <img
                        src={selectedBrand.logo}
                        alt={selectedBrand.name}
                        className="h-20 w-40 object-contain"
                    />
                </div>

                <div className="flex-1 text-center md:text-left text-white">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">{selectedBrand.name}</h1>
                        <span className="bg-blue-500/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20">
                            Partenaire officiel SFIB
                        </span>
                    </div>
                    <p className="text-white/80 text-xl max-w-3xl font-medium leading-relaxed mb-6">
                        {selectedBrand.description}
                    </p>
                    
                    {/* Stats REMOVED for clean premium look */}

                </div>
            </div>
          </div>

          <div className="py-12 px-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
               <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setParam("category", "");
                    setParam("sub", "");
                    setParam("q", "");
                  }}
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:shadow-sm transition-all group"
               >
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Retour aux marques
               </button>
            </div>

            {/* Category Showcase Removed for clean design */}


            <div className="flex flex-col lg:flex-row gap-16">
              {/* Sidebar Filters - PILLS DESIGN */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 sticky top-28">
                  {/* Premium Sidebar Header */}
                  <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Filter className="h-4 w-4 text-[#1D6FF2]" />
                      </div>
                      <h2 className="text-xs font-black uppercase text-[#0B1F3A] tracking-[0.2em]">Affiner</h2>
                    </div>
                    {(category || subcategory) && (
                       <button 
                        onClick={() => { setParam("category", ""); setParam("sub", ""); }} 
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-widest border border-red-100 px-3 py-1 rounded-full hover:bg-red-50"
                       >
                        Réinitialiser
                       </button>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* Main Categories Vertical List */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Catégories</label>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        {getCategoryOptions(selectedBrand).map(opt => (
                          <button
                            key={opt.value}
                            onClick={() => setParam("category", opt.value)}
                            className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all text-left ${
                              category === opt.value 
                                ? "bg-blue-50 text-[#1D6FF2] shadow-sm shadow-blue-500/5" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <div className="flex-shrink-0">
                               {category === opt.value ? (
                                 <div className="w-1.5 h-1.5 rounded-full bg-[#1D6FF2] shadow-lg shadow-blue-500/40"></div>
                               ) : (
                                 <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-gray-300 transition-colors"></div>
                               )}
                            </div>

                            <span className="flex-1 leading-tight">{opt.label}</span>
                            
                            <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                               category === opt.value ? "text-[#1D6FF2] translate-x-0" : "text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>

                        {/* Subcategories moved to top of products grid for better visibility per user request */}

                  </div>
                </div>
              </aside>

              {/* Products List Segment */}
              <div className="flex-1">
                {/* 3rd Level: Horizontal Subcategories Bar - PREMIUM PLACEMENT */}
                {category && getSubcategoryOptions(selectedBrand, category).length > 0 && (
                  <div className="mb-10 animate-fade-down bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4 mb-5 px-2">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Affiner par sous-catégorie</span>
                      <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      <button
                        onClick={() => setParam("sub", "")}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border-2 uppercase tracking-wider ${
                          !subcategory 
                            ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-lg" 
                            : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        Toutes
                      </button>
                      {getSubcategoryOptions(selectedBrand, category).map(subOpt => (
                        <button
                          key={subOpt.value}
                          onClick={() => setParam("sub", subOpt.value)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all border-2 uppercase tracking-wider ${
                            subcategory === subOpt.value 
                              ? "bg-[#1D6FF2] border-[#1D6FF2] text-white shadow-lg shadow-blue-500/20 scale-105" 
                              : "bg-gray-50 border-transparent text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          }`}
                        >
                          {subOpt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:flex-row justify-between items-md-center gap-6 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1D6FF2]/10 rounded-2xl flex items-center justify-center text-[#1D6FF2]">
                        <Grid className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-[#0B1F3A]">Catalogue {selectedBrand.name}</h2>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
                          {filtered.length} RÉFÉRENCES TROUVÉES
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trié par:</span>
                    <select
                      value={sort}
                      onChange={(e) => setParam("sort", e.target.value)}
                      className="bg-transparent text-sm font-bold text-[#0B1F3A] focus:outline-none"
                    >
                      {sortOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                  </div>
                ) : error ? (
                  <div className="bg-white rounded-3xl p-20 text-center shadow-sm border border-red-50">
                    <p className="text-red-500 font-bold">{error}</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="bg-white rounded-[3rem] p-24 text-center shadow-sm border border-gray-100 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                      <Tag className="h-10 w-10 text-gray-300" />
                    </div>
                    <h3 className="text-3xl font-black text-[#0B1F3A] mb-4">Aucun produit trouvé</h3>
                    <p className="text-gray-400 max-w-sm mx-auto font-medium mb-10">Désolé, nous n'avons pas trouvé de produits correspondant à vos critères pour cette marque.</p>
                    <Link
                      to="/contact"
                      className="bg-[#0B1F3A] text-white rounded-full px-10 py-4 text-base font-bold transition-all hover:bg-[#1D6FF2] hover:shadow-xl hover:-translate-y-1"
                    >
                      Contactez-nous
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fadeIn">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} fromProducts={true} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Category Showcase CTA - RESTORED (IMPACTFUL & CLEAR VERSION) */}
            {category && CATEGORY_SHOWCASE[category] && (
              <section className="overflow-hidden rounded-[3rem] bg-[#0B1F3A] shadow-2xl border-4 border-white mb-16 min-h-[450px] flex animate-fadeIn">
                <div className="flex flex-col lg:flex-row w-full">
                  <div className="flex flex-1 flex-col justify-center p-12 lg:p-20">
                    <h2 className="mb-6 text-3xl font-black text-white lg:text-5xl tracking-tight leading-tight">
                      {CATEGORY_SHOWCASE[category].ctaTitle}
                    </h2>
                    <p className="mb-10 text-lg text-gray-400 leading-relaxed max-w-xl font-medium opacity-90">
                      {CATEGORY_SHOWCASE[category].ctaDescription}
                    </p>
                    <Link
                      to="/contact"
                      className="w-fit rounded-full bg-[#1D6FF2] px-10 py-5 text-base font-bold text-white transition-all hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1 active:scale-95"
                    >
                      Obtenir une consultation gratuite
                    </Link>
                  </div>
                  <div className="lg:w-1/2 relative min-h-[350px] lg:min-h-0">
                    <img
                      src={CATEGORY_SHOWCASE[category].ctaImage}
                      alt={CATEGORY_SHOWCASE[category].ctaTitle}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
}