import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'guides';
  const t = await getTranslations({locale, namespace: 'Guides'});

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

export default function GuidesPage() {
  const t = useTranslations('Guides');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title')}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>

          <div className="mt-8 grid gap-6">
            <Link
              href="/guides/how-to-use-a-crypto-referral-code"
              className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="text-lg font-bold">{t('guide1.title')}</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {t('guide1.desc')}
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
