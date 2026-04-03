import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Facebook,
  LayoutDashboard,
  LogOut,
  Menu,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Twitter,
  X,
} from "lucide-react";
import { useCart } from "../hooks/useCart.js";
import { clearAuthState, getAuthState } from "../utils/authStorage.js";
import sfibLogo from "../assets/sfib-logo.png";

const mainNavLinkClass = ({ isActive }) =>
  isActive
    ? "text-[#1D6FF2] border-b-2 border-[#1D6FF2] px-3 py-1 text-sm font-medium"
    : "text-gray-300 hover:text-white px-3 py-1 text-sm font-medium";

export default function Navbar({ onOpenCart }) {
  const { itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [auth, setAuth] = useState(() => getAuthState());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setAuth(getAuthState());
    window.addEventListener("sfib-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sfib-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    function handleDoc(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("click", handleDoc);
    return () => document.removeEventListener("click", handleDoc);
  }, []);

  const handleLogout = () => {
    clearAuthState();
    setAuth(getAuthState());
    setUserMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <nav className="sticky top-0 z-50">

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <aside className="fixed right-0 top-[40px] bottom-0 w-[280px] bg-[#0B1F3A] shadow-2xl flex flex-col border-l border-[#1D6FF2]/30">
            <div className="flex items-center justify-between p-4 border-b border-[#1D6FF2]/30 h-16">
              <span className="font-bold text-white text-lg">Menu</span>
              <button 
                type="button"
                onClick={() => setMobileOpen(false)} 
                className="p-2 text-white bg-[#1D6FF2] rounded-lg hover:bg-[#1558d6] transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col">
                <NavLink to="/" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Accueil</NavLink>
                <NavLink to="/about" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Qui Sommes Nous</NavLink>
                <NavLink to="/services" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Services</NavLink>
                <NavLink to="/products" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Produits</NavLink>
                <NavLink to="/references" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Références</NavLink>
                <NavLink to="/contact" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-300 font-medium border-b border-[#1D6FF2]/20 hover:bg-[#1D6FF2]/20 hover:text-white transition">Contact</NavLink>
              </div>
            </div>
            <div className="p-4 border-t border-[#1D6FF2]/30">
              <button onClick={() => { setMobileOpen(false); onOpenCart(); }} className="w-full flex items-center justify-center gap-2 bg-[#1D6FF2] text-white py-3 rounded-full font-semibold hover:bg-[#1558d6] transition">
                <ShoppingCart className="h-5 w-5" />
                Panier ({itemCount})
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TOP BAR */}
      <div className="bg-[#F8F9FA] border-b border-gray-200 py-2 px-8 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

          {/* Partner Logos */}
          <div className="hidden md:flex items-center gap-6">
            <a href="https://www.sensormatic.com" target="_blank" rel="noreferrer">
              <img src="logo-sensormatic.png" className="h-7 hover:scale-110 transition" />
            </a>
            <a href="https://www.americandynamics.net" target="_blank" rel="noreferrer">
              <img src="logo-american-dynamics.png" className="h-7 hover:scale-110 transition" />
            </a>
            <a href="https://www.kantech.com" target="_blank" rel="noreferrer">
              <img src="logo-kantech.png" className="h-7 hover:scale-110 transition" />
            </a>
            <a href="https://invue.com" target="_blank" rel="noreferrer">
              <img src="logo-invue.png" className="h-7 hover:scale-110 transition" />
            </a>
            <a href="https://www.dahuasecurity.com" target="_blank" rel="noreferrer">
              <img src="logo-Dahua.png" className="h-7 hover:scale-110 transition" />
            </a>
            <a href="https://www.itctech.com.cn/" target="_blank" rel="noreferrer">
              <img src="itc.png" className="h-10 hover:scale-110 transition" />
            </a>
            <a href="https://www.hikvision.com" target="_blank" rel="noreferrer">
              <img src="HINKVISION.png" className="h-12 hover:scale-110 transition" />
            </a>
            <a href="https://www.uniview.com" target="_blank" rel="noreferrer">
              <img src="UNV.png" className="h-12 hover:scale-110 transition" />
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-gray-500">Suivez-nous</span>

            <a href="#" className="text-gray-500 hover:text-[#1D6FF2]">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#1D6FF2]">
              <Twitter className="h-4 w-4" />
            </a>

            <span className="hidden sm:inline text-gray-300">|</span>

            <div className="flex items-center gap-2 font-bold text-[#0B1F3A]">
              <Phone className="h-4 w-4" />
              <span>(+212) 522 394 904</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-[#0B1F3A] h-24 px-8 border-b border-[#1D6FF2]/30 flex items-center relative z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full">

          {/* LOGO */}
          <Link to="/" className="flex items-center pointer-events-none">
            <img
              src={sfibLogo}
              alt="SFIB"
              className="h-60 w-auto pointer-events-auto relative z-10 bg-transparent mix-blend-screen"
              style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
            />
          </Link>

          {/* NAV LINKS */}
          <div className="hidden md:flex flex-1 justify-center gap-6">
            <NavLink to="/" className={mainNavLinkClass}>Accueil</NavLink>
            <NavLink to="/about" className={mainNavLinkClass}>Qui Sommes Nous</NavLink>
            <NavLink to="/services" className={mainNavLinkClass}>Services</NavLink>
            <NavLink to="/products" className={mainNavLinkClass}>Produits</NavLink>
            <NavLink to="/references" className={mainNavLinkClass}>Références</NavLink>
            <NavLink to="/contact" className={mainNavLinkClass}>Contact</NavLink>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* SEARCH */}
            <form onSubmit={submitSearch} className="hidden md:flex">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Recherche"
                  className="w-40 bg-transparent text-sm text-white outline-none"
                />
              </div>
            </form>

            {/* CART */}
            <button onClick={onOpenCart} className="relative p-2 text-white">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-red-500 rounded-full px-1">
                  {itemCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
              <Menu />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}