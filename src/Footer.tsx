import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Globe, ArrowRight } from 'lucide-react';

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
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-yellow-500 hover:text-black
                  flex items-center justify-center text-gray-400 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-yellow-500 hover:text-black
                  flex items-center justify-center text-gray-400 transition-all duration-200"
                aria-label="Website"
              >
                <Globe size={16} />
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
