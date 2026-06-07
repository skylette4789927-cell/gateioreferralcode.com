import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExchangeDetail from '@/components/ExchangeDetail';
import {getExchangeById, type ExchangeId} from '@/lib/exchanges';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string; id: string}>}) {
  const {locale, id} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = `exchange/${id}`;
  const exchange = getExchangeById(id);
  const t = await getTranslations({locale, namespace: 'ExchangeDetail'});
  const name = exchange?.name ?? id;

  return {
    title: t('title', {name}),
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
      title: t('title', {name}),
      description: t('subtitle'),
      url: `${baseUrl}/${locale}/${path}`,
      siteName: 'Exchange Bonus Code',
      type: 'article',
      locale
    }
  };
}

export default async function Page({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const exchange = getExchangeById(id as ExchangeId);

  if (!exchange) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <ExchangeDetail exchange={exchange} />
      </main>
      <Footer />
    </div>
  );
}
