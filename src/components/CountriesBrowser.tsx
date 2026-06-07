'use client';

import {useEffect, useMemo, useState} from 'react';
import type {CountryCardModel} from '@/components/CountryCard';
import CountryCard from '@/components/CountryCard';
import type {CountryId, DepositMethod, Region} from '@/lib/countries';
import {readJson, writeJson} from '@/lib/localStorage';
import {useTranslations} from 'next-intl';

const FAVORITES_STORAGE_KEY = 'exchangebonuscode:country-favorites';
const FAVORITES_EVENT = 'exchangebonuscode:country-favorites';
const RECENTS_STORAGE_KEY = 'exchangebonuscode:recent-countries';

type KycFilter = 'all' | 'yes' | 'no';
type TradeTypeFilter = 'all' | 'spot' | 'futures';
type DepositFilter = 'all' | DepositMethod;

function readCountryIds(key: string): CountryId[] {
  return readJson<CountryId[]>(key, []);
}

function writeCountryIds(key: string, value: CountryId[]) {
  writeJson(key, value);
}

export default function CountriesBrowser({countries}: {countries: CountryCardModel[]}) {
  const t = useTranslations('Countries');
  const [query, setQuery] = useState<string>('');
  const [region, setRegion] = useState<Region | 'all'>('all');
  const [kyc, setKyc] = useState<KycFilter>('all');
  const [tradeType, setTradeType] = useState<TradeTypeFilter>('all');
  const [depositMethod, setDepositMethod] = useState<DepositFilter>('all');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<CountryId[]>([]);
  const [recents, setRecents] = useState<CountryId[]>([]);

  useEffect(() => {
    const refresh = () => {
      setFavorites(readCountryIds(FAVORITES_STORAGE_KEY));
      setRecents(readCountryIds(RECENTS_STORAGE_KEY));
    };

    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener(FAVORITES_EVENT, refresh as EventListener);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener(FAVORITES_EVENT, refresh as EventListener);
    };
  }, []);

  const regions = useMemo(() => {
    const uniq = new Set<Region>();
    for (const c of countries) uniq.add(c.region);
    return Array.from(uniq);
  }, [countries]);

  const recentCountries = useMemo(() => {
    const map = new Map<CountryId, CountryCardModel>();
    for (const c of countries) map.set(c.id, c);
    return recents.map((id) => map.get(id)).filter(Boolean) as CountryCardModel[];
  }, [countries, recents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return countries.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (favoritesOnly && !favorites.includes(c.id)) return false;
      if (region !== 'all' && c.region !== region) return false;
      if (kyc !== 'all') {
        const want = kyc === 'yes';
        if (c.kycRequired !== want) return false;
      }
      if (tradeType !== 'all') {
        if (tradeType === 'spot' && !c.supports.spot) return false;
        if (tradeType === 'futures' && !c.supports.futures) return false;
      }
      if (depositMethod !== 'all' && !c.depositMethods.includes(depositMethod)) return false;
      return true;
    });
  }, [countries, depositMethod, favorites, favoritesOnly, kyc, query, region, tradeType]);

  const onViewed = (countryId: CountryId) => {
    setRecents((prev) => {
      const next = [countryId, ...prev.filter((id) => id !== countryId)].slice(0, 8);
      writeCountryIds(RECENTS_STORAGE_KEY, next);
      return next;
    });
  };

  const clearFilters = () => {
    setQuery('');
    setRegion('all');
    setKyc('all');
    setTradeType('all');
    setDepositMethod('all');
    setFavoritesOnly(false);
  };

  const cards = filtered.map((c) => ({...c, onViewed}));

  return (
    <div>
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="grid gap-4 lg:grid-cols-6">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 lg:col-span-2">
            {t('search_label')}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            />
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_region')}
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region | 'all')}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {t(`region.${r}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_kyc')}
            <select
              value={kyc}
              onChange={(e) => setKyc(e.target.value as KycFilter)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              <option value="yes">{t('kyc_yes')}</option>
              <option value="no">{t('kyc_no')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_trade_type')}
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as TradeTypeFilter)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              <option value="spot">{t('trade_type_spot')}</option>
              <option value="futures">{t('trade_type_futures')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_deposit_method')}
            <select
              value={depositMethod}
              onChange={(e) => setDepositMethod(e.target.value as DepositFilter)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              <option value="bank-transfer">{t('deposit_method.bank-transfer')}</option>
              <option value="card">{t('deposit_method.card')}</option>
              <option value="p2p">{t('deposit_method.p2p')}</option>
              <option value="e-wallet">{t('deposit_method.e-wallet')}</option>
              <option value="crypto">{t('deposit_method.crypto')}</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFavoritesOnly((v) => !v)}
            className={
              favoritesOnly
                ? 'rounded-full bg-yellow-500 px-3 py-2 text-xs font-semibold text-gray-900'
                : 'rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800'
            }
          >
            {t('favorites_only')}
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t('clear_filters')}
          </button>
          <div className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            {t('results_count', {count: filtered.length})}
          </div>
        </div>
      </div>

      {recentCountries.length > 0 ? (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('recently_viewed')}</h2>
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
            {recentCountries.map((c) => (
              <div key={c.id} className="min-w-[280px] md:min-w-0">
                <CountryCard country={{...c, onViewed}} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.id} className="min-w-[280px] md:min-w-0">
            <CountryCard country={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
