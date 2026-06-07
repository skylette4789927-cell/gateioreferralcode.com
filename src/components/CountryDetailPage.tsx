import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import FAQList from '@/components/FAQList';
import CountryExchangeTable from '@/components/CountryExchangeTable';
import {Link} from '@/i18n/routing';
import {getCountryById, getOffersForCountry, type CountryId} from '@/lib/countries';
import {getExchangeDetailHref, getExchanges, type ExchangeId} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';

export default function CountryDetailPage({countryId}: {countryId: string}) {
  const t = useTranslations('CountryDetail');

  const country = getCountryById(countryId as CountryId);
  if (!country) return null;

  const exchanges = getExchanges();
  const exchangeNameById = exchanges.reduce(
    (acc, e) => {
      acc[e.id] = e.name;
      return acc;
    },
    {} as Record<ExchangeId, string>
  );
  const exchangeHrefById = exchanges.reduce(
    (acc, e) => {
      acc[e.id] = getExchangeDetailHref(e.id);
      return acc;
    },
    {} as Record<ExchangeId, string>
  );

  const offers = getOffersForCountry(country.id);

  const featuredExchangeNames = country.featuredExchangeIds.map((id) => exchangeNameById[id] ?? id).join(', ');
  const depositMethods = country.depositMethods.map((m) => t(`deposit_method.${m}`)).join(', ');
  const beginnerScore = country.tags.easyDeposit ? t('beginner_score.high') : t('beginner_score.medium');

  const faqs = [
    {q: t('faq.q1', {country: country.name}), a: t('faq.a1')},
    {q: t('faq.q2', {country: country.name}), a: t('faq.a2')},
    {q: t('faq.q3'), a: t('faq.a3')},
    {q: t('faq.q4'), a: t('faq.a4')}
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('updated')}: {country.updatedAt}
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title', {country: country.name})}</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">{t('subtitle', {country: country.name})}</p>
          </div>

          <div className="mt-6">
            <Disclaimer />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('summary.recommended')}</div>
              <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{featuredExchangeNames}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('summary.kyc')}</div>
              <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{country.kycRequired ? t('kyc_yes') : t('kyc_no')}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('summary.deposit')}</div>
              <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{depositMethods}</div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('summary.beginner')}</div>
              <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{beginnerScore}</div>
            </div>
          </div>

          <CountryExchangeTable offers={offers} exchangeNameById={exchangeNameById} exchangeHrefById={exchangeHrefById} />

          <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('steps_title')}</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-2">
              <li className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('step.1_label')}</div>
                <div className="mt-1 font-bold text-gray-900 dark:text-white">{t('step.1_title')}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('step.1_desc')}</div>
              </li>
              <li className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('step.2_label')}</div>
                <div className="mt-1 font-bold text-gray-900 dark:text-white">{t('step.2_title')}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('step.2_desc')}</div>
              </li>
              <li className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('step.3_label')}</div>
                <div className="mt-1 font-bold text-gray-900 dark:text-white">{t('step.3_title')}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('step.3_desc')}</div>
              </li>
              <li className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('step.4_label')}</div>
                <div className="mt-1 font-bold text-gray-900 dark:text-white">{t('step.4_title')}</div>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('step.4_desc')}</div>
              </li>
            </ol>
          </section>

          <div className="mt-12">
            <FAQList title={t('faq_title')} faqs={faqs} />
          </div>

          <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('risk_title')}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{country.riskNote}</p>
          </section>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
          <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row">
            <Link
              href={`/country-availability-checker?country=${country.id}`}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              {t('cta_check')}
            </Link>
            <Link
              href="/bonus-value-calculator"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('cta_calc')}
            </Link>
            <Link
              href="/countries"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('cta_back')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
