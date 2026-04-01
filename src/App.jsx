import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import References from "./pages/References.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function AppShell({ cartOpen, setCartOpen }) {
  const location = useLocation();
  const path = location.pathname;
  const hideStoreChrome =
    path === "/login" ||
    path === "/register" ||
    path.startsWith("/dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      {!hideStoreChrome && (
        <Navbar onOpenCart={() => setCartOpen(true)} />
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/references" element={<References />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!hideStoreChrome && <Footer />}
      {!hideStoreChrome && (
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return <AppShell cartOpen={cartOpen} setCartOpen={setCartOpen} />;
}
