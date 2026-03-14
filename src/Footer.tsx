import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white relative overflow-hidden">
      {/* Subtle top gold line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,185,5,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img
                src="/images/Untitled design (2) (1).png"
                alt="WovenTex Logo"
                className="h-10 w-auto [filter:invert(1)] [mix-blend-mode:screen]"
              />
              <span className="text-2xl font-black tracking-tight">WovenTex</span>
              <span className="text-xs font-semibold text-gray-500">LTD</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Your direct link to world-class apparel manufacturing. Connecting brands to
              certified factories with quality, speed, and complete transparency.
            </p>

            {/* CTA mini */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black text-sm font-bold
                px-5 py-2.5 rounded-sm hover:bg-yellow-400 transition-all duration-200
                hover:shadow-[0_0_20px_rgba(255,185,5,0.4)] group mb-6"
            >
              Request a Quote
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <div className="flex gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/woventex-limited/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: '#0A66C2' }}
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/woventexltd?igsh=MXFwYmllY284OXgwYw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61585467571567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: '#1877F2' }}
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-5">Company</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: 'About' },
                { to: '/capabilities', label: 'Capabilities' },
                { to: '/certifications', label: 'Certifications' },
                { to: '/sustainability', label: 'Sustainability' },
                { to: '/blog', label: 'Blog' },
                { to: '/clients', label: 'Clients' },
                { to: '/privacy-policy', label: 'Privacy Policy' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-5">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-gray-400 text-sm leading-snug">
                  167–169 Great Portland Street, 5th Floor,<br />London, W1W 5PF
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-yellow-500 shrink-0" />
                <a href="mailto:contact@woventex.co" className="text-gray-400 text-sm hover:text-white transition-colors">
                  contact@woventex.co
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-yellow-500 shrink-0" />
                <span className="text-gray-400 text-sm">+44 7933 291037</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800/60 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 WovenTex LTD. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => (window as Window & { openCookiePreferences?: () => void }).openCookiePreferences?.()}
              className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Cookie Settings
            </button>
            <p className="text-gray-600 text-xs">Made with integrity.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
