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