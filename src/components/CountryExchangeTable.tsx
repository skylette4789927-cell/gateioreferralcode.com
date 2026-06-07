'use client';

import {useMemo, useState} from 'react';
import type {BonusType, ExchangeId, TradeType} from '@/lib/exchanges';
import type {AvailabilityStatus, CountryExchangeOffer, DepositMethod} from '@/lib/countries';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

type SortKey = 'status' | 'name';
type BonusFilter = 'all' | BonusType;

const statusRank: Record<AvailabilityStatus, number> = {
  available: 0,
  limited: 1,
  'not-available': 2
};

function formatDepositMethods(methods: DepositMethod[], t: ReturnType<typeof useTranslations>) {
  return methods.map((m) => t(`deposit_method.${m}`)).join(', ');
}

export default function CountryExchangeTable({
  offers,
  exchangeNameById,
  exchangeHrefById
}: {
  offers: CountryExchangeOffer[];
  exchangeNameById: Record<ExchangeId, string>;
  exchangeHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('CountryDetail');
  const exchangeT = useTranslations('Exchange');
  const [sortKey, setSortKey] = useState<SortKey>('status');
  const [tradeType, setTradeType] = useState<TradeType | 'all'>('all');
  const [bonusFilter, setBonusFilter] = useState<BonusFilter>('all');

  const filteredAndSorted = useMemo(() => {
    const filtered = offers.filter((o) => {
      if (tradeType !== 'all' && !o.supports[tradeType]) return false;
      if (bonusFilter !== 'all' && !o.bonusTypes.includes(bonusFilter)) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortKey === 'status') return statusRank[a.status] - statusRank[b.status];
      return (exchangeNameById[a.exchangeId] ?? a.exchangeId).localeCompare(exchangeNameById[b.exchangeId] ?? b.exchangeId);
    });
  }, [bonusFilter, exchangeNameById, offers, sortKey, tradeType]);

  const statusBadge = (status: AvailabilityStatus) => {
    if (status === 'available') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200';
    if (status === 'limited') return 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
  };

  const statusLabel = (status: AvailabilityStatus) => {
    if (status === 'available') return t('status.available');
    if (status === 'limited') return t('status.limited');
    return t('status.not_available');
  };

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('table_title')}</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('table_subtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_trade_type')}
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as TradeType | 'all')}
              className="mt-2 w-full min-w-[160px] rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              <option value="spot">{t('trade_type_spot')}</option>
              <option value="futures">{t('trade_type_futures')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filter_bonus_type')}
            <select
              value={bonusFilter}
              onChange={(e) => setBonusFilter(e.target.value as BonusFilter)}
              className="mt-2 w-full min-w-[180px] rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="all">{t('all')}</option>
              <option value="signup">{exchangeT('bonus_type.signup')}</option>
              <option value="trading">{exchangeT('bonus_type.trading')}</option>
              <option value="fee-discount">{exchangeT('bonus_type.fee_discount')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('sort')}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="mt-2 w-full min-w-[160px] rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="status">{t('sort_status')}</option>
              <option value="name">{t('sort_name')}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <table className="min-w-[900px] w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 font-semibold">{t('col.exchange')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.availability')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.bonus_type')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.fee_discount')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.kyc')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.deposit')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.best_for')}</th>
              <th className="px-4 py-3 font-semibold">{t('col.action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((o) => (
              <tr key={`${o.countryId}-${o.exchangeId}`} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-4 py-4 font-semibold text-gray-900 dark:text-white">
                  {exchangeNameById[o.exchangeId] ?? o.exchangeId}
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(o.status)}`}>
                    {statusLabel(o.status)}
                  </span>
                  {o.restrictionNote ? (
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{o.restrictionNote}</div>
                  ) : null}
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {o.bonusTypes.length === 0 ? (
                      <span className="text-gray-500 dark:text-gray-400">{t('none')}</span>
                    ) : (
                      o.bonusTypes.map((bt) => (
                        <span
                          key={bt}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200"
                        >
                          {bt === 'fee-discount' ? exchangeT('bonus_type.fee_discount') : exchangeT(`bonus_type.${bt}`)}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-700 dark:text-gray-200">{o.feeDiscountNote}</td>
                <td className="px-4 py-4">{o.kycRequired ? t('kyc_yes') : t('kyc_no')}</td>
                <td className="px-4 py-4 text-gray-700 dark:text-gray-200">{formatDepositMethods(o.depositMethods, t)}</td>
                <td className="px-4 py-4 text-gray-700 dark:text-gray-200">{o.bestFor}</td>
                <td className="px-4 py-4">
                  <Link
                    href={exchangeHrefById[o.exchangeId]}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                  >
                    {t('view_exchange')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

