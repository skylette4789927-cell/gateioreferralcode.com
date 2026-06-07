'use client';

import {useEffect, useMemo, useState} from 'react';
import type {CountryId, UserType} from '@/lib/countries';
import {checkCountryAvailability, getCountries} from '@/lib/countries';
import type {ExchangeId, TradeType} from '@/lib/exchanges';
import {getExchanges} from '@/lib/exchanges';
import {readJson, writeJson} from '@/lib/localStorage';
import {useSearchParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

type HistoryItem = {
  countryId: CountryId;
  exchangeId: ExchangeId;
  userType: UserType;
  tradeType: TradeType;
  ts: number;
};

const HISTORY_KEY = 'exchangebonuscode:country-checker-history';

function badgeClass(status: 'available' | 'limited' | 'not-available') {
  if (status === 'available') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200';
  if (status === 'limited') return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
  return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
}

export default function CountryAvailabilityChecker() {
  const t = useTranslations('AvailabilityChecker');
  const countryT = useTranslations('Countries');
  const exchangeT = useTranslations('Exchange');
  const commonT = useTranslations('Common');
  const params = useSearchParams();

  const countries = useMemo(() => getCountries(), []);
  const exchanges = useMemo(() => getExchanges(), []);

  const initialCountry = (params.get('country') as CountryId | null) ?? countries[0]?.id ?? 'vietnam';
  const [countryId, setCountryId] = useState<CountryId>(initialCountry);
  const [exchangeId, setExchangeId] = useState<ExchangeId>(exchanges[0]?.id ?? 'gate-io');
  const [userType, setUserType] = useState<UserType>('new');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(readJson<HistoryItem[]>(HISTORY_KEY, []));
  }, []);

  useEffect(() => {
    const qCountry = params.get('country') as CountryId | null;
    if (qCountry && countries.some((c) => c.id === qCountry)) setCountryId(qCountry);
  }, [countries, params]);

  const result = useMemo(() => {
    return checkCountryAvailability({countryId, exchangeId, userType, tradeType});
  }, [countryId, exchangeId, tradeType, userType]);

  const selectedCountry = useMemo(() => countries.find((c) => c.id === countryId) ?? countries[0], [countries, countryId]);
  const selectedExchange = useMemo(() => exchanges.find((e) => e.id === exchangeId) ?? exchanges[0], [exchangeId, exchanges]);

  const alternativeExchanges = useMemo(() => {
    const rank: Record<'available' | 'limited' | 'not-available', number> = {available: 0, limited: 1, 'not-available': 2};
    const alts = exchanges
      .map((e) => {
        const r = checkCountryAvailability({countryId, exchangeId: e.id, userType, tradeType});
        return {exchangeId: e.id, name: e.name, status: r.status};
      })
      .filter((x) => x.exchangeId !== exchangeId)
      .sort((a, b) => rank[a.status] - rank[b.status])
      .slice(0, 3);
    return alts;
  }, [countryId, exchangeId, exchanges, tradeType, userType]);

  const saveHistory = () => {
    const item: HistoryItem = {countryId, exchangeId, userType, tradeType, ts: Date.now()};
    const next = [
      item,
      ...history.filter(
        (h) =>
          !(
            h.countryId === item.countryId &&
            h.exchangeId === item.exchangeId &&
            h.userType === item.userType &&
            h.tradeType === item.tradeType
          )
      )
    ].slice(0, 8);
    setHistory(next);
    writeJson(HISTORY_KEY, next);
  };

  const statusLabel = () => {
    if (result.status === 'available') return t('status.available');
    if (result.status === 'limited') return t('status.limited');
    return t('status.not_available');
  };

  const tag = (label: string, kind: 'blue' | 'yellow' | 'green') => {
    const cls =
      kind === 'green'
        ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200'
        : kind === 'yellow'
          ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
          : 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200';
    return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>{label}</span>;
  };

  return (
    <div className="mt-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('inputs')}</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t('country')}
              <select
                value={countryId}
                onChange={(e) => setCountryId(e.target.value as CountryId)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t('exchange')}
              <select
                value={exchangeId}
                onChange={(e) => setExchangeId(e.target.value as ExchangeId)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              >
                {exchanges.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t('user_type')}
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              >
                <option value="new">{t('user_type_new')}</option>
                <option value="existing">{t('user_type_existing')}</option>
              </select>
            </label>

            <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {t('trade_type')}
              <select
                value={tradeType}
                onChange={(e) => setTradeType(e.target.value as TradeType)}
                className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              >
                <option value="spot">{t('trade_type_spot')}</option>
                <option value="futures">{t('trade_type_futures')}</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={saveHistory}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              {t('cta_check')}
            </button>
            <Link
              href={`/crypto-exchange-bonus-${countryId}`}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {countryT('view_guide')}
            </Link>
          </div>

          {history.length > 0 ? (
            <div className="mt-6">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('history')}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {history.map((h) => {
                  const c = countries.find((x) => x.id === h.countryId);
                  const e = exchanges.find((x) => x.id === h.exchangeId);
                  return (
                    <button
                      key={h.ts}
                      type="button"
                      onClick={() => {
                        setCountryId(h.countryId);
                        setExchangeId(h.exchangeId);
                        setUserType(h.userType);
                        setTradeType(h.tradeType);
                      }}
                      className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      {(c?.flag ?? '') + ' '}
                      {c?.name ?? h.countryId} · {e?.name ?? h.exchangeId} · {h.userType === 'new' ? t('user_type_new') : t('user_type_existing')} ·{' '}
                      {h.tradeType === 'spot' ? t('trade_type_spot') : t('trade_type_futures')}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('output')}</h2>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {selectedCountry?.name} · {selectedExchange?.name}
              </div>
            </div>
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(result.status)}`}>{statusLabel()}</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tag(t('tag_verified'), 'green')}
            {result.status === 'limited' ? tag(t('tag_region_dependent'), 'yellow') : null}
            {result.kycRequired ? tag(t('tag_kyc_needed'), 'blue') : null}
          </div>

          <div className="mt-6 grid gap-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('bonus_types')}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {result.bonusTypes.length === 0 ? (
                  <span className="text-sm text-gray-600 dark:text-gray-300">{t('no_bonus')}</span>
                ) : (
                  result.bonusTypes.map((bt) => (
                    <span
                      key={bt}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                    >
                      {bt === 'fee-discount' ? exchangeT('bonus_type.fee_discount') : exchangeT(`bonus_type.${bt}`)}
                    </span>
                  ))
                )}
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {t('updated')}: {result.updatedAt}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('deposit_methods')}</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {result.depositMethods.map((m) => countryT(`deposit_method.${m}`)).join(', ')}
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{result.note}</div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('alternatives')}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {alternativeExchanges.map((a) => (
                  <button
                    key={a.exchangeId}
                    type="button"
                    onClick={() => setExchangeId(a.exchangeId)}
                    className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    {a.name} · {a.status === 'available' ? t('status.available') : a.status === 'limited' ? t('status.limited') : t('status.not_available')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {t('disclaimer')}
          </div>

          <div className="mt-5 text-xs text-gray-500 dark:text-gray-400">
            {commonT('updated')}: {result.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
}
