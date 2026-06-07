'use client';

import {useMemo, useState} from 'react';
import type {Exchange, ExchangeId, TradeType} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {estimateFeeSavings} from '@/lib/estimates';
import {formatUsd} from '@/lib/formatters';

type SortBy = 'lowest_fee' | 'best_bonus';

export default function ExchangeSortableTable({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('Home');
  const e = useTranslations('Exchange');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [sortBy, setSortBy] = useState<SortBy>('lowest_fee');

  const rows = useMemo(() => {
    const withMetrics = exchanges.map((exchange) => {
      const est = estimateFeeSavings({exchange, monthlyVolume: 1000, tradeType});
      const effectiveLow = est.assumedAnnualFees - est.savingsRange[1];
      return {
        exchange,
        effectiveLow,
        bonusScore: exchange.bonusTypes.length
      };
    });

    return withMetrics.sort((a, b) => {
      if (sortBy === 'best_bonus') return b.bonusScore - a.bonusScore;
      return a.effectiveLow - b.effectiveLow;
    });
  }, [exchanges, sortBy, tradeType]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('compare.title')}</div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('compare.trade_type')}
            <select
              value={tradeType}
              onChange={(e) => setTradeType(e.target.value as TradeType)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="spot">{t('compare.trade_type_spot')}</option>
              <option value="futures">{t('compare.trade_type_futures')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('compare.sort')}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="lowest_fee">{t('compare.sort_low_fee')}</option>
              <option value="best_bonus">{t('compare.sort_best_bonus')}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                {e('table.exchange')}
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                {e('table.bonus_types')}
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                {t('compare.est_fee')}
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                {e('table.action')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map(({exchange}) => {
              const est = estimateFeeSavings({exchange, monthlyVolume: 1000, tradeType});
              const [low, high] = est.savingsRange;
              const feeRange = `${formatUsd(est.assumedAnnualFees - high)}–${formatUsd(est.assumedAnnualFees - low)}`;

              return (
                <tr key={exchange.id} className="odd:bg-gray-50 hover:bg-gray-100 dark:odd:bg-gray-950 dark:hover:bg-gray-800/60 transition">
                  <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{exchange.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-200">
                    {exchange.bonusTypes
                      .map((bt) => (bt === 'fee-discount' ? e('bonus_type.fee_discount') : e(`bonus_type.${bt}`)))
                      .join(', ')}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-200">{feeRange}</td>
                  <td className="py-4 px-4">
                    <Link
                      href={detailHrefById[exchange.id]}
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
                    >
                      {t('compare.cta')}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t('compare.note')}</div>
    </div>
  );
}

