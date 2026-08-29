import React from 'react';
import PageHero from './brand/PageHero';
import useMeta from './brand/useMeta';

const PrivacyPolicy = () => {
  useMeta({
    title: 'Privacy Policy',
    description: 'How WovenTex LTD collects, uses and protects personal information across our website and the Production Portal.',
    path: '/privacy-policy',
  });

  return (
    <>
      <PageHero
        tone="plain"
        eyebrow={`Last updated ${new Date().toLocaleDateString('en-GB')}`}
        title={['Privacy', 'policy']}
        lede="How WovenTex LTD collects, uses and protects personal information across our website and the Production Portal."
      />
      <section className="bg-paper py-20 lg:py-28">
        <div className="shell">
          {/* Legal copy wants a short measure, cap it inside the shell */}
          <div className="max-w-3xl space-y-12 leading-relaxed text-ink-500">
            {/* Intro */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">1. Who this policy applies to</h2>
              <p className="mt-3">
                This Privacy Policy explains how <strong>WovenTex LTD</strong> (“WovenTex”, “we”, “us”) collects,
                uses, and protects personal information when you use:
              </p>
              <ul className="mt-3 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>The WovenTex website (woventex.co) and related pages</li>
                <li>The Production Portal product page on our website</li>
                <li>
                  The <strong>Production Portal</strong> software and web platform (including{' '}
                  <strong>productionportal.co</strong>)
                </li>
              </ul>
              <p className="mt-3">
                If you do not agree with this policy, please do not use our services.
              </p>
            </section>

            {/* Controller */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">2. Data controller</h2>
              <p className="mt-3">
                The data controller is <strong>WovenTex LTD</strong>.
              </p>
              <p className="mt-3">
                Contact email: <strong>contact@woventex.co</strong>
              </p>
            </section>

            {/* What we collect */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">3. Information we collect</h2>
              <p className="mt-3">
                Depending on how you interact with us, we may collect:
              </p>

              <h3 className="mono-label mt-6 text-signal-700">A) Website (WovenTex)</h3>
              <ul className="mt-2 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>Contact details you submit (name, email, company, message content)</li>
                <li>Basic usage data (pages viewed, approximate location, device/browser information)</li>
                <li>Cookies and similar technologies (see Cookies section below)</li>
              </ul>

              <h3 className="mono-label mt-7 text-signal-700">B) Production Portal (software + web app)</h3>
              <ul className="mt-2 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>Account information (name, email, role, organisation/factory name)</li>
                <li>Authentication data (login tokens; passwords are stored hashed where applicable)</li>
                <li>
                  Operational data you or your team submit (production targets, outputs, blockers, notes, approvals,
                  timestamps, line/department identifiers)
                </li>
                <li>Support interactions (messages, screenshots, diagnostic logs you choose to send)</li>
                <li>Device and usage data (app version, device type, IP address, crash reports)</li>
              </ul>

              <p className="mt-4 text-sm text-ink-400">
                Important: Production Portal is an operational tool. Data entered into the platform may relate to
                production performance and internal operations.
              </p>
            </section>

            {/* How we use */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">4. How we use your information</h2>
              <ul className="mt-3 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>To respond to enquiries and provide requested information</li>
                <li>To provide, maintain, and improve Production Portal and the WovenTex website</li>
                <li>To set up accounts, manage roles, and support operational workflows</li>
                <li>To monitor performance, reliability, and security (including fraud prevention)</li>
                <li>To provide customer support and troubleshoot issues</li>
                <li>To meet legal, regulatory, or contractual obligations</li>
              </ul>
            </section>

            {/* Legal bases */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">5. Legal bases (UK GDPR)</h2>
              <p className="mt-3">
                Where applicable under UK GDPR, we process personal data on the basis of:
              </p>
              <ul className="mt-3 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li><strong>Contract</strong> (to provide Production Portal or respond to your request)</li>
                <li><strong>Legitimate interests</strong> (to run, improve, and secure our services)</li>
                <li><strong>Consent</strong> (where required, such as certain cookies or marketing)</li>
                <li><strong>Legal obligation</strong> (where we must comply with law)</li>
              </ul>
            </section>

            {/* Sharing */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">6. Sharing your information</h2>
              <p className="mt-3">
                We do not sell your personal data. We may share information with:
              </p>
              <ul className="mt-3 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>Service providers who help us run our website/app (hosting, analytics, error monitoring)</li>
                <li>Payment/subscription providers (if applicable)</li>
                <li>Professional advisors (legal, accounting) where necessary</li>
                <li>Authorities where required by law</li>
              </ul>
              <p className="mt-3">
                We only share what is necessary and expect appropriate safeguards from providers.
              </p>
            </section>

            {/* International transfers */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">7. International transfers</h2>
              <p className="mt-3">
                Your data may be processed in countries outside the UK. Where this happens, we use appropriate safeguards
                (for example, contractual protections) to help ensure a similar level of protection.
              </p>
            </section>

            {/* Retention */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">8. Data retention</h2>
              <p className="mt-3">
                We keep personal data only as long as needed for the purposes described in this policy, including legal,
                accounting, or reporting requirements.
              </p>
              <ul className="mt-3 list-none space-y-2 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.6em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:bg-signal [&>li]:before:content-[''] space-y-1">
                <li>Website enquiries: typically retained for a reasonable period to manage follow-up</li>
                <li>
                  Production Portal accounts: retained while your account is active, and for a reasonable period after
                  closure for audit/security and operational continuity
                </li>
              </ul>
            </section>

            {/* Security */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">9. Security</h2>
              <p className="mt-3">
                We use technical and organisational measures designed to protect data (access controls, secure hosting,
                and monitoring). No system is 100% secure, but we work to protect your information.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">10. Cookies</h2>
              <p className="mt-3">
                We may use cookies and similar technologies to operate the website and understand usage. You can manage
                cookies through your browser settings and (where available) our cookie banner/settings.
              </p>
            </section>

            {/* Your rights */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">11. Your rights</h2>
              <p className="mt-3">
                Depending on your location, you may have rights such as access, correction, deletion, restriction,
                objection, and data portability. You can request this by emailing <strong>contact@woventex.co</strong>.
              </p>
            </section>

            {/* Production Portal specific note */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">12. Production Portal organisational data</h2>
              <p className="mt-3">
                Production Portal is typically used by a business/factory. If you are using Production Portal through an
                organisation, your organisation may control certain settings and access permissions (for example, admin
                visibility). We process that data to provide the service.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">13. Changes to this policy</h2>
              <p className="mt-3">
                We may update this policy from time to time. We will post updates on this page and change the “Last
                updated” date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="w-condensed border-t border-ink/15 pt-5 text-2xl font-bold uppercase leading-tight text-ink">14. Contact</h2>
              <p className="mt-3">
                Questions or requests: <strong>contact@woventex.co</strong>
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
