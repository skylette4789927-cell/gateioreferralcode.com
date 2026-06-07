'use client';

import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import CountryFavoriteButton from '@/components/CountryFavoriteButton';
import type {CountryId, DepositMethod, Region} from '@/lib/countries';

export type CountryCardModel = {
  id: CountryId;
  name: string;
  flag: string;
  region: Region;
  kycRequired: boolean;
  depositMethods: DepositMethod[];
  supports: {spot: boolean; futures: boolean};
  tags: {
    highBonusPotential: boolean;
    easyDeposit: boolean;
    kycRequired: boolean;
  };
  featuredExchanges: string[];
  updatedAt: string;
  detailHref: string;
  checkerHref: string;
  onViewed?: (countryId: CountryId) => void;
};

function badgeClass(kind: 'high' | 'deposit' | 'kyc') {
  if (kind === 'high') return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200';
  if (kind === 'deposit') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200';
  return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200';
}

export default function CountryCard({country}: {country: CountryCardModel}) {
  const t = useTranslations('Countries');

  const depositPreview = country.depositMethods.slice(0, 3).map((m) => t(`deposit_method.${m}`)).join(', ');
  const featuredPreview = country.featuredExchanges.slice(0, 2).join(', ');

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900">
      <Link
        href={country.detailHref}
        aria-label={t('open_country', {name: country.name})}
        onClick={() => country.onViewed?.(country.id)}
        className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-lg dark:bg-gray-800">
              {country.flag}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{country.name}</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t(`region.${country.region}`)}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {t('updated')}: {country.updatedAt}
            </div>
            <CountryFavoriteButton countryId={country.id} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {country.tags.highBonusPotential ? (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass('high')}`}>{t('tag_high_bonus')}</span>
          ) : null}
          {country.tags.easyDeposit ? (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass('deposit')}`}>{t('tag_easy_deposit')}</span>
          ) : null}
          {country.tags.kycRequired ? (
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass('kyc')}`}>{t('tag_kyc_required')}</span>
          ) : null}
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{t('recommended')}:</span> {featuredPreview}
          </div>
          <div className="mt-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{t('deposit_methods')}:</span> {depositPreview}
          </div>
          <div className="mt-1 hidden text-xs text-gray-500 group-hover:block dark:text-gray-400">
            {t('kyc')}: {country.kycRequired ? t('kyc_yes') : t('kyc_no')}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={country.detailHref}
            onClick={() => country.onViewed?.(country.id)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {t('view_guide')}
          </Link>
          <Link
            href={country.checkerHref}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t('check_availability')}
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-200/60 dark:group-hover:ring-blue-800/40 transition" />
    </div>
  );
}
