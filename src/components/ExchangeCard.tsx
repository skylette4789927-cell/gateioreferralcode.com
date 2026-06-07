'use client';

import type {Exchange} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useEffect, useMemo, useState} from 'react';
import type {TradeType} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import FavoriteButton from '@/components/FavoriteButton';
import {estimateFeeSavings} from '@/lib/estimates';
import {formatPercent, formatUsd} from '@/lib/formatters';

export default function ExchangeCard({
  exchange,
  href
}: {
  exchange: Exchange;
  href: string;
}) {
  const t = useTranslations('Exchange');
  const c = useTranslations('Common');
  const calcT = useTranslations('Calculator');
  const bonusCodesT = useTranslations('BonusCodes');

  const [calcOpen, setCalcOpen] = useState(false);
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [monthlyVolume, setMonthlyVolume] = useState<string>('1000');

  useEffect(() => {
    if (!calcOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCalcOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [calcOpen]);

  const estimate = useMemo(() => {
    const mv = Number(monthlyVolume);
    const safeMv = Number.isFinite(mv) && mv > 0 ? mv : 0;
    return estimateFeeSavings({exchange, monthlyVolume: safeMv, tradeType});
  }, [exchange, monthlyVolume, tradeType]);

  const badgeClass = (bt: string) => {
    if (bt === 'signup') return 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200';
    if (bt === 'trading') return 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-200';
    if (bt === 'fee-discount') return 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200';
    return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
  };

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition dark:border-gray-700 dark:bg-gray-900">
      <Link
        href={href}
        aria-label={bonusCodesT('open_exchange', {name: exchange.name})}
        className="absolute inset-0 z-0 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-extrabold text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              {exchange.name.slice(0, 1)}
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{exchange.name}</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {c('best_for')}: {exchange.bestFor.map((tag) => t(`best_for_tag.${tag}`)).join(', ')}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {c('updated')}: {exchange.updatedAt}
            </div>
            <FavoriteButton exchangeId={exchange.id} className="h-10 w-10 rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {exchange.bonusTypes.map((bt) => (
            <span
              key={bt}
              title={bt === 'fee-discount' ? t('bonus_type_help.fee_discount') : t(`bonus_type_help.${bt}`)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass(bt)}`}
            >
              {bt === 'fee-discount' ? t('bonus_type.fee_discount') : t(`bonus_type.${bt}`)}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {c('view_details')}
          </Link>
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setCalcOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {c('calculate_value')}
          </button>
        </div>
      </div>

      {calcOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label={bonusCodesT('close')}
            onClick={() => setCalcOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {bonusCodesT('calculator_title', {name: exchange.name})}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{bonusCodesT('calculator_subtitle')}</div>
              </div>
              <button
                type="button"
                onClick={() => setCalcOpen(false)}
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {bonusCodesT('close')}
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {calcT('trade_type')}
                <select
                  value={tradeType}
                  onChange={(e) => setTradeType(e.target.value as TradeType)}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
                >
                  <option value="spot">{calcT('trade_type_spot')}</option>
                  <option value="futures">{calcT('trade_type_futures')}</option>
                </select>
              </label>

              <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {calcT('monthly_volume')}
                <input
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  inputMode="decimal"
                  placeholder={calcT('monthly_volume_placeholder')}
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
                />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
              <div className="text-sm text-gray-600 dark:text-gray-300">{bonusCodesT('calculator_result')}</div>
              <div className="mt-2 flex flex-wrap gap-3">
                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
                  {bonusCodesT('calculator_savings', {
                    low: formatUsd(estimate.savingsRange[0]),
                    high: formatUsd(estimate.savingsRange[1])
                  })}
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-200">
                  {bonusCodesT('calculator_discount', {
                    low: formatPercent(estimate.discountRange[0]),
                    high: formatPercent(estimate.discountRange[1])
                  })}
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{calcT('output_note')}</div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href={href}
                onClick={() => setCalcOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {c('view_details')}
              </Link>
              <Link
                href="/bonus-value-calculator"
                onClick={() => setCalcOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {bonusCodesT('calculator_full')}
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-200/60 dark:group-hover:ring-blue-800/40 transition" />
    </div>
  );
}
