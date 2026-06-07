import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompareTool from '@/components/CompareTool';
import Disclaimer from '@/components/Disclaimer';
import type {ExchangeId} from '@/lib/exchanges';
import {getExchangeDetailHref, getExchanges} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'compare';
  const t = await getTranslations({locale, namespace: 'Compare'});

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

export default function ComparePage() {
  const t = useTranslations('Compare');
  const exchanges = getExchanges();
  const detailHrefById = exchanges.reduce((acc, ex) => {
    acc[ex.id] = getExchangeDetailHref(ex.id);
    return acc;
  }, {} as Record<ExchangeId, string>);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
          <div className="mt-6">
            <Disclaimer />
          </div>

          <div className="mt-8">
            <CompareTool exchanges={exchanges} detailHrefById={detailHrefById} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
