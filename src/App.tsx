import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <Router>
      {/* scroll to top on every route change */}
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
    </Router>
  );
}

export default App;
