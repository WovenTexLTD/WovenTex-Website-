import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Droplets, Recycle, Heart, Shield } from 'lucide-react';

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: 'Organic Materials',
      description: 'GOTS certified organic cotton and natural fiber sourcing with traceability',
      impact: '60% organic content across product lines',
      color: 'green'
    },
    {
      icon: Recycle,
      title: 'Recycled Content',
      description: 'GRS and RCS certified recycled polyester and regenerated fiber programs',
      impact: '40% recycled materials integration',
      color: 'blue'
    },
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'Advanced water treatment and recycling systems reducing consumption by 50%',
      impact: '2.5M liters saved annually',
      color: 'cyan'
    },
    {
      icon: Users,
      title: 'Fair Labor',
      description: 'BSCI and Sedex verified ethical working conditions and fair wage standards',
      impact: '5,000+ workers benefited',
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Worker Welfare',
      description: 'Healthcare, education, and skill development programs for all employees',
      impact: '100% healthcare coverage',
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Chemical Safety',
      description: 'OEKO-TEX certified chemical management and worker safety protocols',
      impact: 'Zero harmful chemicals',
      color: 'purple'
    }
  ];

  const metrics = [
    { label: 'Carbon Footprint Reduction', value: '35%', trend: 'down' },
    { label: 'Renewable Energy Usage', value: '80%', trend: 'up' },
    { label: 'Waste Diversion Rate', value: '95%', trend: 'up' },
    { label: 'Water Usage Efficiency', value: '50%', trend: 'down' }
  ];

  const sdgGoals = [
    { number: 3, title: 'Good Health and Well-being', description: 'Safe working conditions and healthcare access' },
    { number: 6, title: 'Clean Water and Sanitation', description: 'Water treatment and conservation systems' },
    { number: 8, title: 'Decent Work and Economic Growth', description: 'Fair wages and skill development programs' },
    { number: 12, title: 'Responsible Consumption', description: 'Sustainable materials and circular economy practices' },
    { number: 13, title: 'Climate Action', description: 'Carbon reduction and renewable energy initiatives' },
    { number: 15, title: 'Life on Land', description: 'Organic farming support and biodiversity protection' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-gray-100 text-gray-600',
      blue: 'bg-gray-100 text-gray-600',
      cyan: 'bg-gray-100 text-gray-600',
      orange: 'bg-gray-100 text-gray-600',
      pink: 'bg-gray-100 text-gray-600',
      purple: 'bg-gray-100 text-gray-600'
    };
    return colors[color as keyof typeof colors] || colors.green;
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 to-green-700 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7180715/pexels-photo-7180715.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Sustainable manufacturing practices"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-700/80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-green-300">Sustainability</span> & Ethics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-green-100 max-w-3xl mx-auto"
            >
              Manufacturing with integrity through ethical labor practices, environmental 
              responsibility, and sustainable material choices
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Sustainability Initiatives
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive programs addressing environmental impact, social responsibility, and ethical manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(initiative.color)}`}>
                  <initiative.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {initiative.title}
                </h3>
                <p className="text-gray-600 mb-4">{initiative.description}</p>
                <div className="bg-white p-3 rounded border-l-4 border-green-500">
                  <span className="text-sm font-medium text-green-700">
                    Impact: {initiative.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Metrics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Environmental Performance
            </h2>
            <p className="text-lg text-gray-600">
              Measurable progress toward our sustainability goals
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className={`text-3xl font-bold mb-2 ${
                  metric.trend === 'down' ? 'text-yellow-500' : 'text-gray-900'
                }`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                <div className={`text-xs font-medium ${
                  metric.trend === 'down' ? 'text-yellow-500' : 'text-gray-700'
                }`}>
                  {metric.trend === 'down' ? '↓ Reduced' : '↑ Improved'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Sustainable Manufacturing Facility
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Clean Production Environment
                  </h3>
                  <p className="text-gray-600">
                    State-of-the-art ventilation systems, natural lighting, and ergonomic 
                    workstations ensure worker comfort and productivity while minimizing 
                    environmental impact.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Worker Welfare Facilities
                  </h3>
                  <p className="text-gray-600">
                    On-site medical clinic, cafeteria serving nutritious meals, prayer rooms, 
                    childcare facilities, and recreational areas supporting employee well-being.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Environmental Controls
                  </h3>
                  <p className="text-gray-600">
                    Advanced water treatment systems, solar energy installation, waste 
                    segregation and recycling programs, and chemical-free processing zones.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UN SDG Alignment */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              UN Sustainable Development Goals
            </h2>
            <p className="text-lg text-gray-300">
              Our initiatives align with key UN SDGs, contributing to global sustainability targets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-black font-bold">{goal.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{goal.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;