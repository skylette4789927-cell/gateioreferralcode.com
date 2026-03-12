import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ReferralCard from '@/components/ReferralCard';
import Steps from '@/components/Steps';
import BonusTable from '@/components/BonusTable';
import Intro from '@/components/Intro';
import ComparisonTable from '@/components/ComparisonTable';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Index'});
  const baseUrl = 'https://gateioreferralcode.com';
 
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
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}`,
      siteName: 'Gate.io Referral Code Hub',
      type: 'website',
      locale: locale,
    },
  };
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main>
        <Hero />
        <ReferralCard />
        <Steps />
        <BonusTable />
        <Intro />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}