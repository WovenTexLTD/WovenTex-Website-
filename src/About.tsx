import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Handshake } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Expert Leadership',
      description:
        'Our team brings decades of experience in global apparel manufacturing and quality control.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description:
        'Direct factory access with worldwide shipping capabilities and local market knowledge.',
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description:
        'Advanced QC systems and certifications ensure every piece meets international standards.',
    },
    {
      icon: Handshake,
      title: 'Trusted Partnerships',
      description:
        'Building long-term relationships with brands through transparency and reliability.',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Use images from /public directly with a leading slash (no /public in the path) */}
          <img
            src="/images/factory.png"
            alt="Professional garment manufacturing backdrop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            About <span className="text-yellow-400">WovenTex</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            UK-based apparel sourcing agency with direct access to one of Bangladesh&apos;s largest
            certified garment manufacturers.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <p className="text-gray-600">
              WovenTex LTD was founded to bridge the gap between international fashion brands and
              world-class manufacturing facilities. As a UK-based agency, we coordinate production
              through our network of factories, ensuring reliable capacity, certified processes, and
              transparent communication.
            </p>
            <p className="text-gray-600">
              Our leadership team’s direct access to production, combined with extensive industry
              experience, enables us to deliver exceptional quality, competitive pricing, and
              reliable delivery schedules for brands worldwide.
            </p>
            <p className="text-gray-600">
              From our London headquarters, we coordinate with global clients while maintaining
              hands-on oversight of production processes, ensuring every garment meets the highest
              international standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose WovenTex
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              What sets WovenTex apart isn’t just what we offer—it’s how we deliver it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
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
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Our Network of Factories</h2>
              <p className="text-gray-600">
                Our connected facilities provide large-scale capacity with rigorous compliance and
                quality control. We align factory strengths to each program to ensure efficiency,
                consistency, and on-time delivery.
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

            {/* Image Grid — uses files that exist: hands.jpg, guys.jpg, jacket.png, construction.png */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/machine.jpg"
                alt="Skilled hands during stitching process"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/images/guys.jpg"
                alt="Production team at work"
                className="w-full h-48 object-cover rounded-lg shadow-md mt-8"
              />
              <img
                src="/images/man.jpg"
                alt="Outerwear sample on production floor"
                className="w-full h-48 object-cover rounded-lg shadow-md -mt-8"
              />
              <img
                src="/images/cutting.jpg"
                alt="Industrial manufacturing environment"
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
