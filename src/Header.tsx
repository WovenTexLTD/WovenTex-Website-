import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === '/';
  // Transparent mode: only on home page before scrolling
  const transparent = isHome && !isScrolled;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/clients', label: 'Clients' },
    { path: '/sustainability', label: 'Sustainability' },
    { path: '/blog', label: 'Blog' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/images/Untitled design (2) (1).png"
              alt="WovenTex Logo"
              className={`w-auto transition-all duration-300 ${
                transparent
                  ? 'h-12 [filter:invert(1)] [mix-blend-mode:screen]'
                  : 'h-8 [mix-blend-mode:multiply]'
              }`}
              loading="eager"
            />
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl lg:text-2xl font-black tracking-tight transition-colors duration-300 ${
                transparent ? 'text-white' : 'text-gray-900'
              }`}>
                WovenTex
              </span>
              <span className={`text-xs font-semibold hidden sm:block transition-colors duration-300 ${
                transparent ? 'text-white/50' : 'text-gray-400'
              }`}>
                LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    active
                      ? transparent ? 'text-white' : 'text-gray-900'
                      : transparent
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-yellow-400 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            <a
              href="https://productionportal.co"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                transparent
                  ? 'text-blue-300 hover:text-blue-200 hover:bg-white/10'
                  : 'text-[#000a68] hover:text-[#000c38] hover:bg-gray-50'
              }`}
            >
              Portal ↗
            </a>

            <Link
              to="/contact"
              className="ml-2 bg-yellow-500 text-black px-5 py-2 rounded-sm text-sm font-bold
                hover:bg-yellow-400 transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,185,5,0.4)]
                hover:scale-105"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${
              transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-t border-white/10 bg-black/60 backdrop-blur-lg"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors duration-150 ${
                      location.pathname === item.path
                        ? 'text-white bg-white/10 font-semibold'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {location.pathname === item.path && (
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2.5" />
                    )}
                    {item.label}
                  </Link>
                ))}

                <a
                  href="https://productionportal.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 mx-2 text-sm font-semibold text-blue-300 hover:bg-white/10 rounded-lg transition-colors duration-150"
                >
                  Production Portal ↗
                </a>

                <div className="px-2 pt-2">
                  <Link
                    to="/contact"
                    className="block bg-yellow-500 text-black px-6 py-3 rounded-sm font-bold text-sm
                      text-center hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
