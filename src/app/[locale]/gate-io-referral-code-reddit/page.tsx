import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import ReferralCard from '@/components/ReferralCard';
export const runtime = 'edge'
export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'ReferralReddit'});
  const baseUrl = 'https://gateioreferralcode.com';
  const path = 'gate-io-referral-code-reddit';

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
  const t = await getTranslations({locale, namespace: 'ReferralReddit'});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('title')}</h1>
        <ReferralCard />
        
        <div className="max-w-2xl mx-auto mt-12 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <span className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center text-white text-xs">u/</span>
              {t('user_a')}
            </div>
            <p className="text-gray-700 dark:text-gray-300">"{t('review_a')}"</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
             <div className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <span className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center text-white text-xs">u/</span>
              {t('user_b')}
            </div>
            <p className="text-gray-700 dark:text-gray-300">"{t('review_b')}"</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}