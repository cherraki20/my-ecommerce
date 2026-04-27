import { useEffect, useState } from "react";
import logo from "../assets/sfib-logo.png";

export default function SplashScreen({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fading out at 2.5s
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 2500);

    // Completely unmount after the fade animation finishes (fade is 0.5s)
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  // Generate random particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${3 + Math.random() * 2}s`,
    size: `${2 + Math.random() * 4}px`
  }));

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1e] transition-opacity duration-500 ease-in-out ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-400 animate-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/20 blur-[60px] rounded-full mix-blend-screen pointer-events-none"></div>
        
        <img 
          src={logo} 
          alt="SFIB Security" 
          className="h-20 md:h-28 object-contain mb-8 animate-fade-up relative z-10"
        />
        
        {/* Typing Tagline */}
        <div className="h-6 flex items-center">
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.2em] animate-typing inline-block border-r-2 border-cyan-400 pr-1">
            SFIB — Systèmes de Sécurité
          </p>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <div className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-400 animate-progress-fill" />
      </div>
    </div>
  );
}
