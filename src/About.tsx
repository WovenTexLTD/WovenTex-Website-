import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Handshake } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Expert Leadership',
      description: 'Our team brings decades of experience in global apparel manufacturing and quality control.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Direct factory access with worldwide shipping capabilities and local market knowledge.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Advanced QC systems and certifications ensure every piece meets international standards.'
    },
    {
      icon: Handshake,
      title: 'Trusted Partnerships',
      description: 'Building long-term relationships with brands through transparency and reliability.'
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/factory.png"
            alt="Professional manufacturing facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
            >
              About <span className="text-yellow-400">WovenTex</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              UK-based apparel sourcing agency with direct access to one of Bangladesh's 
              largest certified garment manufacturers
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600">
              WovenTex LTD was founded to bridge the gap between international fashion brands 
              and world-class manufacturing facilities. As a UK-based agency, we coordinate production 
              through our network of factories including Murad Apparels, one of Bangladesh's largest and most certified garment factories.
            </p>
            <p className="text-gray-600">
              Our leadership team's direct access to our network of factories, combined with extensive industry 
              experience, enables us to deliver exceptional quality, competitive pricing, and 
              reliable delivery schedules for brands worldwide.
            </p>
            <p className="text-gray-600">
              From our London headquarters, we coordinate with global clients while maintaining 
              hands-on oversight of production processes, ensuring every garment meets the 
              highest international standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose WovenTex
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets WovenTex apart isn't just what we offer, it's how we deliver it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
               <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                 <value.icon className="text-yellow-700" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Our Network of Factories
              </h2>
              <p className="text-gray-600">
                Our network of factories, including our partnership with Murad Apparels, gives us direct access to 
                some of Bangladesh's most advanced manufacturing facilities. These factories with 500,000+ 
                pieces per month capacity manufacture for major international brands with 
                consistent quality and on-time delivery.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">500,000+</div>
                  <div className="text-sm text-gray-600">Monthly Capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Certifications</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Global Clients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/machine.jpg"
                alt="Factory floor"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/man.jpg"
                alt="Quality control"
                className="w-full h-48 object-cover rounded-lg shadow-md mt-8"
              />
              <img
                src="/cutting.jpg"
                alt="Workers"
                className="w-full h-48 object-cover rounded-lg shadow-md -mt-8"
              />
              <img
                src="/guys.jpg"
                alt="Production line"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
