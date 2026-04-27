import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import sfibLogo from "../assets/sfib-logo.png";

const linkClass =
  "text-sm text-white/80 transition-colors duration-300 ease-in-out hover:text-accent";

export default function Footer() {
  return (
    <footer className="relative text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="images/bg-f.png"
          alt="SFIB Office"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0B1F3A]/90" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">

            {/* LOGO + DESCRIPTION */}
            <div>
              <Link to="/" className="flex flex-col items-start leading-tight">
              <img 
              src={sfibLogo} 
              alt="SFIB" 
              className="h-40 md:h-44 w-auto object-contain" 
              />
              </Link>

              <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-white/75">
                SFIB Security delivers enterprise surveillance, intrusion, and access
                solutions trusted by professionals worldwide.
              </p>

              {/* SOCIAL */}
              <div className="mt-5 flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 p-2 text-white transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 p-2 text-white transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 p-2 text-white transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* PRODUCTS */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                Products
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/products?category=surveillance" className={linkClass}>
                    Cameras
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=alarm" className={linkClass}>
                    Alarm Systems
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=detectors" className={linkClass}>
                    Detectors
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=access" className={linkClass}>
                    Access Control
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/contact" className={linkClass}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={linkClass}>
                    About
                  </Link>
                </li>
                <li>
                  <a href="#careers" className={linkClass}>
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href="#faq" className={linkClass}>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#warranty" className={linkClass}>
                    Warranty
                  </a>
                </li>
                <li>
                  <a href="#shipping" className={linkClass}>
                    Shipping
                  </a>
                </li>
              </ul>
            </div>

            {/* NOS SOLUTIONS */}
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
                Nos Solutions
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link to="/products?category=eas-sensormatic" className={linkClass}>
                    Protection Antivol
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=video-surveillance" className={linkClass}>
                    Vidéo Surveillance
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=anti-intrusion" className={linkClass}>
                    Anti-Intrusion
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=controle-d-acces" className={linkClass}>
                    Contrôle d&apos;Accès
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=detection-incendie" className={linkClass}>
                    Détection Incendie
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center font-body text-sm text-white/60">
              © 2026 SFIB Security. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
