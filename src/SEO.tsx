import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

const BASE_URL = 'https://woventex.co';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-image.png`;

const SEO: React.FC<SEOProps> = ({ title, description, canonical, ogImage }) => {
  const fullTitle = `${title} | WovenTex LTD`;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
