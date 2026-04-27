import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WishlistDrawer from "./components/WishlistDrawer.jsx";
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
import Dashboard from "./pages/Dashboard.jsx";
import SplashScreen from "./components/SplashScreen.jsx";

function AppShell({ wishlistOpen, setWishlistOpen }) {
  const location = useLocation();
  const path = location.pathname;
  const hideStoreChrome =
    path === "/login" ||
    path.startsWith("/dashboard");

  return (
    <div className="flex min-h-screen flex-col">
      {!hideStoreChrome && (
        <Navbar onOpenWishlist={() => setWishlistOpen(true)} />
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
        <WishlistDrawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <AppShell wishlistOpen={wishlistOpen} setWishlistOpen={setWishlistOpen} />
    </>
  );
}
