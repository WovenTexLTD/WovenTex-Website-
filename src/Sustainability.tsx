import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Droplets, Recycle, Heart, Shield } from 'lucide-react';
import SEO from './SEO';

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
    <>
    <SEO
      title="Sustainability"
      description="WovenTex is committed to responsible manufacturing. Our factory partners use organic materials, water reduction technology, fair labour practices, and circular economy principles."
      canonical="/sustainability"
    />
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/worker5.jpg"
            alt="Sustainable manufacturing practices"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/65" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.04]"
            >
              <span className="gradient-text">Sustainability</span> & Ethics
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300/90 max-w-2xl mx-auto leading-relaxed"
            >
              Manufacturing with integrity through ethical labor practices, environmental
              responsibility, and sustainable material choices.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Key Initiatives */}
      <section className="py-20 wave-bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
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
                className="card-gold-top"
              >
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center mb-5">
                  <initiative.icon className="text-yellow-600" size={22} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-widest">
                  {initiative.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{initiative.description}</p>
                <div className="border-t border-yellow-500/20 pt-3">
                  <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wider">
                    {initiative.impact}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Metrics */}
      <section className="py-20 wave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight">
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
                className="card-gold-top text-center"
              >
                <div className="text-4xl font-black mb-2 gradient-text">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 mb-2 leading-snug">{metric.label}</div>
                <div className="text-xs font-semibold text-yellow-700 uppercase tracking-wider">
                  {metric.trend === 'down' ? '↓ Reduced' : '↑ Improved'}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Features */}
      <section className="py-20 wave-bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center"
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-8 tracking-tight">
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
            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight">
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
                className="relative overflow-hidden bg-white/5 border border-white/10 p-6 hover:bg-white/8 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-yellow-500 flex items-center justify-center mr-4 shrink-0">
                    <span className="text-black font-black text-sm">{goal.number}</span>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white">{goal.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Sustainability;