import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import ExchangeCard from '@/components/ExchangeCard';
import HomeQuickCalculator from '@/components/HomeQuickCalculator';
import HomeBonusFinder from '@/components/HomeBonusFinder';
import HomeRecentAndFavorites from '@/components/HomeRecentAndFavorites';
import CompareTool from '@/components/CompareTool';
import ExchangeSortableTable from '@/components/ExchangeSortableTable';
import FAQList from '@/components/FAQList';
import {Link} from '@/i18n/routing';
import {getExchangeDetailHref, getExchanges, type ExchangeId} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';
export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
 
  const t = await getTranslations({locale, namespace: 'Index'});

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`, 
      languages: {
        en: `${baseUrl}/en`,
        vi: `${baseUrl}/vi`,
        es: `${baseUrl}/es`,
        pt: `${baseUrl}/pt`,
        tr: `${baseUrl}/tr`,
        id: `${baseUrl}/id`,
        ru: `${baseUrl}/ru`,
        zh: `${baseUrl}/zh`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Exchange Bonus Code',
      type: 'website',
      locale: locale,
    },
  };
}

export default function Home() {
  const t = useTranslations('Home');
  const exchanges = getExchanges();

  const detailHrefById = exchanges.reduce(
    (acc, ex) => {
      acc[ex.id] = getExchangeDetailHref(ex.id);
      return acc;
    },
    {} as Record<ExchangeId, string>
  );

  const faqs = [
    {
      q: t('faq.q1'),
      a: t('faq.a1')
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2')
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3')
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden py-14">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-transparent to-transparent dark:from-blue-950/40" />
          <div className="container relative mx-auto px-4 max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  {t('hero.title')}
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('hero.subtitle')}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                    {t('hero.tag_signup')}
                  </span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-200">
                    {t('hero.tag_trading')}
                  </span>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-200">
                    {t('hero.tag_fee')}
                  </span>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/compare"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition"
                  >
                    {t('hero.cta_compare')}
                  </Link>
                  <Link
                    href="/best-crypto-exchange-bonus"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {t('hero.cta_best')}
                  </Link>
                  <Link
                    href="/bonus-value-calculator"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {t('hero.cta_calc')}
                  </Link>
                </div>

                <div className="mt-6">
                  <Disclaimer />
                </div>
              </div>

              <div className="grid gap-6">
                <HomeQuickCalculator exchanges={exchanges} detailHrefById={detailHrefById} />
                <HomeBonusFinder exchanges={exchanges} detailHrefById={detailHrefById} />
              </div>
            </div>
          </div>
        </section>

        <HomeRecentAndFavorites exchanges={exchanges} detailHrefById={detailHrefById} />

        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('featured.title')}</h2>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible lg:grid-cols-3">
              {exchanges.map((ex) => (
                <div key={ex.id} className="min-w-[280px] md:min-w-0">
                  <ExchangeCard exchange={ex} href={detailHrefById[ex.id]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl space-y-6">
            <ExchangeSortableTable exchanges={exchanges} detailHrefById={detailHrefById} />
            <CompareTool exchanges={exchanges} detailHrefById={detailHrefById} />
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('countries.title')}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{t('countries.subtitle')}</p>
              </div>
              <Link href="/countries" className="text-sm font-semibold text-blue-600 hover:underline">
                {t('countries.view_all')} →
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                {label: 'Vietnam', href: '/crypto-exchange-bonus-vietnam'},
                {label: 'UAE', href: '/crypto-exchange-bonus-uae'},
                {label: 'Australia', href: '/crypto-exchange-bonus-australia'},
                {label: 'Singapore', href: '/crypto-exchange-bonus-singapore'},
                {label: 'Taiwan', href: '/crypto-exchange-bonus-taiwan'}
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{t('updates.title')}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{t('updates.subtitle')}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                {title: t('updates.item1_title'), desc: t('updates.item1_desc')},
                {title: t('updates.item2_title'), desc: t('updates.item2_desc')},
                {title: t('updates.item3_title'), desc: t('updates.item3_desc')}
              ].map((x) => (
                <div
                  key={x.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{x.title}</div>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{x.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQList title={t('faq_title')} faqs={faqs} />
      </main>
      <Footer />
    </div>
  );
}
