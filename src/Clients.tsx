import React from 'react';
import { motion } from 'framer-motion';

const Clients = () => {
  // quick fade/slide helpers
  const fadeUp = (i = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: i * 0.1 },
  });

  const stats = [
    { label: 'Years experience', value: '25+' },
    { label: 'Monthly capacity', value: '500,000+' },
    { label: 'Certifications', value: '15+' },
    { label: 'Global clients', value: '50+' },
  ];

  // Logos are served from /public/images
  const majorClients = [
    {
      name: 'Hugo Boss',
      partnership: 'Luxury menswear',
      logo: '/images/bosslogo.png',
      logoAlt: 'Hugo Boss logo',
    },
    {
      name: 'Pull & Bear',
      partnership: 'Young fashion brand',
      logo: '/images/pull%26bearlogo.png', // URL-encoded '&'
      logoAlt: 'Pull & Bear logo',
    },
    {
      name: 'Polo Ralph Lauren',
      partnership: 'Classic American style',
      logo: '/images/polologo.png',
      logoAlt: 'Polo Ralph Lauren logo',
    },
    {
      name: 'LIDL',
      partnership: 'European retailer',
      logo: '/images/lidllogo.png',
      logoAlt: 'LIDL logo',
    },
    {
      name: 'C&A',
      partnership: 'European fashion',
      logo: '/images/c%26alogo.png', // URL-encoded '&'
      logoAlt: 'C&A logo',
    },
    {
      name: 'DKNY',
      partnership: 'Contemporary fashion',
      logo: '/images/dnkylogo.png', // matches your filename
      logoAlt: 'DKNY logo',
    },
    {
      name: 'Giant Tiger',
      partnership: 'North American retailer',
      logo: '/images/gianttiger.png',
      logoAlt: 'Giant Tiger logo',
    },
    {
      name: 'Inditex',
      partnership: 'Global fashion group',
      logo: '/images/inditexlogo.png',
      logoAlt: 'Inditex logo',
    },
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero / Intro */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Trusted by Global Brands
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto"
            >
              Our factory partners manufacture for some of the world’s most recognized fashion brands,
              delivering quality and reliability at scale.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(i)}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-600 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Major Clients
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our network of factories serve leading brands with longstanding relationships across
              fashion and retail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {majorClients.map((c, i) => (
              <motion.div
                key={c.name}
                {...fadeUp(i)}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 text-center"
              >
                <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={c.logo}
                    alt={c.logoAlt}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{c.name}</h3>
                <p className="text-gray-600 mt-2">{c.partnership}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            Want to partner with us?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Tap into the quality, reliability, and service that have made us the preferred
            manufacturing partner for global fashion brands.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <a
              href="/contact"
              className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              Start a Partnership
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
