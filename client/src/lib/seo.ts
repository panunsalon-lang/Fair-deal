/**
 * SEO Helper Utilities
 * Manages meta tags, Open Graph tags, and structured data
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  author?: string;
  canonical?: string;
}

/**
 * Update document meta tags
 */
export function updateMetaTags(config: SEOConfig) {
  if (typeof window === "undefined") return;
  
  // Update title
  document.title = config.title;

  // Update or create meta tags
  updateMetaTag('description', config.description);
  
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords.join(', '));
  }

  // Open Graph tags
  updateMetaTag('og:title', config.title, 'property');
  updateMetaTag('og:description', config.description, 'property');
  updateMetaTag('og:type', config.type || 'website', 'property');
  
  if (config.image) {
    updateMetaTag('og:image', config.image, 'property');
  }
  
  if (config.url) {
    updateMetaTag('og:url', config.url, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  
  if (config.image) {
    updateMetaTag('twitter:image', config.image);
  }

  // Canonical URL
  if (config.canonical) {
    updateCanonicalLink(config.canonical);
  }
}

/**
 * Update a single meta tag
 */
function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${type}="${name}"]`) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(type, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

/**
 * Update canonical link
 */
function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  
  link.href = url;
}

/**
 * Add JSON-LD structured data
 */
export function addStructuredData(data: any) {
  if (typeof window === "undefined") return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Generate organization structured data
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fair Deal',
    url: window.location.origin,
    description: 'Quality services and products by Arif Najar.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+91-9906515680',
    }
  };
}

/**
 * Default SEO configurations for each page
 */
export const defaultSEOConfigs = {
  home: {
    title: 'Fair Deal | Quality Services by Arif Najar',
    description: 'Welcome to Fair Deal, run by Arif Najar. We provide top-quality services and products with a commitment to excellence and integrity.',
    keywords: ['Fair Deal', 'Arif Najar', 'Quality Services', 'Reliable Business'],
    type: 'website' as const
  },
  about: {
    title: 'About Us | Fair Deal',
    description: 'Learn about the story and values of Fair Deal, a business built on integrity and excellence by Arif Najar.',
    keywords: ['About Fair Deal', 'Arif Najar Story', 'Business Values'],
    type: 'website' as const
  },
  contact: {
    title: 'Contact Us | Fair Deal',
    description: 'Get in touch with Fair Deal. Find our location, business hours, and contact information.',
    keywords: ['Contact Fair Deal', 'Arif Najar Contact', 'Business Location'],
    type: 'website' as const
  }
};
