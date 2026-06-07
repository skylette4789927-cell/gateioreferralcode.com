'use client';

import {useMemo, useState} from 'react';
import type {Exchange, ExchangeId, TradeType} from '@/lib/exchanges';
import {estimateFeeSavings} from '@/lib/estimates';
import {formatPercent, formatUsd} from '@/lib/formatters';
import {useTranslations} from 'next-intl';
import {writeJson} from '@/lib/localStorage';
import {Link} from '@/i18n/routing';

const STORAGE_KEY = 'exchangebonuscode:last_calc';

type CalcSnapshot = {
  country: string;
  monthlyVolume: number;
  tradeType: TradeType;
  bestExchangeId: ExchangeId | null;
  savedAt: number;
};

const countries = ['Vietnam', 'UAE', 'Australia', 'Singapore', 'Taiwan'];

export default function HomeQuickCalculator({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('Home');
  const [country, setCountry] = useState<string>('Vietnam');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [monthlyVolume, setMonthlyVolume] = useState<string>('1000');

  const ranked = useMemo(() => {
    const mv = Number(monthlyVolume);
    const safeMv = Number.isFinite(mv) && mv > 0 ? mv : 0;

    return exchanges
      .map((exchange) => {
        const est = estimateFeeSavings({exchange, monthlyVolume: safeMv, tradeType});
        const [low, high] = est.savingsRange;
        const effectiveLow = est.assumedAnnualFees - high;
        const effectiveHigh = est.assumedAnnualFees - low;

        return {
          exchange,
          est,
          effectiveFeeRange: [effectiveLow, effectiveHigh] as const
        };
      })
      .sort((a, b) => a.effectiveFeeRange[0] - b.effectiveFeeRange[0]);
  }, [exchanges, monthlyVolume, tradeType]);

  const best = ranked[0];

  const saveSnapshot = () => {
    const mv = Number(monthlyVolume);
    const safeMv = Number.isFinite(mv) && mv > 0 ? mv : 0;

    const snapshot: CalcSnapshot = {
      country,
      monthlyVolume: safeMv,
      tradeType,
      bestExchangeId: best?.exchange.id ?? null,
      savedAt: Date.now()
    };

    writeJson(STORAGE_KEY, snapshot);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">{t('quick_calc.title')}</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('quick_calc.subtitle')}</div>
        </div>
        <Link href="/bonus-value-calculator" className="text-sm font-semibold text-blue-600 hover:underline">
          {t('quick_calc.full_calc')} →
        </Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('quick_calc.country')}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('quick_calc.trade_type')}
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value as TradeType)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="spot">{t('quick_calc.trade_type_spot')}</option>
            <option value="futures">{t('quick_calc.trade_type_futures')}</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('quick_calc.monthly_volume')}
          <input
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(e.target.value)}
            inputMode="decimal"
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            placeholder="1000"
          />
        </label>
      </div>

      {best ? (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
          <div className="text-sm text-gray-600 dark:text-gray-300">{t('quick_calc.best_match')}</div>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{best.exchange.name}</div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
              {t('quick_calc.annual_savings', {
                low: formatUsd(best.est.savingsRange[0]),
                high: formatUsd(best.est.savingsRange[1])
              })}
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
              {t('quick_calc.discount_range', {
                low: formatPercent(best.est.discountRange[0]),
                high: formatPercent(best.est.discountRange[1])
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href={detailHrefById[best.exchange.id]}
              onClick={saveSnapshot}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              {t('quick_calc.view_code')}
            </Link>
            <Link
              href="/compare"
              onClick={saveSnapshot}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {t('quick_calc.compare')}
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('quick_calc.note')}</div>
    </div>
  );
}

