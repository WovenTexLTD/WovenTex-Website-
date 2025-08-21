import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Globe, Award } from 'lucide-react';

const Capabilities = () => {
  const products = [
    {
      title: 'Denim',
      image: '/iamge/jeans.png',
      description: 'Premium denim jeans, jackets, and shirting with advanced washing techniques'
    },
    {
      title: 'T-shirts & Basics',
      image: '/iamge/shirt.png',
      description: 'High-quality knit basics, graphics tees, and premium cotton essentials'
    },
    {
      title: 'Jackets & Outerwear',
      image: '/image/jacket.png',
      description: 'Tailored blazers, casual jackets, and technical outerwear for all seasons'
    },
    {
      title: 'Puffer Jackets',
      image: '/image/puffer.png',
      description: 'Insulated outerwear with down and synthetic fill options'
    },
    {
      title: 'Activewear',
      image: '/image/sport.png',
      description: 'Performance sportswear with moisture-wicking and stretch technologies'
    },
    {
      title: 'Workwear',
      image: '/image/construction.png',
      description: 'Durable industrial and corporate uniforms with safety features'
    },
    {
      title: 'Courier Apparel',
      image: '/image/bag.png',
      description: 'Professional delivery uniforms with durability, comfort, and brand visibility features'
    },
    {
      title: 'Swimwear',
      image: '/image/swim.png',
      description: 'Performance swimwear and beachwear with UV protection and quick-dry technologies'
    }
  ];

  const capabilities = [
    {
      icon: Package,
      title: 'Production Capacity',
      details: '500,000 pieces per month with scalable production lines'
    },
    {
      icon: Award,
      title: 'Quality Control',
      details: 'Advanced QC systems with inline inspection and final audits'
    },
    {
      icon: Globe,
      title: 'Fabric Sourcing',
      details: 'Global network including China, India, Pakistan, and local suppliers'
    },
    {
      icon: Truck,
      title: 'Flexible MOQs',
      details: 'Accommodating minimum orders from 2000 to 50,000+ pieces per style'
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7180657/pexels-photo-7180657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Manufacturing equipment"
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
              Manufacturing <span className="text-yellow-400">Capabilities</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Comprehensive apparel manufacturing solutions through our network of factories with world-class quality, 
              capacity, and flexibility
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Core Capabilities
            </h2>
            <p className="text-lg text-gray-600">
              Advanced manufacturing capabilities designed to meet global brand standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300"
              >
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <capability.icon className="text-gray-900" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {capability.title}
                </h3>
                <p className="text-gray-600">{capability.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Product Categories
            </h2>
            <p className="text-lg text-gray-600">
              Specialized manufacturing across diverse apparel categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="aspect-w-16 aspect-h-12 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`w-full h-48 object-cover ${product.title === 'Denim' ? 'object-[center_10%]' : product.title === 'T-shirts & Basics' ? 'object-top' : product.title === 'Workwear' ? 'object-[center_10%]' : product.title === 'Swimwear' ? 'object-[center_20%]' : 'object-top'} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Technical Excellence
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Advanced Equipment
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art machinery from leading manufacturers including 
                    JUKI, Brother, and automated cutting systems for precision and efficiency.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Quality Systems
                  </h3>
                  <p className="text-gray-600">
                    ISO 9001 certified quality management with 4-point inspection system, 
                    fabric testing laboratory, and final audit protocols.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Lead Times
                  </h3>
                  <p className="text-gray-600">
                    Competitive production schedules: 45-60 days for woven garments, 
                    30-45 days for knits, with rush orders accommodation available.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/London%20headquarters%20with%20experienced%20leadership%20providing%20local%20support,%20clear%20communication,%20and%20uncompromising%20professionalism%20(1)%20copy%20copy%20copy%20copy%20copy%20copy.png"
                alt="London headquarters with experienced leadership"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Capabilities;
