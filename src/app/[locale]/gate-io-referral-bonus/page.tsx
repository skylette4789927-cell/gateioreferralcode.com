import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import BonusTable from '@/components/BonusTable';
import ReferralCard from '@/components/ReferralCard';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ReferralBonus'});
  const baseUrl = 'https://gateioreferralcode.com';
  const path = 'gate-io-referral-bonus';

  return {
    title: t('title'),
    description: t('description'),
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
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/${path}`,
      siteName: 'Gate.io Referral Code Hub',
      type: 'article',
      locale: locale,
    },
  };
}

import Footer from '@/components/Footer';

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ReferralBonus'});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">{t('title')}</h1>
        <p className="text-center text-xl mb-12 max-w-2xl mx-auto">{t('description')}</p>
        <ReferralCard />
        <div className="mt-12">
           <BonusTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}