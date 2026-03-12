import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getAllPosts} from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gateioreferralcode.com';
  const locales = routing.locales;
  
  const staticRoutes = [
    '',
    '/gate-io-invitation-code',
    '/gate-io-referral-bonus',
    '/gate-io-referral-id',
    '/gate-io-referral-code-reddit',
    '/blog'
  ];

  // Get all blog posts from default locale to determine available slugs
  // We assume slugs are consistent across languages
  const posts = getAllPosts('en');
  const blogRoutes = posts.map(post => `/blog/${post.slug}`);

  const allRoutes = [...staticRoutes, ...blogRoutes];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  allRoutes.forEach(route => {
    locales.forEach(locale => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8
      });
    });
  });

  return sitemapEntries;
}
