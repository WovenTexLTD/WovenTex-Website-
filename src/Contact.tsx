import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // optional local state (not required for Formspree, but useful if you want to reset the form)
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productType: '',
    quantity: '',
    message: '',
  });

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Build a plain object from the form
      const data = new FormData(e.currentTarget);

      // POST directly to Formspree
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
      setFormdata({
        name: '',
        email: '',
        company: '',
        phone: '',
        productType: '',
        quantity: '',
        message: '',
      });
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background.png"
            alt="Contact WovenTex for manufacturing solutions"
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
              Ready to bring your designs to life? Get in touch with our team for a detailed
              quote and production timeline within 24 hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact + Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: contact info / details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-900">Get in touch</h2>
              <p className="text-gray-600">
                We typically respond within a few business hours. Share your requirements and
                we’ll prepare a tailored quotation.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 text-gray-700" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a
                      href="mailto:info@yourdomain.com"
                      className="text-gray-600 hover:underline"
                    >
                      info@yourdomain.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 text-gray-700" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <a href="tel:+441234567890" className="text-gray-600 hover:underline">
                      +44 1234 567 890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gray-700" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Office</div>
                    <div className="text-gray-600">London, United Kingdom</div>
                  </div>
                </div>
                <div className="flex items-start

                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type *
                      </label>
                      <select
                        id="productType"
                        name="productType"
                        required
                        value={formData.productType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Select Product Type</option>
                        <option value="denim">Denim</option>
                        <option value="t-shirts">T-shirts & Basics</option>
                        <option value="jackets">Jackets & Outerwear</option>
                        <option value="puffer">Puffer Jackets</option>
                        <option value="activewear">Activewear</option>
                        <option value="workwear">Workwear</option>
                        <option value="courier">Courier Apparel</option>
                        <option value="swimwear">Swimwear</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Quantity *
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Select Quantity Range</option>
                        <option value="2000-5000">2,000 - 5,000 pieces</option>
                        <option value="5000-10000">5,000 - 10,000 pieces</option>
                        <option value="10000-25000">10,000 - 25,000 pieces</option>
                        <option value="25000-50000">25,000 - 50,000 pieces</option>
                        <option value="50000+">50,000+ pieces</option>
                      </select>
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
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your project requirements, timeline, fabric preferences, and any specific certifications needed..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black px-8 py-4 rounded-sm font-semibold hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle className="mr-2" size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Send Quote Request
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="text-yellow-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <p className="text-gray-600">contact@woventex.co</p>
                        <p className="text-sm text-gray-500">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="text-yellow-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Phone</h4>
                        <p className="text-gray-600">+44 7933 291037
                      </p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM GMT</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-yellow-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Office</h4>
                        <p className="text-gray-600">London, United Kingdom</p>
                        <p className="text-sm text-gray-500">UK-based management team</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="text-yellow-700" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Response Time</h4>
                        <p className="text-gray-600">24-hour quote turnaround</p>
                        <p className="text-sm text-gray-500">Detailed production timeline included</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">What to Include in Your Request</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Product specifications and designs</li>
                    <li>• Quantity requirements and timeline</li>
                    <li>• Fabric preferences and certifications needed</li>
                    <li>• Target price range and delivery location</li>
                    <li>• Any special requirements or customizations</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                UK-Based Management, Global Manufacturing
              </h2>
              <p className="text-gray-600 mb-6">
                Our London headquarters provides local support and clear communication 
                while coordinating with our network of certified manufacturing facilities. 
                This unique structure ensures professional service standards with 
                competitive global manufacturing capabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Direct factory access and oversight</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">UK-based project management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Real-time production updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Quality assurance at every step</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/logowhite.png"
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

export default Contact;
