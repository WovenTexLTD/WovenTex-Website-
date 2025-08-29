import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Clients = () => {
  const majorClients = [
    {
      name: 'Zara',
      logo: 'Z',
      description: 'Fast fashion leader',
    },
    {
      name: 'Hugo Boss',
      logo: 'HB',
      description: 'Luxury menswear',
    },
    {
      name: 'DKNY',
      logo: 'D',
      description: 'Contemporary fashion',
    },
    {
      name: 'Inditex',
      logo: 'I',
      description: 'Global fashion group',
    },
    {
      name: 'Bershka',
      logo: 'B',
      description: 'Young fashion brand',
    },
    {
      name: 'LIDL',
      logo: 'L',
      description: 'European retailer',
    },
    {
      name: 'Polo Ralph Lauren',
      logo: 'PRL',
      description: 'Classic American style',
    },
    {
      name: 'C&A',
      logo: 'C&A',
      description: 'European fashion',
    }
  ];

  const testimonials = [
    {
      quote: "WovenTex has consistently delivered exceptional quality and reliability. Their direct factory access ensures competitive pricing without compromising on standards.",
      client: "European Fashion Brand",
      position: "Head of Sourcing",
      rating: 5
    },
    {
      quote: "The transparency and communication throughout the production process is outstanding. They understand our brand requirements and deliver accordingly.",
      client: "Premium Menswear Label",
      position: "Production Manager",
      rating: 5
    },
    {
      quote: "Their sustainability certifications and ethical manufacturing practices align perfectly with our brand values. A trusted long-term partner.",
      client: "Contemporary Fashion House",
      position: "Sustainability Director",
      rating: 5
    }
  ];

  const stats = [
    { number: '50+', label: 'Global Clients' },
    { number: '15M+', label: 'Pieces Delivered' },
    { number: '98%', label: 'On-Time Delivery' },
    { number: '25+', label: 'Countries Served' }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7180661/pexels-photo-7180661.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Global fashion brands production"
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
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              Factory Partners <span className="text-yellow-400">Trusted by Global Brands</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our factory partners manufacture for some of the world's most recognized fashion brands, 
              delivering quality and reliability at scale
            </motion.p>
          </div>
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
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Clients */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Global Brands Our Network of Factories Serve
            </h2>
            <p className="text-lg text-gray-600">
              Our network of factories have long-standing relationships with industry leaders across fashion and retail
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {majorClients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-yellow-100 group-hover:to-yellow-200 transition-all duration-300">
                  <span className="font-bold text-lg text-gray-700 group-hover:text-gray-900">
                    {client.logo}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{client.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{client.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{client.category}</span>
                  <span>{client.partnership}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Client Testimonials
            </h2>
            <p className="text-lg text-gray-600">
              Hear what our partners say about working with WovenTex
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <Quote className="text-yellow-500 mr-2" size={20} />
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={16} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.client}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Join Our Network of Satisfied Clients
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the quality, reliability, and service that has made us the 
              preferred manufacturing partner for global fashion brands
            </p>
            <button className="bg-yellow-500 text-black px-8 py-3 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300">
              Start Your Partnership
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
