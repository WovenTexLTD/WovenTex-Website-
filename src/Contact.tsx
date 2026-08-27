import React, { useState } from 'react';
import PageHero from './brand/PageHero';
import { Reveal, RevealItem, Section } from './brand/ui';
import useMeta from './brand/useMeta';

const field =
  'w-full border border-ink/20 bg-paper px-4 py-3.5 text-[15px] text-ink transition-colors duration-200 placeholder:text-ink-200 focus:border-ink focus:outline-none focus:ring-2 focus:ring-signal';
const label = 'mono-label mb-2 block text-ink-400';

const details = [
  {
    k: 'Email',
    v: 'contact@woventex.co',
    href: 'mailto:contact@woventex.co',
  },
  {
    k: 'Phone',
    v: '+44 7933 291037',
    href: 'tel:+447933291037',
  },
  {
    k: 'Office',
    v: '167–169 Great Portland Street, 5th Floor, London W1W 5PF',
  },
  {
    k: 'Hours',
    v: 'Monday–Friday · 09:00–18:00 UK',
  },
];

export default function Contact() {
  useMeta({
    title: 'Contact',
    description: 'Send your requirements and receive a costed quotation and production timeline within 24 hours. London office, +44 7933 291037.',
    path: '/contact',
    image: '/images/background.jpg',
  });

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Start a production"
        title={['Tell us what', 'you need made']}
        lede="Share your requirements and we’ll come back with a costed quotation and a production timeline within 24 hours."
        image="/images/background.jpg"
        imageAlt="Garment being finished on an industrial machine"
        imagePosition="70% center"
      />

      <Section tone="paper" className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          {/* ------------------------------------------------------ details */}
          <Reveal>
            <RevealItem>
              <div className="border-t border-ink/15 pt-4">
                <span className="mono-label text-ink-400">Get in touch</span>
              </div>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                We usually reply within a few business hours. The more detail you can share, the
                more accurate the quote.
              </p>
            </RevealItem>

            <RevealItem>
              <dl className="mt-10">
                {details.map((d) => (
                  <div key={d.k} className="border-t border-ink/12 py-5">
                    <dt className={label}>{d.k}</dt>
                    <dd className="text-[15px] leading-snug text-ink-600">
                      {d.href ? (
                        <a href={d.href} className="link-swipe hover:text-signal-700">
                          {d.v}
                        </a>
                      ) : (
                        d.v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>

            <RevealItem>
              <div className="mt-10 border border-ink/15 p-6">
                <span className="mono-label text-signal-700">What to include</span>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-400">
                  {[
                    'Product type and target fabric',
                    'Estimated quantity per style',
                    'Target landed price',
                    'Required delivery window',
                    'Any certification requirements',
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-signal" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          </Reveal>

          {/* --------------------------------------------------------- form */}
          <Reveal>
            <RevealItem>
              {isSubmitted ? (
                <div className="border border-ink/15 bg-paper-200 p-10">
                  <span className="mono-label text-signal-700">Received</span>
                  <h2 className="mt-5 w-condensed text-display-sm font-black uppercase leading-none">
                    Thanks — message sent
                  </h2>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-500">
                    We’ll come back to you at the email you provided, usually within a few business
                    hours and always within 24.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="border border-ink/15 bg-paper-200 p-6 lg:p-10">
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New quote request from the WovenTex website"
                  />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={label}>
                        Full name *
                      </label>
                      <input id="name" name="name" required className={field} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className={label}>
                        Email address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={field}
                        placeholder="jane@brand.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className={label}>
                        Company
                      </label>
                      <input id="company" name="company" className={field} placeholder="Your brand" />
                    </div>
                    <div>
                      <label htmlFor="phone" className={label}>
                        Phone
                      </label>
                      <input id="phone" name="phone" className={field} placeholder="+44 …" />
                    </div>
                    <div>
                      <label htmlFor="productType" className={label}>
                        Product type
                      </label>
                      <input
                        id="productType"
                        name="productType"
                        className={field}
                        placeholder="Denim jackets, tees…"
                      />
                    </div>
                    <div>
                      <label htmlFor="quantity" className={label}>
                        Estimated quantity
                      </label>
                      <input
                        id="quantity"
                        name="quantity"
                        className={field}
                        placeholder="e.g. 5,000 pcs"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="message" className={label}>
                      Project details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className={field}
                      placeholder="Styles, fabrics, target price, timeline, delivery terms…"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="mt-5 border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-800"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn mt-8 inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-sm font-semibold uppercase tracking-label text-paper transition-colors duration-300 hover:bg-signal hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : 'Send request'}
                    <span className="transition-transform duration-300 ease-brand group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>

                  <p className="mono-label mt-6 text-ink-300">
                    We reply within 24 hours · Your details are never shared
                  </p>
                </form>
              )}
            </RevealItem>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
