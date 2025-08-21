import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Leaf, Users, Globe, CheckCircle } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      name: 'GOTS',
      fullName: 'Global Organic Textile Standard',
      icon: Leaf,
      description: 'Ensures organic fiber content and environmental criteria throughout the supply chain',
      scope: 'Organic cotton processing and manufacturing',
      certNumber: 'GOTS-2024-BD-001',
      validity: 'Valid until March 2025',
      color: 'green'
    },
    {
      name: 'GRS',
      fullName: 'Global Recycled Standard',
      icon: Globe,
      description: 'Verifies recycled content and responsible supply chain practices',
      scope: 'Recycled polyester and fiber processing',
      certNumber: 'GRS-2024-BD-002',
      validity: 'Valid until June 2025',
      color: 'blue'
    },
    {
      name: 'RCS',
      fullName: 'Recycled Claim Standard',
      icon: CheckCircle,
      description: 'Tracks and verifies recycled raw material content in products',
      scope: 'Recycled material verification',
      certNumber: 'RCS-2024-BD-003',
      validity: 'Valid until August 2025',
      color: 'cyan'
    },
    {
      name: 'BSCI',
      fullName: 'Business Social Compliance Initiative',
      icon: Users,
      description: 'Ensures ethical working conditions and social compliance standards',
      scope: 'Labor practices and worker rights',
      certNumber: 'BSCI-2024-BD-004',
      validity: 'Valid until December 2024',
      color: 'orange'
    },
    {
      name: 'Sedex',
      fullName: 'Supplier Ethical Data Exchange',
      icon: Shield,
      description: 'Promotes responsible business practices in global supply chains',
      scope: 'Ethical trade and supply chain transparency',
      certNumber: 'SEDEX-2024-BD-005',
      validity: 'Valid until February 2025',
      color: 'purple'
    },
    {
      name: 'OEKO-TEX',
      fullName: 'OEKO-TEX Standard 100',
      icon: Award,
      description: 'Tests for harmful substances and ensures textile safety',
      scope: 'Chemical safety and textile testing',
      certNumber: 'OEKO-2024-BD-006',
      validity: 'Valid until September 2025',
      color: 'red'
    },
    {
      name: 'ISO 9001',
      fullName: 'Quality Management System',
      icon: Award,
      description: 'International standard for quality management systems',
      scope: 'Quality management and continuous improvement',
      certNumber: 'ISO-9001-2024-BD-007',
      validity: 'Valid until January 2026',
      color: 'gray'
    },
    {
      name: 'ISO 14001',
      fullName: 'Environmental Management System',
      icon: Leaf,
      description: 'Framework for environmental management and sustainability',
      scope: 'Environmental impact management',
      certNumber: 'ISO-14001-2024-BD-008',
      validity: 'Valid until April 2025',
      color: 'green'
    },
    {
      name: 'WRAP',
      fullName: 'Worldwide Responsible Accredited Production',
      icon: Globe,
      description: 'Certification for safe, lawful, humane, and ethical manufacturing',
      scope: 'Manufacturing facility certification',
      certNumber: 'WRAP-2024-BD-009',
      validity: 'Valid until November 2025',
      color: 'blue'
    }
  ];

  const complianceAreas = [
    {
      title: 'Environmental Standards',
      description: 'Comprehensive environmental management including water treatment, energy efficiency, and waste reduction',
      certifications: ['GOTS', 'GRS', 'ISO 14001']
    },
    {
      title: 'Social Compliance',
      description: 'Ethical labor practices, fair wages, safe working conditions, and worker rights protection',
      certifications: ['BSCI', 'Sedex', 'WRAP']
    },
    {
      title: 'Product Safety',
      description: 'Chemical testing, material safety, and product quality assurance for consumer protection',
      certifications: ['OEKO-TEX', 'ISO 9001']
    },
    {
      title: 'Sustainable Materials',
      description: 'Organic and recycled content verification with full supply chain traceability',
      certifications: ['GOTS', 'GRS', 'RCS']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      cyan: 'bg-cyan-100 text-cyan-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700',
      red: 'bg-red-100 text-red-700',
      gray: 'bg-gray-100 text-gray-700'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/7180655/pexels-photo-7180655.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Quality certification and compliance"
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
              <span className="text-yellow-400">Certifications</span> & Compliance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Our network of factories maintain the highest international standards through 
              comprehensive certifications and continuous compliance monitoring
            </motion.p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              International Certifications
            </h2>
            <p className="text-lg text-gray-600">
              Verified compliance with global standards for quality, sustainability, and ethical manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(cert.color)}`}>
                  <cert.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{cert.fullName}</h4>
                <p className="text-gray-600 mb-4 text-sm">{cert.description}</p>
                <div className="space-y-2 text-xs text-gray-500">
                  <div><strong>Scope:</strong> {cert.scope}</div>
                  <div><strong>Certificate:</strong> {cert.certNumber}</div>
                  <div><strong>Validity:</strong> {cert.validity}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Compliance Areas
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive coverage across all aspects of responsible manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{area.title}</h3>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.certifications.map((cert, certIndex) => (
                    <span
                      key={certIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Continuous Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Continuous Compliance Monitoring
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Regular Audits
                  </h3>
                  <p className="text-gray-600">
                    Quarterly third-party audits and annual certification renewals 
                    ensure ongoing compliance with all international standards.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Real-time Monitoring
                  </h3>
                  <p className="text-gray-600">
                    Digital tracking systems monitor environmental parameters, 
                    worker conditions, and quality metrics in real-time.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Continuous Improvement
                  </h3>
                  <p className="text-gray-600">
                    Regular training programs, process optimization, and technology 
                    upgrades maintain our position at the forefront of industry standards.
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
                src="/images/hands.jpg"
                alt="Compliance monitoring and documentation systems"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
