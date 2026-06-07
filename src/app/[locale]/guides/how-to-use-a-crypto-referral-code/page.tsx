import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import FAQList from '@/components/FAQList';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'guides/how-to-use-a-crypto-referral-code';
  const t = await getTranslations({locale, namespace: 'GuideReferralCode'});

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
      type: 'article',
      locale
    }
  };
}

export default function HowToUseReferralCodeGuide() {
  const t = useTranslations('GuideReferralCode');
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
    }
  ];

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

          <div className="mt-10 space-y-8">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('steps_title')}</h2>
              <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-200">
                <li>{t('step1')}</li>
                <li>{t('step2')}</li>
                <li>{t('step3')}</li>
                <li>{t('step4')}</li>
                <li>{t('step5')}</li>
              </ol>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('mistakes_title')}</h2>
              <ul className="mt-4 space-y-2 list-disc list-inside text-gray-700 dark:text-gray-200">
                <li>{t('mistake1')}</li>
                <li>{t('mistake2')}</li>
                <li>{t('mistake3')}</li>
                <li>{t('mistake4')}</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-10">
          <FAQList title={t('faq_title')} faqs={faqs} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
