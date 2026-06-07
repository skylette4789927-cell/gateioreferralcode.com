import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Disclaimer from '@/components/Disclaimer';
import {Link} from '@/i18n/routing';
import type {CountryId} from '@/lib/countries';
import {getCountryById, getCountryPageSlug, getOffer} from '@/lib/countries';
import {getExchanges} from '@/lib/exchanges';

export const runtime = 'edge';

function parsePair(pair: string): {a: CountryId; b: CountryId} | null {
  const parts = pair.split('-vs-');
  if (parts.length !== 2) return null;
  return {a: parts[0] as CountryId, b: parts[1] as CountryId};
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; pair: string}>;
}): Promise<Metadata> {
  const {locale, pair} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const path = `country-comparison/${pair}`;
  const t = await getTranslations({locale, namespace: 'CountryComparison'});

  const parsed = parsePair(pair);
  if (!parsed) return {title: 'Not found'};

  const a = getCountryById(parsed.a);
  const b = getCountryById(parsed.b);
  if (!a || !b) return {title: 'Not found'};

  const title = t('meta_title', {a: a.name, b: b.name});
  const description = t('meta_description', {a: a.name, b: b.name});

  return {
    title,
    description,
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
      title,
      description,
      url: `${baseUrl}/${locale}/${path}`,
      siteName: 'Exchange Bonus Code',
      type: 'article',
      locale
    }
  };
}

function statusBadgeClass(status: string) {
  if (status === 'available') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200';
  if (status === 'limited') return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
}

export default async function Page({params}: {params: Promise<{locale: string; pair: string}>}) {
  const {pair, locale} = await params;
  const parsed = parsePair(pair);
  if (!parsed) notFound();

  const a = getCountryById(parsed.a);
  const b = getCountryById(parsed.b);
  if (!a || !b) notFound();

  const t = await getTranslations({locale, namespace: 'CountryComparison'});
  const countryT = await getTranslations({locale, namespace: 'Countries'});

  const exchanges = getExchanges();
  const rows = exchanges.map((ex) => {
    const offerA = getOffer(a.id, ex.id);
    const offerB = getOffer(b.id, ex.id);
    return {
      exchangeId: ex.id,
      exchangeName: ex.name,
      aStatus: offerA?.status ?? 'not-available',
      bStatus: offerB?.status ?? 'not-available',
      aNote: offerA?.restrictionNote ?? '',
      bNote: offerB?.restrictionNote ?? ''
    };
  });
  const statusLabel = (status: string) => {
    if (status === 'available') return t('status.available');
    if (status === 'limited') return t('status.limited');
    return t('status.not_available');
  };

  const score = (countryId: CountryId) =>
    exchanges.reduce((acc, ex) => {
      const offer = getOffer(countryId, ex.id);
      if (!offer) return acc;
      if (offer.status === 'available') return acc + 2;
      if (offer.status === 'limited') return acc + 1;
      return acc;
    }, 0);

  const aScore = score(a.id);
  const bScore = score(b.id);
  const winner = aScore === bScore ? null : aScore > bScore ? a : b;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{t('title', {a: a.name, b: b.name})}</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">{t('subtitle')}</p>
          <div className="mt-6">
            <Disclaimer />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${getCountryPageSlug(a.id)}`}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition"
            >
              {countryT('view_guide')} · {a.name}
            </Link>
            <Link
              href={`/${getCountryPageSlug(b.id)}`}
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800"
            >
              {countryT('view_guide')} · {b.name}
            </Link>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <table className="min-w-[800px] w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3 font-semibold">{t('col.exchange')}</th>
                  <th className="px-4 py-3 font-semibold">
                    {a.flag} {a.name}
                  </th>
                  <th className="px-4 py-3 font-semibold">
                    {b.flag} {b.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.exchangeId} className="border-t border-gray-100 dark:border-gray-800">
                    <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">{r.exchangeName}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(r.aStatus)}`}>
                        {statusLabel(r.aStatus)}
                      </span>
                      {r.aNote ? <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{r.aNote}</div> : null}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadgeClass(r.bStatus)}`}>
                        {statusLabel(r.bStatus)}
                      </span>
                      {r.bNote ? <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{r.bNote}</div> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('conclusion_title')}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              {winner ? t('conclusion_winner', {winner: winner.name}) : t('conclusion_tie')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
