import { useEffect } from 'react';
import { updateMetaTags, addStructuredData, SEOConfig } from '@/lib/seo';

/**
 * Hook to manage SEO meta tags and structured data for a page
 */
export function useSEO(config: SEOConfig, structuredData?: any) {
  useEffect(() => {
    // Update meta tags
    updateMetaTags(config);

    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Scroll to top on page change
    window.scrollTo(0, 0);
  }, [config, structuredData]);
}
