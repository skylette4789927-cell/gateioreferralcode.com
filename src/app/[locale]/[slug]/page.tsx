import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import CountryDetailPage from '@/components/CountryDetailPage';
import {getCountryById, getCountryIdFromPageSlug} from '@/lib/countries';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale, slug} = await params;
  const baseUrl = 'https://exchangebonuscode.com';
  const t = await getTranslations({locale, namespace: 'CountryDetail'});

  const countryId = getCountryIdFromPageSlug(slug);
  if (!countryId) {
    return {
      title: 'Not found'
    };
  }

  const country = getCountryById(countryId);
  if (!country) {
    return {
      title: 'Not found'
    };
  }

  const path = slug;
  const title = t('meta_title', {country: country.name});
  const description = t('meta_description', {country: country.name});

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

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  const countryId = getCountryIdFromPageSlug(slug);
  if (!countryId) notFound();

  return <CountryDetailPage countryId={countryId} />;
}

