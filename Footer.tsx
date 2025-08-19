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