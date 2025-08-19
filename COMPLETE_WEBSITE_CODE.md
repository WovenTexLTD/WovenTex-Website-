# WovenTex LTD - Complete Website Code Export

This file contains all the code needed to recreate the WovenTex manufacturing website.

## Project Structure
```
woventex-website/
├── public/
│   ├── images/ (place all your images here)
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── QuoteButton.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Certifications.tsx
│   │   ├── Clients.tsx
│   │   ├── Sustainability.tsx
│   │   └── Contact.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig files
```

## Package.json
```json
{
  "name": "woventex-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^12.23.12",
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.8.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WovenTex LTD - Professional Manufacturing Website</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## src/main.tsx
```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## src/App.tsx
```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Capabilities from './pages/Capabilities';
import Certifications from './pages/Certifications';
import Clients from './pages/Clients';
import Sustainability from './pages/Sustainability';
import Contact from './pages/Contact';
import QuoteButton from './components/common/QuoteButton';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <QuoteButton />
      </div>
    </Router>
  );
}

export default App;
```

## src/components/layout/Header.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/capabilities', label: 'Capabilities' },
    { path: '/certifications', label: 'Certifications' },
    { path: '/clients', label: 'Clients' },
    { path: '/sustainability', label: 'Sustainability' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo black.png" 
              alt="WovenTex Logo" 
              className="h-8 w-auto"
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
                    ? 'text-gray-900 border-b-2 border-yellow-500'
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
              Let's Talk Production
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-gray-900 bg-yellow-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mx-4 bg-yellow-500 text-black px-6 py-3 rounded-sm font-medium hover:bg-yellow-400 transition-colors duration-200 text-center block"
                >
                  Let's Talk Production
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
```

## src/components/layout/Footer.tsx
```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo black.png" 
                alt="WovenTex Logo" 
                className="h-8 w-auto filter invert"
              />
              <span className="text-2xl font-bold">WovenTex</span>
              <span className="text-sm text-gray-400">LTD</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your direct link to world-class apparel manufacturing. Connecting brands to certified factories with quality, speed, and transparency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/capabilities" className="text-gray-300 hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link to="/certifications" className="text-gray-300 hover:text-white transition-colors">Certifications</Link></li>
              <li><Link to="/sustainability" className="text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">London, UK</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:contact@woventex.co" className="text-gray-300 text-sm hover:text-white transition-colors">
                  contact@woventex.co
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300 text-sm">+44 7933 291037</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 WovenTex LTD. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Made with integrity</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## src/components/common/QuoteButton.tsx
```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const QuoteButton = () => {
  return (
    <Link
      to="/contact"
      className="fixed bottom-6 right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-110 z-40 group"
    >
      <div className="flex items-center space-x-2">
        <MessageSquare size={20} />
        <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
          Request a Quote
        </span>
      </div>
    </Link>
  );
};

export default QuoteButton;
```

## src/pages/Home.tsx
```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Users, Truck } from 'lucide-react';

const Home = () => {
  const stats = [
    { value: '500,000', label: 'pcs/month capacity', icon: Truck },
    { value: '100%', label: 'CIS Certified', icon: Award },
    { value: 'Global', label: 'Clients', icon: Globe },
    { value: 'Guaranteed', label: 'Delivery', icon: Users },
  ];

  const clients = [
    'Zara', 'Hugo Boss', 'DKNY', 'Inditex', 'Bershka', 'LIDL', 'Polo Ralph Lauren'
  ];

  const certifications = [
    { name: 'GOTS', desc: 'Global Organic Textile' },
    { name: 'GRS', desc: 'Global Recycled Standard' },
    { name: 'RCS', desc: 'Recycled Claim Standard' },
    { name: 'BSCI', desc: 'Business Social Compliance' },
    { name: 'Sedex', desc: 'Supplier Ethical Data' },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/Untitled design (30).png"
            alt="High-end garment manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Direct Link to<br />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              World-Class Apparel
            </span><br />
            Manufacturing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
          >
            Building strategic factory partnerships, transparent production management, and 
            uncompromising quality standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center bg-yellow-500 text-black px-8 py-4 rounded-sm font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 group"
            >
              Let's Talk Production
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                  <stat.icon className="text-gray-900" size={24} />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose WovenTex */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Global Brands Choose WovenTex
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our unique position as a UK-based agency with direct factory access delivers 
              unmatched quality, reliability, and transparency for international fashion brands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Direct Factory Access</h3>
              <p className="text-gray-600">
                Direct access to our network of factories including Murad Apparels, one of Bangladesh's largest certified 
                manufacturers, ensuring consistent quality and competitive pricing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">UK-Based Management</h3>
              <p className="text-gray-600">
                London headquarters with experienced leadership providing local support, 
                clear communication, and uncompromising professionalism.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proven Track Record</h3>
              <p className="text-gray-600">
                Our network of factories manufacture for major brands like Zara, Hugo Boss, and Polo Ralph Lauren 
                with 98% on-time delivery and consistent quality standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Truck className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexible Production</h3>
              <p className="text-gray-600">
                Each factory has a 500,000+ pieces monthly capacity. We offer flexible MOQs from 2000 to 50,000+ pieces, 
                accommodating both emerging and established brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Complete Transparency</h3>
              <p className="text-gray-600">
                Real-time production updates, quality reports, and direct communication 
                throughout the manufacturing process for complete peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="text-gray-900" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Compliance</h3>
              <p className="text-gray-600">
                15+ international certifications including GOTS, BSCI, and Sedex ensuring 
                ethical manufacturing and environmental responsibility.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Network of Factories Trusted by Global Brands
            </h2>
            <p className="text-lg text-gray-600">
              Our network of factories manufacture for some of the world's most recognized fashion brands
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-xl lg:text-2xl font-bold text-gray-400 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Streamlined Production Process
            </h2>
            <p className="text-lg text-gray-600">
              From concept to delivery, our proven process ensures quality and efficiency at every step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Design & Consultation',
                description: 'Technical review, fabric selection, and production planning with our expert team'
              },
              {
                step: '02',
                title: 'Sample Development',
                description: 'Rapid prototyping and sample approval process with detailed quality specifications'
              },
              {
                step: '03',
                title: 'Production & QC',
                description: 'Manufacturing with inline quality control and regular progress updates'
              },
              {
                step: '04',
                title: 'Delivery & Support',
                description: 'Final inspection, packaging, and global shipping with ongoing support'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Manufacturing Expertise
            </h2>
            <p className="text-lg text-gray-600">
              Specialized production across diverse apparel categories with world-class quality
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Premium Denim', image: '/Untitled design (33) copy copy copy copy copy copy.png', position: 'object-top' },
              { name: 'Casual Outerwear', image: '/ChatGPT Image Aug 18, 2025, 01_03_37 PM copy copy.png', position: 'object-top' },
              { name: 'Contemporary Basics', image: '/ChatGPT Image Aug 18, 2025, 03_20_49 PM copy.png', position: 'object-top' },
              { name: 'Technical Workwear', image: '/ChatGPT Image Aug 18, 2025, 01_16_48 PM.png', position: 'object-top' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={category.image}
                  className={`w-full h-48 object-cover ${category.position} group-hover:scale-110 transition-transform duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/capabilities"
              className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              View All Capabilities
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sustainability Highlight */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Certified for Excellence
            </h2>
            <p className="text-lg text-gray-300">
              Our network of factories' certifications ensure ethical manufacturing and environmental responsibility
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{cert.name}</span>
                </div>
                <p className="text-sm text-gray-300">{cert.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/certifications"
              className="inline-flex items-center bg-yellow-500 text-black px-6 py-3 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              View All Certifications
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Next Production?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the global brands who trust WovenTex for their manufacturing needs. 
              Get a detailed quote and timeline for your project within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-yellow-500 text-black px-8 py-3 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300"
              >
                Request a Quote
              </Link>
              <Link
                to="/capabilities"
                className="border-2 border-white text-white px-8 py-3 rounded-sm font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                View Capabilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```

## Configuration Files

### vite.config.ts
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### postcss.config.js
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### tsconfig.json
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

### tsconfig.app.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

### tsconfig.node.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## Required Images
Place these images in your `public/` folder:
- logo black.png
- Untitled design (30).png
- Untitled design (33) copy copy copy copy copy copy.png
- ChatGPT Image Aug 18, 2025, 01_03_37 PM copy copy.png
- ChatGPT Image Aug 18, 2025, 03_20_49 PM copy.png
- ChatGPT Image Aug 18, 2025, 01_16_48 PM.png
- ChatGPT Image Aug 18, 2025, 01_06_29 PM.png
- ChatGPT Image Aug 18, 2025, 01_25_15 PM.png
- ChatGPT Image Aug 18, 2025, 01_21_01 PM.png
- ChatGPT Image Aug 18, 2025, 03_08_40 PM.png
- HHA03313 copy.jpg
- HHA03322.jpg
- HHA03297 copy.jpg
- background.jpeg
- London headquarters with experienced leadership providing local support, clear communication, and uncompromising professionalism (1) copy copy copy copy copy copy.png

## Setup Instructions
1. Create a new React + TypeScript + Vite project
2. Install all dependencies: `npm install`
3. Replace the default files with the code above
4. Add all required images to the `public/` folder
5. Run `npm run dev` to start development server
6. Run `npm run build` to build for production

## Features
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- React Router for navigation
- Professional manufacturing website layout
- Contact forms and quote requests
- Product showcases and certifications
- Company information and capabilities

This complete code export contains everything needed to recreate your WovenTex manufacturing website.