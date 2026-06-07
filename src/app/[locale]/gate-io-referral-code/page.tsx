import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExchangeDetail from '@/components/ExchangeDetail';
import {getExchangeById} from '@/lib/exchanges';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'gate-io-referral-code';
  const exchange = getExchangeById('gate-io');
  const t = await getTranslations({locale, namespace: 'ExchangeDetail'});
  const name = exchange?.name ?? 'Gate.io';

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

export default function GateIoReferralCodePage() {
  const exchange = getExchangeById('gate-io');

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
