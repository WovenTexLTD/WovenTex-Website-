import React from "react";
import "./Blog.css";

const Blog: React.FC = () => {
  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="blog-hero-overlay">
          <div className="blog-hero-content">
            <h1>WT Blog</h1>
            <p>
              Perspective from the factory floor to the boardroom – sourcing,
              manufacturing, and supply chain strategy for modern brands.
            </p>
          </div>
        </div>
      </section>

      {/* BLOG GRID SECTION */}
      <main className="blog-section">
        <div className="blog-grid">
          {/* BLOG CARD 1 */}
          <article className="blog-card">
            <div className="blog-image-wrapper">
              <img
                src="/images/dpp.jpg"
                alt="Garment production line in a factory"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                The Rise of Digital Product Passports (DPPs) — And Why Brands Must Prepare Now
              </h2>
              <p className="blog-meta">Posting on 16 December 2025</p>
              <a href="/src/Blog.tsx" className="blog-button">
                Coming soon
              </a>
            </div>
          </article>

          {/* BLOG CARD 2 */}
          <article className="blog-card">
            <div className="blog-image-wrapper">
              <img
                src="/images/denim.jpg"
                alt="Close-up of sustainable fabric rolls"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                How Is Denim Leading the Sustainability Transition
              </h2>
              <p className="blog-meta">Posting on 8 December 2025</p>
              <a href="/blog/denimblog.html" className="blog-button">
               View Article
              </a>
            </div>
          </article>

          {/* BLOG CARD 3 */}
          <article className="blog-card">
            <div className="blog-image-wrapper">
              <img
                src="/images/fibers.jpg"
                alt="Garment factories in Bangladesh"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                Why Recycled Fibres Are the New Mainstream
              </h2>
              <p className="blog-meta">Posted on 1 December 2025</p>
             <a href="/blog/fibers.html" className="blog-button">
                View Article
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Blog;
