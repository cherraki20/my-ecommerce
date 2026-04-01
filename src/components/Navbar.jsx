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
    ? "text-[#1D6FF2] border-b-2 border-[#1D6FF2] px-3 py-1 text-sm font-medium transition-colors duration-300"
    : "text-gray-300 hover:text-white px-3 py-1 text-sm font-medium transition-colors duration-300";

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
    sync();
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
    setMobileOpen(false);
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <>
      <nav className="sticky top-0 z-50">
        {/* TOP BAR */}
        <div className="bg-[#F8F9FA] border-b border-gray-200 py-2 px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left: brand logos */}
            <div className="hidden md:flex items-center gap-6">
              <img
                src="/logo-sensormatic.png"
                alt="Sensormatic"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
              <img
                src="/logo-american-dynamics.png"
                alt="American Dynamics"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
               
              <img
                src="/logo-kantech.png"
                alt="Kantech"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
              <img
                src="/logo-invue.png"
                alt="InVue"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
              <img
                src="/logo-Dahua.png"
                alt="Dahua"
                className="h-7 w-auto object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Right: social + phone */}
            <div className="flex items-center gap-4 text-sm">
              <span className="hidden sm:inline text-gray-500 font-medium">Suivez-nous</span>
              <a href="https://www.facebook.com/pages/SFIB/408614802589207" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1D6FF2] transition duration-200" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/SFIB1" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1D6FF2] transition duration-200" aria-label="Twitter">
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
        <div className="bg-[#0B1F3A] h-24 px-8 border-b border-[#1D6FF2]/30 flex items-center">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-start leading-tight">
              <img src={sfibLogo} alt="SFIB" className="h-64 md:h-84 lg:h-70" />
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex flex-1 items-center justify-center gap-6 whitespace-nowrap" aria-label="Main">
              <NavLink to="/" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`} end>
                Accueil
              </NavLink>
              <NavLink to="/about" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`}>
                Qui Sommes Nous
              </NavLink>
              <NavLink to="/services" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`}>
                Services
              </NavLink>
              <NavLink to="/products" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`}>
                Produits
              </NavLink>
              <NavLink to="/references" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`}>
                Références
              </NavLink>
              <NavLink to="/contact" className={(props) => `${mainNavLinkClass(props)} whitespace-nowrap`}>
                Contact
              </NavLink>
            </nav>

            {/* Search + Cart + User Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              <form onSubmit={submitSearch} className="hidden md:flex items-center group">
                <div className="flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 focus-within:border-[#1D6FF2] transition-colors duration-300">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Recherche"
                    className="w-40 bg-transparent text-sm text-white placeholder:text-gray-400 outline-none transition-all duration-300 focus:w-56"
                  />
                </div>
              </form>

              <button
                type="button"
                onClick={onOpenCart}
                className="relative rounded-full p-2 text-white transition duration-200 hover:bg-white/10"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="rounded-full p-2 text-white transition-colors duration-300 ease-in-out hover:bg-white/10 md:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* User Menu */}
              {auth.isLoggedIn && auth.user ? (
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full border border-white/25 bg-white/5 py-1 pl-1 pr-2 transition-all duration-200 hover:bg-white/10"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {auth.user.name?.charAt(0)?.toUpperCase() ?? "?"}
                    </span>
                    <span className="max-w-[7rem] truncate text-sm font-medium text-white">
                      {auth.user.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-white/70" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-[70] mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-primary py-2 shadow-xl">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/90 transition-colors duration-200 hover:bg-white/10"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-5 w-5 shrink-0" />
                        Mon Dashboard
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/90 transition-colors duration-200 hover:bg-white/10"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-5 w-5 shrink-0" />
                        Paramètres
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-300 transition-colors duration-200 hover:bg-red-500/20"
                      >
                        <LogOut className="h-5 w-5 shrink-0" />
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-[60] bg-primary transition-transform duration-300 ease-in-out md:hidden ${
          mobileOpen ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-full flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex flex-col items-start leading-tight">
              <img src={sfibLogo} alt="SFIB" className="h-9 w-auto" />
            </Link>
            <button
              type="button"
              className="rounded-full p-2 text-white hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          <form onSubmit={submitSearch} className="mt-8 flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Recherche"
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:bg-white focus:text-[#0B1F3A] focus:placeholder-gray-400 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-4 py-3 text-white transition-colors duration-300 ease-in-out hover:bg-accent/90"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          <nav className="mt-10 flex flex-1 flex-col gap-6 text-xl font-heading font-semibold text-white" aria-label="Mobile">
            <NavLink to="/" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)} end>
              Accueil
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)}>
              Qui Sommes Nous
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/products" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)}>
              Produits
            </NavLink>
            <NavLink to="/references" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)}>
              Références
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `transition-colors duration-300 ease-in-out ${isActive ? "text-[#1D6FF2]" : "hover:text-[#1D6FF2]"}`} onClick={() => setMobileOpen(false)}>
              Contact
            </NavLink>

            {auth.isLoggedIn && auth.user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="mt-4 inline-flex w-fit items-center gap-2 text-lg text-white transition-colors duration-300 ease-in-out hover:text-accent">
                  <LayoutDashboard className="h-5 w-5" />
                  Mon Dashboard
                </Link>
                <button type="button" onClick={() => { setMobileOpen(false); handleLogout(); }} className="mt-2 inline-flex w-fit items-center gap-2 text-lg text-red-300 transition-colors duration-300 ease-in-out hover:text-red-200">
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              </>
            ) : null}
          </nav>

          <p className="font-body text-sm text-white/60">
            La sécurité en toute confiance
          </p>
        </div>
      </div>
    </>
  );
}