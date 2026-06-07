import {MetadataRoute} from 'next';
import {routing} from '@/i18n/routing';
import {getAllPosts} from '@/lib/blog';
import {getAllCountryPageSlugs} from '@/lib/countries';
import {getExchanges} from '@/lib/exchanges';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://exchangebonuscode.com';
  const locales = routing.locales;
  
  const staticRoutes = [
    '',
    '/bonus-codes',
    '/compare',
    '/calculators',
    '/countries',
    '/country-availability-checker',
    '/trading-fee-savings-calculator',
    '/country-comparison/vietnam-vs-uae',
    '/country-comparison/australia-vs-singapore',
    '/country-comparison/brazil-vs-philippines',
    '/guides',
    '/guides/how-to-use-a-crypto-referral-code',
    '/bonus-value-calculator',
    '/referral-code-checker',
    '/best-crypto-exchange-bonus',
    '/gate-io-referral-code',
    '/okx-referral-code',
    '/binance-referral-code',
    '/gate-io-invitation-code',
    '/gate-io-referral-bonus',
    '/gate-io-referral-id',
    '/gate-io-referral-code-reddit',
    '/blog'
  ];
  const posts = getAllPosts('en');
  const blogRoutes = posts.map(post => `/blog/${post.slug}`);
  const countryRoutes = getAllCountryPageSlugs().map((slug) => `/${slug}`);
  const exchangeRoutes = getExchanges().map((ex) => `/exchange/${ex.id}`);

  const allRoutes = [...staticRoutes, ...countryRoutes, ...exchangeRoutes, ...blogRoutes];

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
