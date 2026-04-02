import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BarChart2,
  Bell,
  Camera,
  ChevronDown,
  Flame,
  Grid,
  LayoutDashboard,
  Lock,
  LogOut,
  Menu,
  Package,
  Pencil,
  Plus,
  ScanLine,
  Settings,
  ShieldAlert,
  ShieldX,
  Speaker,
  Tag,
  Trash2,
  Unlock,
  Users,
  X,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import logo from "../assets/logo.svg";
import { categories as categoriesSource } from "../data/categories.js";
import { brands as brandsSource } from "../data/brands.js";
import { clients as clientsSource } from "../data/clients.js";
import { clearAuthState, getAuthState } from "../utils/authStorage.js";

const icons = {
  ShieldAlert,
  Camera,
  ShieldX,
  Flame,
  Lock,
  Speaker,
  Users,
  Tag,
  Unlock,
  ScanLine,
};

const CHART_BLUE = "#1D6FF2";
const CHART_BLUE_ACTIVE = "#1557c4";
const PIE_COLORS = [
  "#1D6FF2",
  "#1557c4",
  "#0e4a9e",
  "#3d8ff7",
  "#0B1F3A",
  "#5a9ef9",
  "#2563eb",
];

const productsPerCategory = [
  { name: "EAS", value: 19 },
  { name: "Vidéo", value: 20 },
  { name: "Intrusion", value: 20 },
  { name: "Incendie", value: 24 },
  { name: "Accès", value: 1 },
  { name: "Sono", value: 16 },
  { name: "Compteur", value: 8 },
  { name: "Tags", value: 8 },
  { name: "Détach.", value: 5 },
  { name: "Portiques", value: 3 },
];

const brandPieData = [
  { name: "Sensormatic", value: 28 },
  { name: "American Dynamics", value: 18 },
  { name: "Kantech", value: 12 },
  { name: "DSC", value: 15 },
  { name: "Aguilera", value: 10 },
  { name: "Aguilera", value: 8 },
  { name: "InVue", value: 9 },
];

const viewsLineData = [
  { m: "Jan", v: 1200 },
  { m: "Fév", v: 1450 },
  { m: "Mar", v: 1380 },
  { m: "Avr", v: 1620 },
  { m: "Mai", v: 1740 },
  { m: "Jun", v: 1890 },
  { m: "Jul", v: 2010 },
  { m: "Aoû", v: 1960 },
  { m: "Sep", v: 2120 },
  { m: "Oct", v: 2240 },
  { m: "Nov", v: 2310 },
  { m: "Déc", v: 2480 },
];

const sectorBarData = [
  { name: "Grande Distribution", value: 12 },
  { name: "Luxe", value: 8 },
  { name: "Sport", value: 6 },
  { name: "Restauration", value: 5 },
  { name: "Mode", value: 7 },
];

const RECENT = [
  { text: "Produit ajouté: Caméra IP Dome 4MP", time: "il y a 2h" },
  { text: "Catégorie mise à jour: EAS / Systèmes Antivols", time: "il y a 5h" },
  { text: "Stock ajusté: Centrale DSC Neo — +4 unités", time: "il y a 1j" },
  { text: "Nouveau client référencé: Fnac", time: "il y a 1j" },
  { text: "Export statistiques — Q4", time: "il y a 2j" },
];

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    image:
      "images/q6.png",
    name: "Caméra IP Dome 4MP",
    category: "Vidéo Surveillance",
    brand: "American Dynamics",
    price: 2499,
    stock: 12,
  },
  {
    id: "p2",
    image:
      "images/q6.png",
    name: "Antenne EAS RF Pro",
    category: "EAS / Systèmes Antivols",
    brand: "Sensormatic",
    price: 8990,
    stock: 4,
  },
  {
    id: "p3",
    image:
      "images/q6.png",
    name: "Centrale intrusion PowerSeries",
    category: "Anti-Intrusion",
    brand: "DSC",
    price: 3290,
    stock: 18,
  },
  {
    id: "p4",
    image:
      "images/q6.png",
    name: "Détecteur optique fumée",
    category: "Détection Incendie",
    brand: "Aguilera",
    price: 420,
    stock: 64,
  },
  {
    id: "p5",
    image:
      "images/q6.png",
    name: "Portique antivol mono",
    category: "Portiques",
    brand: "Sensormatic",
    price: 14500,
    stock: 2,
  },
  {
    id: "p6",
    image:
      "images/q6.png",
    name: "Amplificateur mural 120W",
    category: "Sonorisation",
    brand: "Aguilera",
    price: 2180,
    stock: 9,
  },
  {
    id: "p7",
    image:
      "images/q6.png",
    name: "Compteur people counting 3D",
    category: "Compteur de Passage",
    brand: "Sensormatic",
    price: 5600,
    stock: 5,
  },
  {
    id: "p8",
    image:
      "images/q6.png",
    name: "Pack contrôle d'accès 2 portes",
    category: "Contrôle d'Accès",
    brand: "Kantech",
    price: 8999,
    stock: 3,
  },
  {
    id: "p9",
    image:
      "images/q6.png",
    name: "Support merchandising série One",
    category: "EAS / Systèmes Antivols",
    brand: "InVue",
    price: 780,
    stock: 22,
  },
  {
    id: "p10",
    image:
      "images/q6.png",
    name: "Détacheur super magnétique",
    category: "Détacheurs & Désactiveurs",
    brand: "Sensormatic",
    price: 290,
    stock: 40,
  },
  {
    id: "p11",
    image:
      "images/q6.png",
    name: "Étiquettes RF 40×40",
    category: "Tags & Étiquettes",
    brand: "Sensormatic",
    price: 0.45,
    stock: 8500,
  },
  {
    id: "p12",
    image:
      "images/q6.png",
    name: "Bullet IP 8MP Starlight",
    category: "Vidéo Surveillance",
    brand: "American Dynamics",
    price: 3120,
    stock: 7,
  },
];

const SECTION_META = {
  dashboard: { title: "Tableau de bord", label: "Dashboard" },
  products: { title: "Produits", label: "Produits" },
  categories: { title: "Catégories", label: "Catégories" },
  clients: { title: "Clients", label: "Clients" },
  stats: { title: "Statistiques", label: "Statistiques" },
  settings: { title: "Paramètres", label: "Paramètres" },
};

function nextId() {
  return `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => getAuthState().user);
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topUserOpen, setTopUserOpen] = useState(false);
  const topUserRef = useRef(null);

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [productPage, setProductPage] = useState(0);
  const [productSearch, setProductSearch] = useState("");
  const [productCatFilter, setProductCatFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    image: "",
  });

  const [categoryRows, setCategoryRows] = useState(() =>
    categoriesSource.map((c) => ({ ...c }))
  );
  const [editingCatId, setEditingCatId] = useState(null);

  const categoryNameOptions = useMemo(
    () => categoriesSource.map((c) => c.name),
    []
  );

  const brandNameOptions = useMemo(
    () => brandsSource.map((b) => b.name),
    []
  );

  useEffect(() => {
    setUser(getAuthState().user);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (topUserRef.current && !topUserRef.current.contains(e.target)) {
        setTopUserOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    return products.filter((p) => {
      if (productCatFilter && p.category !== productCatFilter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    });
  }, [products, productSearch, productCatFilter]);

  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const paginatedProducts = useMemo(() => {
    const start = productPage * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, productPage]);

  useEffect(() => {
    setProductPage(0);
  }, [productSearch, productCatFilter]);

  useEffect(() => {
    if (productPage >= pageCount) setProductPage(Math.max(0, pageCount - 1));
  }, [productPage, pageCount]);

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      category: categoryNameOptions[0] ?? "",
      brand: brandNameOptions[0] ?? "",
      price: "",
      stock: "",
      image: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      description: p.description ?? "",
      category: p.category,
      brand: p.brand,
      price: String(p.price),
      stock: String(p.stock),
      image: p.image,
    });
    setModalOpen(true);
  };

  const saveProduct = () => {
    const price = parseFloat(String(productForm.price).replace(",", "."));
    const stock = parseInt(productForm.stock, 10);
    if (!productForm.name.trim() || Number.isNaN(price) || Number.isNaN(stock)) {
      return;
    }
    if (editingProduct) {
      setProducts((list) =>
        list.map((x) =>
          x.id === editingProduct.id
            ? {
                ...x,
                name: productForm.name.trim(),
                description: productForm.description.trim(),
                category: productForm.category,
                brand: productForm.brand,
                price,
                stock,
                image: productForm.image.trim() || x.image,
              }
            : x
        )
      );
    } else {
      setProducts((list) => [
        ...list,
        {
          id: nextId(),
          name: productForm.name.trim(),
          description: productForm.description.trim(),
          category: productForm.category,
          brand: productForm.brand,
          price,
          stock,
          image:
            productForm.image.trim() ||
            "images/q6.png",
        },
      ]);
    }
    setModalOpen(false);
  };

  const deleteProduct = (id) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Supprimer ce produit ?")
    ) {
      setProducts((list) => list.filter((p) => p.id !== id));
    }
  };

  const logout = useCallback(() => {
    clearAuthState();
    navigate("/login", { replace: true });
  }, [navigate]);

  const NavButton = ({ id, icon: Icon, label }) => (
    <button
      type="button"
      onClick={() => {
        setSection(id);
        setSidebarOpen(false);
      }}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
        section === id
          ? "bg-accent text-white"
          : "text-white/85 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-surface font-body">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!sidebarOpen}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[250px] flex-col bg-primary text-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between gap-1 border-b border-white/10 px-4 py-4">
          <img src={logo} alt="SFIB" className="h-8 w-auto" />
          <button
            type="button"
            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Fermer le menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <NavButton id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavButton id="products" icon={Package} label="Produits" />
          <NavButton id="categories" icon={Grid} label="Catégories" />
          <NavButton id="clients" icon={Users} label="Clients" />
          <NavButton id="stats" icon={BarChart2} label="Statistiques" />
          <NavButton id="settings" icon={Settings} label="Paramètres" />
          <button
            type="button"
            onClick={logout}
            className="mt-auto flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/85 transition-colors duration-200 hover:bg-red-500/20 hover:text-red-200"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Déconnexion
          </button>
        </nav>

        {user && (
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {user.name?.charAt(0)?.toUpperCase() ?? "?"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <span className="mt-0.5 inline-block rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/90">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-ink/5 bg-white px-4 py-3 shadow-sm sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-ink/10 p-2 text-ink hover:bg-surface lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-lg font-bold text-ink sm:text-xl">
              {SECTION_META[section]?.title ?? "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-ink/60 transition-colors duration-200 hover:bg-surface hover:text-ink"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative" ref={topUserRef}>
              <button
                type="button"
                onClick={() => setTopUserOpen((o) => !o)}
                className="flex items-center gap-2 rounded-lg border border-ink/10 px-2 py-1.5 transition-colors duration-200 hover:bg-surface"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
                <span className="hidden max-w-[120px] truncate text-sm font-medium text-ink sm:inline">
                  {user?.name}
                </span>
                <ChevronDown className="h-4 w-4 text-ink/50" />
              </button>
              {topUserOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-ink/10 bg-white py-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setTopUserOpen(false);
                      setSection("dashboard");
                    }}
                    className="flex w-full px-4 py-2 text-left text-sm text-ink hover:bg-surface"
                  >
                    Mon Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTopUserOpen(false);
                      setSection("settings");
                    }}
                    className="flex w-full px-4 py-2 text-left text-sm text-ink hover:bg-surface"
                  >
                    Paramètres
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTopUserOpen(false);
                      logout();
                    }}
                    className="flex w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {section === "dashboard" && (
            <div className="space-y-8">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    label: "Total Produits",
                    value: 103,
                    icon: Package,
                    tone: "text-accent",
                    bg: "bg-accent/10",
                    trend: "+3.1%",
                  },
                  {
                    label: "Catégories",
                    value: 10,
                    icon: Grid,
                    tone: "text-emerald-600",
                    bg: "bg-emerald-100",
                    trend: "",
                  },
                  {
                    label: "Clients référencés",
                    value: 38,
                    icon: Users,
                    tone: "text-amber-600",
                    bg: "bg-amber-100",
                    trend: "+1",
                  },
                  {
                    label: "Marques partenaires",
                    value: 7,
                    icon: Award,
                    tone: "text-indigo-700",
                    bg: "bg-indigo-100",
                    trend: "",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="flex rounded-xl border border-ink/5 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.tone}`}
                    >
                      <card.icon className="h-5 w-5" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
                        {card.label}
                      </p>
                      <p className="mt-1 font-heading text-2xl font-bold text-ink">
                        {card.value}
                      </p>
                      {card.trend && (
                        <p className="mt-1 text-xs font-medium text-emerald-600">
                          {card.trend}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 lg:grid-cols-5">
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm lg:col-span-2">
                  <h2 className="font-heading text-base font-bold text-ink">
                    Activité récente
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {RECENT.map((row, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-3 border-b border-ink/5 pb-3 text-sm last:border-0 last:pb-0"
                      >
                        <span className="text-ink/80">{row.text}</span>
                        <span className="shrink-0 text-xs text-ink/45">
                          {row.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm lg:col-span-3">
                  <h2 className="font-heading text-base font-bold text-ink">
                    Produits par catégorie
                  </h2>
                  <div className="mt-4 h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productsPerCategory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" width={32} />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill={CHART_BLUE}
                          radius={[6, 6, 0, 0]}
                          activeBar={{ fill: CHART_BLUE_ACTIVE }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "products" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="search"
                    placeholder="Rechercher un produit..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:max-w-xs"
                  />
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className="w-full rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 sm:max-w-xs"
                  >
                    <option value="">Toutes les catégories</option>
                    {categoryNameOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-accent/90 hover:shadow-md"
                >
                  <Plus className="h-5 w-5" />
                  Ajouter un produit
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-ink/10 bg-surface/80 text-xs font-semibold uppercase tracking-wide text-ink/55">
                      <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Nom</th>
                        <th className="px-4 py-3">Catégorie</th>
                        <th className="px-4 py-3">Marque</th>
                        <th className="px-4 py-3">Prix</th>
                        <th className="px-4 py-3">Stock</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.map((p) => (
                        <tr
                          key={p.id}
                          className="border-b border-ink/5 transition-colors duration-200 hover:bg-surface/50"
                        >
                          <td className="px-4 py-2">
                            <img
                              src={p.image}
                              alt=""
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 font-medium text-ink">
                            {p.name}
                          </td>
                          <td className="px-4 py-2 text-ink/75">{p.category}</td>
                          <td className="px-4 py-2 text-ink/75">{p.brand}</td>
                          <td className="px-4 py-2 font-medium text-ink">
                            {p.price.toLocaleString("fr-MA")} MAD
                          </td>
                          <td className="px-4 py-2">{p.stock}</td>
                          <td className="px-4 py-2 text-right">
                            <button
                              type="button"
                              onClick={() => openEditModal(p)}
                              className="mr-2 inline-flex rounded-lg p-2 text-ink/60 transition-colors duration-200 hover:bg-accent/10 hover:text-accent"
                              aria-label="Modifier"
                            >
                              <Pencil className="h-5 w-5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(p.id)}
                              className="inline-flex rounded-lg p-2 text-red-500 transition-colors duration-200 hover:bg-red-50"
                              aria-label="Supprimer"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/5 px-4 py-3 text-sm text-ink/60">
                  <span>
                    Page {productPage + 1} / {pageCount} — {filteredProducts.length}{" "}
                    produit(s)
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={productPage <= 0}
                      onClick={() => setProductPage((p) => Math.max(0, p - 1))}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 font-medium transition-colors duration-200 enabled:hover:bg-surface disabled:opacity-40"
                    >
                      Précédent
                    </button>
                    <button
                      type="button"
                      disabled={productPage >= pageCount - 1}
                      onClick={() =>
                        setProductPage((p) => Math.min(pageCount - 1, p + 1))
                      }
                      className="rounded-lg border border-ink/10 px-3 py-1.5 font-medium transition-colors duration-200 enabled:hover:bg-surface disabled:opacity-40"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "categories" && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categoryRows.map((cat) => {
                const Icon = icons[cat.icon] ?? ShieldAlert;
                const isEditing = editingCatId === cat.id;
                return (
                  <div
                    key={cat.id}
                    className="rounded-xl border border-ink/5 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-l-4 hover:border-l-accent hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingCatId(isEditing ? null : cat.id)
                        }
                        className="rounded-lg p-2 text-ink/50 transition-colors duration-200 hover:bg-surface hover:text-accent"
                        aria-label="Modifier"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                    </div>
                    {isEditing ? (
                      <input
                        className="mt-3 w-full rounded-lg border border-ink/10 px-3 py-2 text-sm font-heading font-bold text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                        value={cat.name}
                        autoFocus
                        onChange={(e) =>
                          setCategoryRows((rows) =>
                            rows.map((r) =>
                              r.id === cat.id ? { ...r, name: e.target.value } : r
                            )
                          )
                        }
                        onBlur={() => setEditingCatId(null)}
                      />
                    ) : (
                      <h3 className="mt-3 font-heading text-base font-bold text-ink">
                        {cat.name}
                      </h3>
                    )}
                    <span className="mt-2 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      {cat.count} produits
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-ink/60">
                      {cat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {section === "clients" && (
            <div className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="border-b border-ink/10 bg-surface/80 text-xs font-semibold uppercase tracking-wide text-ink/55">
                    <tr>
                      <th className="px-4 py-3">Logo</th>
                      <th className="px-4 py-3">Client</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientsSource.map((c) => (
                      <tr
                        key={c.id}
                        className="border-b border-ink/5 hover:bg-surface/50"
                      >
                        <td className="px-4 py-2">
                          <ClientTableLogo client={c} />
                        </td>
                        <td className="px-4 py-2 font-medium text-ink">
                          {c.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === "stats" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-heading text-lg font-bold text-ink">
                  Analytique
                </h2>
                <button
                  type="button"
                  className="rounded-xl border border-ink/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition-colors duration-200 hover:bg-surface"
                >
                  Exporter
                </button>
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-ink">
                    Produits par catégorie
                  </h3>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productsPerCategory} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" width={28} />
                        <Tooltip />
                        <Bar dataKey="value" fill={CHART_BLUE} radius={[4, 4, 0, 0]} activeBar={{ fill: CHART_BLUE_ACTIVE }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-ink">
                    Répartition par marque
                  </h3>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={brandPieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={48}
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {brandPieData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-ink">
                    Vues produits (12 mois)
                  </h3>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={viewsLineData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <XAxis dataKey="m" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" width={36} />
                        <Tooltip />
                        <Line type="monotone" dataKey="v" stroke={CHART_BLUE} strokeWidth={2} dot={{ fill: CHART_BLUE, r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-ink">
                    Clients par secteur
                  </h3>
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sectorBarData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <XAxis type="number" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                        <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10 }} stroke="#94a3b8" />
                        <Tooltip />
                        <Bar dataKey="value" fill={CHART_BLUE} radius={[0, 6, 6, 0]} activeBar={{ fill: CHART_BLUE_ACTIVE }} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section === "settings" && (
            <div className="max-w-xl rounded-xl border border-ink/5 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-ink">
                Préférences
              </h2>
              <p className="mt-2 text-sm text-ink/60">
                Paramètres du compte administrateur (interface uniquement).
              </p>
              <div className="mt-6 space-y-4">
                <label className="flex items-center justify-between gap-4 rounded-lg border border-ink/10 bg-surface/50 px-4 py-3">
                  <span className="text-sm font-medium text-ink">
                    Notifications email
                  </span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded text-accent focus:ring-accent" />
                </label>
                <label className="flex items-center justify-between gap-4 rounded-lg border border-ink/10 bg-surface/50 px-4 py-3">
                  <span className="text-sm font-medium text-ink">
                    Rapports hebdomadaires
                  </span>
                  <input type="checkbox" className="h-4 w-4 rounded text-accent focus:ring-accent" />
                </label>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product modal */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-200 ${
          modalOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!modalOpen}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Fermer"
          onClick={() => setModalOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-200 ${
            modalOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <h2 className="font-heading text-lg font-bold text-ink">
              {editingProduct ? "Modifier le produit" : "Nouveau produit"}
            </h2>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-lg p-2 text-ink/50 hover:bg-surface hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            <div>
              <label className="text-xs font-semibold text-ink/60">Nom</label>
              <input
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.name}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">
                Description
              </label>
              <textarea
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                rows={3}
                value={productForm.description}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">
                Catégorie
              </label>
              <select
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.category}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                {categoryNameOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">Marque</label>
              <select
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.brand}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, brand: e.target.value }))
                }
              >
                {brandNameOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">
                Prix (MAD)
              </label>
              <input
                type="text"
                inputMode="decimal"
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.price}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, price: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">Stock</label>
              <input
                type="number"
                min={0}
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.stock}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, stock: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ink/60">
                URL image
              </label>
              <input
                className="mt-1 w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                value={productForm.image}
                onChange={(e) =>
                  setProductForm((f) => ({ ...f, image: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-3 border-t border-ink/10 px-5 py-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 rounded-xl border border-ink/15 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={saveProduct}
              className="flex-1 rounded-xl bg-accent py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent/90"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientTableLogo({ client }) {
  const [failed, setFailed] = useState(false);
  if (failed || !client.logo) {
    return (
      <span className="flex h-10 w-24 items-center justify-center rounded-lg bg-surface text-xs font-medium text-ink/60">
        {client.name}
      </span>
    );
  }
  return (
    <img
      src={client.logo}
      alt={client.name}
      onError={() => setFailed(true)}
      className="h-10 w-auto max-w-[100px] object-contain"
    />
  );
}
