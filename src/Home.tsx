import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, Users, Truck, Zap, Shield, Bell, BarChart3, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEO from './SEO';

/* ── Static data ─────────────────────────────────────────────── */
type Stat = { value: string; label: string; sub: string };
type Category = { name: string; image: string; position?: string; tag: string };

const stats: Stat[] = [
  { value: '500K+', label: 'pcs/month', sub: 'Production Capacity' },
  { value: '100%', label: 'CIS Certified', sub: 'Verified Compliance' },
  { value: '15+', label: 'Certifications', sub: 'Globally Recognised' },
  { value: '98%', label: 'On-Time Delivery', sub: 'Guaranteed Reliability' },
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

/* ── Static animation variants ───────────────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as Record<string, unknown>,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: '-80px' },
};

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
            <span className="gradient-text drop-shadow-[0_0_40px_rgba(201,150,30,0.3)]">
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
      <section className="bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/[0.07]"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem} className="py-14 px-6 lg:px-10 text-center">
                <div className="text-5xl sm:text-6xl lg:text-7xl font-black gradient-text mb-3 leading-none tabular-nums">{s.value}</div>
                <div className="text-white/60 font-semibold text-[0.65rem] uppercase tracking-[0.18em] mb-1.5">{s.label}</div>
                <div className="text-gray-600 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </section>

      {/* ===== BRAND STATEMENT — photo background ===== */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        {/* Background: factory cutting floor */}
        <div className="absolute inset-0">
          <img
            src="/images/worker1.jpg"
            alt="Factory floor"
            className="w-full h-full object-cover object-center scale-105"
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 bg-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,150,30,0.06)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <p className="text-[0.6rem] font-bold tracking-[0.35em] uppercase text-gray-500 mb-10">The WovenTex Approach</p>
            <blockquote className="font-display italic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white/90 leading-[1.15] mb-10">
              &ldquo;Where global fashion brands<br className="hidden md:block" />
              {' '}meet world-class{' '}
              <span className="gradient-text not-italic font-black">manufacturing.&rdquo;</span>
            </blockquote>
            <div className="w-20 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
            <div className="flex items-center justify-center gap-2 text-gray-500 text-[0.65rem] tracking-[0.2em] uppercase">
              <MapPin size={11} />
              <span>WovenTex LTD · 167 Great Portland Street · London</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== INSIDE THE FACTORY — photo grid ===== */}
      <section className="bg-gray-950 pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <motion.div {...fadeUp} className="py-16">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="w-10 h-px mb-5" style={{ background: 'linear-gradient(90deg, #C9961E, #D4AF37 50%, transparent)' }} />
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                  Inside the <span className="gradient-text">Factory</span>
                </h2>
              </div>
              <span className="text-gray-600 text-sm tracking-wide">Murad Apparels · Dhaka, Bangladesh</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-2"
          >
            {/* Top row: hero + 2 stacked */}
            <div className="grid grid-cols-5 gap-2 h-[420px]">
              {/* Hero image */}
              <div className="col-span-3 relative overflow-hidden group">
                <img
                  src="/images/worker5.jpg"
                  alt="Workers finishing garments"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/50">Finishing & QC</span>
                </div>
              </div>

              {/* Right: 2 stacked */}
              <div className="col-span-2 grid grid-rows-2 gap-2">
                <div className="relative overflow-hidden group">
                  <img
                    src="/images/worker4.jpg"
                    alt="Worker inspecting garments"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/50">Quality Inspection</span>
                  </div>
                </div>
                <div className="relative overflow-hidden group">
                  <img
                    src="/images/worker6.jpg"
                    alt="Denim pressing machine"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={300}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/50">Industrial Pressing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: 3 equal */}
            <div className="grid grid-cols-3 gap-2 h-[260px]">
              {[
                { src: '/images/worker2.jpg', label: 'Fabric Spreading', w: 600, h: 400 },
                { src: '/images/worker1.jpg', label: 'Pattern Cutting', w: 600, h: 400 },
                { src: '/images/worker3.jpg', label: 'Industrial Processing', w: 600, h: 400 },
              ].map((img) => (
                <div key={img.src} className="relative overflow-hidden group">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    width={img.w}
                    height={img.h}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/50">{img.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===== WHY WOVEN TEX — Editorial 2-col ===== */}
      <section className="py-28 wave-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16 xl:gap-24 items-start">

            {/* Left: sticky heading */}
            <motion.div {...fadeUp} className="lg:col-span-2 lg:sticky lg:top-32">
              <div className="w-10 h-px mb-8" style={{ background: 'linear-gradient(90deg, #C9961E, #D4AF37 50%, transparent)' }} />
              <h2 className="text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-black text-gray-900 mb-6 leading-[1.04] tracking-tight">
                Why Global Brands{' '}
                <span className="gradient-text">Choose</span>
                {' '}WovenTex
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8 text-base max-w-sm">
                A UK-based agency with direct factory access — delivering quality,
                reliability, and complete transparency at every stage.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors duration-200 group">
                About WovenTex
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </Link>
            </motion.div>

            {/* Right: feature list */}
            <div className="lg:col-span-3">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: '-60px' }}
                  className="group flex gap-5 py-7 border-b border-gray-100 last:border-0"
                >
                  <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-yellow-100 transition-colors duration-300">
                    <card.icon className="text-yellow-600" size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-widest">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ===== CLIENTS MARQUEE ===== */}
      <section className="py-16 wave-bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <motion.div {...fadeUp} className="text-center">
            <div className="section-divider" />
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3 tracking-tight">
              Trusted by the World&apos;s Leading Brands
            </h2>
            <p className="text-gray-500 text-sm">
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
                  <span className="text-2xl lg:text-3xl font-black text-gray-400 hover:text-yellow-500 transition-colors duration-300 cursor-default tracking-tight whitespace-nowrap">
                    {client}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/30 ml-12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS — Ghost numbers ===== */}
      <section className="py-28 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,150,30,0.04)_0%,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-20">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
          >
            {processSteps.map((p) => (
              <motion.div key={p.step} variants={staggerItem} className="relative p-8 lg:p-10 overflow-hidden">
                <div
                  className="absolute -top-4 right-2 text-[7rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.035)' }}
                >
                  {p.step}
                </div>
                <div className="text-[0.65rem] font-bold tracking-[0.22em] uppercase mb-5 relative z-10" style={{ color: '#D4AF37' }}>
                  Step {p.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 relative z-10">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">{p.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCT CATEGORIES — Portrait editorial ===== */}
      <section className="py-28 wave-bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-14">
            <div className="section-divider mx-0" />
            <div className="flex items-end justify-between flex-wrap gap-4">
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                Manufacturing <span className="gradient-text">Expertise</span>
              </h2>
              <Link to="/capabilities" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group">
                View all capabilities
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={staggerItem}
                className="group relative overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={`w-full h-full object-cover ${cat.position ?? ''} group-hover:scale-105 transition-transform duration-700`}
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-1.5" style={{ color: '#D4AF37' }}>
                    0{i + 1} / {cat.tag}
                  </div>
                  <h3 className="text-white font-black text-base lg:text-lg tracking-tight leading-tight">{cat.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="py-24 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,150,30,0.05)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="section-divider" />
            <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Certified for <span className="gradient-text">Excellence</span>
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
                className="group bg-gray-900/60 border border-white/5 hover:border-yellow-500/30 rounded-2xl p-6 text-center transition-colors duration-300 hover:bg-gray-900"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #9A7015, #D4AF37)' }}>
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
      <section className="py-32 wave-bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(201,150,30,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <div className="section-divider" />
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1.04] text-balance">
              Ready to Start Your{' '}
              <span className="gradient-text">Next Production?</span>
            </h2>
            <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the global brands who trust WovenTex for their manufacturing needs.
              Get a detailed quote and timeline for your project within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary group">
                Request a Quote
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
              <Link to="/capabilities" className="btn-outline-white !border-gray-300 !text-gray-700 hover:!bg-gray-900 hover:!text-white hover:!border-gray-900">
                View Capabilities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCTION PORTAL ===== */}
      <section className="pt-24 pb-0 text-white relative overflow-hidden pp-section-bg">
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
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
                  { Icon: Zap, text: 'Real-time production status across every line' },
                  { Icon: Bell, text: 'Fewer delays, fewer surprises' },
                  { Icon: BarChart3, text: 'One source of truth for brands and factories' },
                ].map((f) => (
                  <motion.div key={f.text} variants={staggerItem} className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3">
                    <f.Icon className="text-blue-400 shrink-0" size={15} />
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
                    text-white font-bold px-7 py-3.5 transition-all duration-300
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

    </>
  );
};

export default Home;
