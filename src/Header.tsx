import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change (prevents menu staying open after navigation)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/production-portal', label: 'Production Portal' },
    { path: '/about', label: 'About' },
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/clients', label: 'Clients' },
    { path: '/sustainability', label: 'Sustainability' },
    { path: '/blog', label: 'WovenTex Blog' },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/images/logoblack.png"
              alt="WovenTex Logo"
              className="h-8 w-auto"
              loading="eager"
            />
            <span className="text-xl lg:text-2xl font-bold text-gray-900">WovenTex</span>
            <span className="text-sm text-gray-600 hidden sm:block">LTD</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
  location.pathname === item.path
    ? item.path === '/production-portal'
      ? 'text-[#000a68] border-b-2 border-yellow-500'
      : 'text-gray-900 border-b-2 border-yellow-500'
    : item.path === '/production-portal'
      ? 'text-[#000a68] hover:text-[#000c38]'
      : 'text-gray-700 hover:text-gray-900'
}`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/contact"
              className="bg-yellow-500 text-black px-6 py-2 rounded-sm font-medium hover:bg-yellow-400 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2"
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
              className="lg:hidden border-t border-gray-200 bg-white"
            >
              <div className="py-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
               className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
  location.pathname === item.path
    ? item.path === '/production-portal'
      ? 'text-[#000a68] bg-yellow-50'
      : 'text-gray-900 bg-yellow-50'
    : item.path === '/production-portal'
      ? 'text-[#000a68] hover:text-[#000c38] hover:bg-gray-50'
      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
}`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  to="/contact"
                  className="mx-4 bg-yellow-500 text-black px-6 py-3 rounded-sm font-medium hover:bg-yellow-400 transition-colors duration-200 text-center block"
                >
                  Let&apos;s Talk Production
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
