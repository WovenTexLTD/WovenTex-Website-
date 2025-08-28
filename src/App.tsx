import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import QuoteButton from './QuoteButton';

import Home from './Home';
import About from './About';
import Capabilities from './Capabilities';
import Certifications from './Certifications';
import Clients from './Clients';
import Sustainability from './Sustainability';
import Contact from './Contact';

/* -------------------- ScrollToTop -------------------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

/* ----------------- Cookie Consent Bar ---------------- */
function CookieConsent() {
  const STORAGE_KEY = 'cookie-consent'; // 'accepted' | 'rejected'
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) setIsOpen(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setIsOpen(false);
    // 👉 If you later add analytics, check this key before loading any scripts.
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-lg bg-white/95 backdrop-blur shadow-lg ring-1 ring-black/10 p-4 md:p-5">
          <p className="text-sm md:text-base text-gray-700">
            We use only essential cookies to run this site. If you choose “Accept”, we may also
            enable performance cookies in the future to improve your experience. You can change your
            choice anytime.
          </p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              onClick={reject}
              className="w-full sm:w-auto rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Reject non-essential
            </button>
            <button
              onClick={accept}
              className="w-full sm:w-auto rounded-md bg-yellow-500 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-400"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------ App ------------------------ */
function App() {
  return (
    <Router>
      <ScrollToTop />

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

      {/* Cookie banner overlays the page bottom */}
      <CookieConsent />
    </Router>
  );
}

export default App;
