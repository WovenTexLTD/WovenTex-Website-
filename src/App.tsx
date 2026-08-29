import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import QuoteButton from './QuoteButton';
import CookieConsent from './components/CookieConsent';
import { HeroProvider } from './brand/HeroProvider';
import PrivacyPolicy from './PrivacyPolicy';
import NotFound from './NotFound';
import Home from './Home';
import About from './About';
import ProductionPortal from './ProductionPortal';
import Capabilities from './Capabilities';
import Certifications from './Certifications';
import Clients from './Clients';
import Sustainability from './Sustainability';
import Contact from './Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <HeroProvider>
        {/* dvh, not vh, 100vh sits under mobile browser chrome and jumps */}
        <div className="flex min-h-dvh flex-col bg-paper">
          <Header />

          <main id="main" className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/production-portal" element={<ProductionPortal />} />
              <Route path="/capabilities" element={<Capabilities />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <QuoteButton />
        </div>
      </HeroProvider>

      <CookieConsent />
    </Router>
  );
}
