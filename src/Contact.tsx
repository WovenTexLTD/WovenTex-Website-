import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);

      const res = await fetch('https://formspree.io/f/mvgbgyjn', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.errors?.[0]?.message || `Request failed with ${res.status}`);
      }

      setIsSubmitted(true);
      formEl.reset();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background.png"
            alt="Contact WovenTex for manufacturing solutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-bold text-white mb-6"
          >
            Let’s Start Your <span className="text-yellow-400">Production Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Share your requirements and we’ll send a tailored quotation and production timeline
            within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
            <p className="text-gray-600">
              We typically respond within a few business hours. Provide as much detail as possible
              for the most accurate quote.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1 text-gray-700" />
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <a className="text-gray-600 hover:underline" href="mailto:contact@woventex.co">
                    contact@woventex.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={20} className="mt-1 text-gray-700" />
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <a className="text-gray-600 hover:underline" href="tel:+447933291037">
                    +44 7933291037
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-gray-700" />
                <div>
                  <div className="font-medium text-gray-900">Office</div>
                  <div className="text-gray-600">London, United Kingdom</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-1 text-gray-700" />
                <div>
                  <div className="font-medium text-gray-900">Hours</div>
                  <div className="text-gray-600">Mon–Fri · 09:00–18:00 (UK)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              {isSubmitted ? (
                <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="text-green-600 mt-0.5" size={20} />
                  <div>
                    <div className="font-semibold text-green-800">Thanks! Message sent.</div>
                    <div className="text-green-700">
                      We’ll get back to you shortly at the email you provided.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                  {/* Optional subject for Formspree dashboard */}
                  <input type="hidden" name="_subject" value="New quote request from WovenTex website" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="jane@brand.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Your brand name"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="+44 …"
                      />
                    </div>

                    <div>
                      <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type
                      </label>
                      <input
                        id="productType"
                        name="productType"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="Denim jackets, tees, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Quantity
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="e.g. 5,000 pcs"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Styles, fabrics, target price, timeline, delivery terms…"
                    />
                  </div>

                  {error && (
                    <div className="p-3 text-sm rounded-md bg-red-50 text-red-700 border border-red-200">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold bg-gray-900 text-white hover:bg-gray-800 transition disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      'Sending…'
                    ) : (
                      <>
                        Send Request
                        <Send size={16} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

