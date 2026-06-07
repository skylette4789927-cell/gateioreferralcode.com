import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';

export const runtime = 'edge';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = 'calculators';
  const t = await getTranslations({locale, namespace: 'Calculators'});

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

export default function CalculatorsPage() {
  const t = useTranslations('Calculators');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title')}</h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/bonus-value-calculator"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  {t('cta_bonus')}
                </Link>
                <Link
                  href="/referral-code-checker"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {t('cta_checker')}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">{t('preview.title')}</div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t('preview.savings_label')}</div>
                  <div className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{t('preview.savings_value')}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t('preview.best_label')}</div>
                  <div className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{t('preview.best_value')}</div>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">{t('preview.status_label')}</div>
                  <div className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{t('preview.status_value')}</div>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('preview.note')}</div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('main_tools.title')}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('main_tools.subtitle')}</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Link
                href="/bonus-value-calculator"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{t('bonus_value.title')}</div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('bonus_value.desc')}</div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                    {t('badge.highest')}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('bonus_value.inputs')}</div>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800 dark:text-blue-300 dark:group-hover:text-blue-200">
                  {t('bonus_value.cta')}
                </div>
              </Link>

              <Link
                href="/referral-code-checker"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{t('checker.title')}</div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('checker.desc')}</div>
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                    {t('badge.highest')}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('checker.inputs')}</div>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800 dark:text-blue-300 dark:group-hover:text-blue-200">
                  {t('checker.cta')}
                </div>
              </Link>

              <Link
                href="/trading-fee-savings-calculator"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{t('fee_savings.title')}</div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('fee_savings.desc')}</div>
                  </div>
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {t('badge.high')}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('fee_savings.inputs')}</div>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800 dark:text-blue-300 dark:group-hover:text-blue-200">
                  {t('fee_savings.cta')}
                </div>
              </Link>

              <Link
                href="/country-availability-checker"
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{t('country_checker.title')}</div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('country_checker.desc')}</div>
                  </div>
                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                    {t('badge.high')}
                  </span>
                </div>
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('country_checker.inputs')}</div>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800 dark:text-blue-300 dark:group-hover:text-blue-200">
                  {t('country_checker.cta')}
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('coming.title')}</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('coming.subtitle')}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(['requirement', 'finder', 'checklist', 'tracker'] as const).map((id) => (
                <div
                  key={id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t(`coming.${id}.title`)}</div>
                    <span className="rounded-full bg-gray-200 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                      {t('badge.soon')}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{t(`coming.${id}.desc`)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
