import React from "react";
import "./Blog.css";

const Blog: React.FC = () => {
  return (
    <div className="blog-page">
      {/* HERO SECTION */}
      <section className="blog-hero">
        <div className="blog-hero-overlay">
          <div className="blog-hero-content">
            <span className="blog-hero-tag">Journal</span>
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
                src="/images/blog/lead-times.jpg"
                alt="Garment production line in a factory"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                How to Reduce Lead Times Without Sacrificing Quality
              </h2>
              <p className="blog-meta">Posted on 24 November 2025</p>
              <a href="/blog/reduce-lead-times" className="blog-button">
                Read Article
              </a>
            </div>
          </article>

          {/* BLOG CARD 2 */}
          <article className="blog-card">
            <div className="blog-image-wrapper">
              <img
                src="/images/blog/sustainable-sourcing.jpg"
                alt="Close-up of sustainable fabric rolls"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                What Buyers Should Really Ask Their Suppliers
              </h2>
              <p className="blog-meta">Posted on 17 November 2025</p>
              <a href="/blog/questions-for-suppliers" className="blog-button">
                Read Article
              </a>
            </div>
          </article>

          {/* BLOG CARD 3 */}
          <article className="blog-card">
            <div className="blog-image-wrapper">
              <img
                src="/images/blog/bangladesh-factories.jpg"
                alt="Garment factories in Bangladesh"
              />
            </div>
            <div className="blog-content">
              <h2 className="blog-title">
                Why Bangladesh Should Be Your Next Sourcing Hub
              </h2>
              <p className="blog-meta">Posted on 10 November 2025</p>
              <a href="/blog/bangladesh-sourcing-hub" className="blog-button">
                Read Article
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Blog;
