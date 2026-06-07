import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import CountriesBrowser from '@/components/CountriesBrowser';
import {getCountries, getCountryPageSlug} from '@/lib/countries';
import {getExchanges} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'countries';
  const t = await getTranslations({locale, namespace: 'Countries'});

  return {
    title: t('hub_meta_title'),
    description: t('hub_meta_description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/${path}`,
      languages: {
        en: `${baseUrl}/en/${path}`,
        vi: `${baseUrl}/vi/${path}`,
        es: `${baseUrl}/es/${path}`,
        pt: `${baseUrl}/pt/${path}`,
        tr: `${baseUrl}/tr/${path}`,
        id: `${baseUrl}/id/${path}`,
        ru: `${baseUrl}/ru/${path}`,
        zh: `${baseUrl}/zh/${path}`
      }
    },
    openGraph: {
      title: t('hub_meta_title'),
      description: t('hub_meta_description'),
      url: `${baseUrl}/${locale}/${path}`,
      siteName: 'Exchange Bonus Code',
      type: 'website',
      locale
    }
  };
}

export default function CountriesPage() {
  const t = useTranslations('Countries');
  const exchanges = getExchanges();
  const exchangeNameById = new Map(exchanges.map((e) => [e.id, e.name] as const));
  const countries = getCountries();
  const models = countries.map((c) => ({
    id: c.id,
    name: c.name,
    flag: c.flag,
    region: c.region,
    kycRequired: c.kycRequired,
    depositMethods: c.depositMethods,
    supports: c.supports,
    tags: c.tags,
    featuredExchanges: c.featuredExchangeIds.map((id) => exchangeNameById.get(id) ?? id),
    updatedAt: c.updatedAt,
    detailHref: `/${getCountryPageSlug(c.id)}`,
    checkerHref: `/country-availability-checker?country=${c.id}`
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('hub_title')}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{t('hub_subtitle')}</p>
          <div className="mt-6">
            <Disclaimer />
          </div>
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('popular_comparisons_title')}</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('popular_comparisons_subtitle')}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/country-comparison/vietnam-vs-uae"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Vietnam vs UAE
              </Link>
              <Link
                href="/country-comparison/australia-vs-singapore"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Australia vs Singapore
              </Link>
              <Link
                href="/country-comparison/brazil-vs-philippines"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Brazil vs Philippines
              </Link>
            </div>
          </div>
          <CountriesBrowser countries={models} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
