import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import ExchangeComparisonTable from '@/components/ExchangeComparisonTable';
import {getExchanges} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'best-crypto-exchange-bonus';

  const t = await getTranslations({locale, namespace: 'Best'});

  return {
    title: t('title'),
    description: t('subtitle'),
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
      title: t('title'),
      description: t('subtitle'),
      url: `${baseUrl}/${locale}/${path}`,
      siteName: 'Exchange Bonus Code',
      type: 'website',
      locale
    }
  };
}

const detailHrefById: Record<string, string> = {
  'gate-io': '/gate-io-referral-code',
  okx: '/okx-referral-code',
  binance: '/binance-referral-code'
};

export default function BestCryptoExchangeBonusPage() {
  const t = useTranslations('Best');
  const e = useTranslations('Exchange');
  const exchanges = getExchanges();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
          <div className="mt-6">
            <Disclaimer />
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('quick_comparison')}</h2>
            <div className="mt-4">
              <ExchangeComparisonTable exchanges={exchanges} detailHrefById={detailHrefById} />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {exchanges.map((ex) => (
              <div
                key={ex.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="text-lg font-bold text-gray-900 dark:text-white">{ex.name}</div>
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
                  {t('best_for')}: {ex.bestFor.map((tag) => e(`best_for_tag.${tag}`)).join(', ')}
                </div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('risk_note')}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
