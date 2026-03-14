import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Users, Truck, Zap, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEO from './SEO';

/* ── Static data ─────────────────────────────────────────────── */
type Stat = { value: string; label: string; sub: string };
type Category = { name: string; image: string; position?: string; tag: string };

const stats: Stat[] = [
  { value: '500K+', label: 'pcs/month', sub: 'production capacity' },
  { value: '100%', label: 'CIS Certified', sub: 'verified compliance' },
  { value: '15+', label: 'certifications', sub: 'globally recognised' },
  { value: '98%', label: 'on-time delivery', sub: 'guaranteed reliability' },
];

const clients = [
  'Pull&Bear', 'Hugo Boss', 'DKNY', 'Inditex', 'Giant Tiger', 'LIDL', 'Polo Ralph Lauren',
  'Pull&Bear', 'Hugo Boss', 'DKNY', 'Inditex', 'Giant Tiger', 'LIDL', 'Polo Ralph Lauren',
];

const certifications = [
  { name: 'GOTS', desc: 'Global Organic Textile Standard' },
  { name: 'GRS', desc: 'Global Recycled Standard' },
  { name: 'RCS', desc: 'Recycled Claim Standard' },
  { name: 'BSCI', desc: 'Business Social Compliance' },
  { name: 'Sedex', desc: 'Supplier Ethical Data Exchange' },
];

const categories: Category[] = [
  { name: 'Premium Denim', image: '/images/jeans.png', position: 'object-top', tag: 'Best Seller' },
  { name: 'Casual Outerwear', image: '/images/jacket.png', position: 'object-top', tag: 'Popular' },
  { name: 'Contemporary Basics', image: '/images/shirt.png', position: 'object-top', tag: 'Core Range' },
  { name: 'Technical Workwear', image: '/images/construction.png', position: 'object-top', tag: 'Specialist' },
];

const whyCards = [
  {
    icon: Award as LucideIcon,
    title: 'Direct Factory Access',
    text: "Direct access to our network of factories including Murad Apparels, one of Bangladesh's largest certified manufacturers — consistent quality, competitive pricing.",
  },
  {
    icon: Globe as LucideIcon,
    title: 'UK-Based Management',
    text: 'London headquarters with experienced leadership providing local support, clear communication, and uncompromising professionalism.',
  },
  {
    icon: Users as LucideIcon,
    title: 'Proven Track Record',
    text: 'Our network manufactures for major brands like Zara, Hugo Boss, and Polo Ralph Lauren with 98% on-time delivery and consistent quality.',
  },
  {
    icon: Truck as LucideIcon,
    title: 'Flexible Production',
    text: 'Each factory has 500,000+ pieces monthly capacity. MOQs from 2,000 to 50,000+, accommodating both emerging and established brands.',
  },
  {
    icon: Zap as LucideIcon,
    title: 'Complete Transparency',
    text: 'Real-time production updates, quality reports, and direct communication throughout the process for complete peace of mind.',
  },
  {
    icon: Shield as LucideIcon,
    title: 'Global Compliance',
    text: '15+ international certifications including GOTS, BSCI, and Sedex ensuring ethical manufacturing and environmental responsibility.',
  },
];

const processSteps = [
  { step: '01', title: 'Design & Consultation', description: 'Technical review, fabric selection, and production planning with our expert team.' },
  { step: '02', title: 'Sample Development', description: 'Rapid prototyping and sample approval with detailed quality specifications.' },
  { step: '03', title: 'Production & QC', description: 'Manufacturing with inline quality control and regular progress updates.' },
  { step: '04', title: 'Delivery & Support', description: 'Final inspection, packaging, and global shipping with ongoing support.' },
];

/* ── Static animation variants (never recreated on render) ───── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as Record<string, unknown>,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: '-80px' },
};

// Container + item variants for staggered grids (1 observer per grid, not N)
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Component ───────────────────────────────────────────────── */
const Home = () => {
  return (
    <>
    <SEO
      title="Apparel Manufacturing & Sourcing Agency"
      description="WovenTex connects global fashion brands to world-class certified apparel factories. 25+ years experience, 500,000+ monthly capacity, trusted by Hugo Boss, Polo Ralph Lauren, DKNY and more."
      canonical="/"
    />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background.png"
            alt="High-end garment manufacturing"
            className="w-full h-full object-cover scale-105"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(255,185,5,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight"
          >
            Your Direct Link to
            <br />
            <span className="gradient-text drop-shadow-[0_0_40px_rgba(255,185,5,0.3)]">
              World-Class
            </span>
            <br />
            <span className="font-display italic text-white/90">Apparel</span>
            {' '}Manufacturing
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Strategic factory partnerships, transparent production management, and
            uncompromising quality standards — all from one trusted UK partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/contact" className="btn-primary group">
              Let&apos;s Talk Production
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link to="/capabilities" className="btn-outline-white">
              View Capabilities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-gray-950 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,185,5,0.05)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="text-center lg:px-8">
                <div className="text-4xl lg:text-5xl font-black gradient-text mb-1 leading-none">{s.value}</div>
                <div className="text-white font-semibold text-base mb-0.5">{s.label}</div>
                <div className="text-gray-500 text-sm">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY WOVEN TEX ===== */}
      <section className="py-24 wave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">
              Why Global Brands{' '}
              <span className="gradient-text">Choose WovenTex</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Our unique position as a UK-based agency with direct factory access delivers
              unmatched quality, reliability, and transparency.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyCards.map((card) => (
              <motion.div key={card.title} variants={staggerItem} className="card-gold-top">
                <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6">
                  <card.icon className="text-yellow-500" size={26} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CLIENTS MARQUEE ===== */}
      <section className="py-16 wave-bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div {...fadeUp} className="text-center">
            <div className="section-divider" />
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 tracking-tight">
              Trusted by the World&apos;s Leading Brands
            </h2>
            <p className="text-gray-500">
              Our factory network manufactures for some of the most recognised names in fashion.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div className="marquee-track">
              {clients.map((client, i) => (
                <div key={i} className="px-12 py-4 flex items-center shrink-0">
                  <span className="text-2xl lg:text-3xl font-black text-gray-500 hover:text-yellow-500
                    transition-colors duration-300 cursor-default tracking-tight whitespace-nowrap">
                    {client}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/30 ml-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,185,5,0.04)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Streamlined{' '}
              <span className="gradient-text">Production Process</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              From concept to delivery — our proven process ensures quality and efficiency at every step.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processSteps.map((p, i) => (
              <motion.div key={p.step} variants={staggerItem} className="relative text-center group">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px bg-gradient-to-r from-yellow-500/40 to-transparent" />
                )}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full
                  bg-gray-900 border-2 border-yellow-500/30 group-hover:border-yellow-500
                  transition-colors duration-300 mb-6 mx-auto">
                  <span className="text-2xl font-black gradient-text">{p.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES ===== */}
      <section className="py-24 wave-bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Manufacturing{' '}
              <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-gray-500 text-lg">
              Specialised production across diverse apparel categories with world-class quality.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl
                  transition-shadow duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={`w-full h-64 md:h-80 object-cover ${cat.position ?? ''} group-hover:scale-105 transition-transform duration-500`}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={320}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-yellow-500/90 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                    {cat.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-base lg:text-lg">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/capabilities" className="btn-primary group">
              View All Capabilities
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,185,5,0.05)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Certified for{' '}
              <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Our factory network&apos;s certifications ensure ethical manufacturing and environmental responsibility.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6"
          >
            {certifications.map((c) => (
              <motion.div
                key={c.name}
                variants={staggerItem}
                className="group bg-gray-900/60 border border-white/5 hover:border-yellow-500/30
                  rounded-2xl p-6 text-center transition-colors duration-300 hover:bg-gray-900"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center
                  mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-black text-sm leading-none">{c.name}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/certifications" className="btn-primary group">
              View All Certifications
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 wave-bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,185,5,0.07)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight text-balance">
              Ready to Start Your{' '}
              <span className="gradient-text">Next Production?</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the global brands who trust WovenTex for their manufacturing needs.
              Get a detailed quote and timeline for your project within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary group">
                Request a Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link to="/capabilities" className="btn-outline-white !border-gray-200 !text-gray-700 hover:!bg-gray-900 hover:!text-white hover:!border-gray-900">
                View Capabilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCTION PORTAL ===== */}
      <section className="pt-24 pb-0 text-white relative overflow-hidden pp-section-bg">
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end">

            <div className="pb-24">
              <motion.div {...fadeUp} className="flex items-center gap-4 mb-8">
                <img src="/images/app-icon.png" alt="ProductionPortal" className="w-20 h-20 rounded-2xl shadow-lg shadow-blue-600/30" width={80} height={80} />
                <div>
                  <div className="text-sm font-bold text-blue-400 tracking-widest uppercase mb-1">Powered by WovenTex</div>
                  <div className="text-3xl font-black tracking-tight">ProductionPortal</div>
                </div>
              </motion.div>

              <motion.h2 {...fadeUp} className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
                Every Order.{' '}
                <span className="text-blue-400">Every Line.</span>
                <br />Under Control.
              </motion.h2>

              <motion.p {...fadeUp} className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
                Built for apparel brands and factories that need real-time visibility across
                orders, lines, and deliveries — all in one place.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="space-y-3 mb-10"
              >
                {[
                  { icon: '⚡', text: 'Real-time production status across every line' },
                  { icon: '🔔', text: 'Fewer delays, fewer surprises' },
                  { icon: '📊', text: 'One source of truth for brands and factories' },
                ].map((f) => (
                  <motion.div key={f.text} variants={staggerItem} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-gray-300 text-sm font-medium">{f.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div {...fadeUp}>
                <a
                  href="https://productionportal.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500
                    text-white font-bold px-7 py-3.5 rounded-sm transition-all duration-300
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105"
                >
                  Visit productionportal.co
                  <ArrowRight size={18} />
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-80px' }}
              className="relative flex justify-center items-end -mx-8 lg:-mx-16"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />
              <img
                src="/images/phones.png"
                alt="ProductionPortal mobile app"
                className="relative w-full"
                loading="lazy"
                decoding="async"
                width={600}
                height={600}
              />
            </motion.div>

          </div>
        </div>
      </section>

    </div>
    </>
  );
};

export default Home;
