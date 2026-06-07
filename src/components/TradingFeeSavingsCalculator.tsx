'use client';

import {useMemo, useState} from 'react';
import type {Exchange, ExchangeId, TradeType} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';

type FeeSide = 'maker' | 'taker';

function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
}

function getRegisterLink(exchange: Exchange): string {
  if (exchange.id === 'gate-io') return `https://www.gateport.business/share/${exchange.primaryCode}`;
  return exchange.registerUrl;
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function getSavingsLevel(amount: number): 'low' | 'medium' | 'high' {
  if (amount >= 200) return 'high';
  if (amount >= 50) return 'medium';
  return 'low';
}

export default function TradingFeeSavingsCalculator({exchanges}: {exchanges: Exchange[]}) {
  const t = useTranslations('FeeSavings');
  const commonT = useTranslations('Common');

  const [exchangeId, setExchangeId] = useState<ExchangeId>('gate-io');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [feeSide, setFeeSide] = useState<FeeSide>('taker');
  const [monthlyVolume, setMonthlyVolume] = useState<string>('5000');
  const [months, setMonths] = useState<string>('12');
  const [useReferral, setUseReferral] = useState<boolean>(true);
  const [holdToken, setHoldToken] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const exchange = useMemo(() => exchanges.find((x) => x.id === exchangeId) ?? exchanges[0], [exchangeId, exchanges]);

  const result = useMemo(() => {
    const mv = Number(monthlyVolume);
    const m = Number(months);
    const tradingMonths = Number.isFinite(m) && m > 0 ? Math.min(36, m) : 12;
    const annualizedVolume = (Number.isFinite(mv) && mv > 0 ? mv : 0) * tradingMonths;

    const tier = exchange.feeModel[tradeType];
    const baseRate = feeSide === 'maker' ? tier.makerFeeRate : tier.takerFeeRate;
    const originalFee = annualizedVolume * baseRate;

    const [baseLow, baseHigh] = tier.possibleDiscountRange;
    const adjLow = clamp01(baseLow + (useReferral ? 0.02 : 0) + (holdToken ? 0.03 : 0));
    const adjHigh = clamp01(baseHigh + (useReferral ? 0.05 : 0) + (holdToken ? 0.08 : 0));

    const savingsLow = originalFee * adjLow;
    const savingsHigh = originalFee * Math.max(adjLow, adjHigh);
    const feeAfterLow = Math.max(0, originalFee - savingsHigh);
    const feeAfterHigh = Math.max(0, originalFee - savingsLow);

    const level = getSavingsLevel(savingsLow);

    return {
      tradingMonths,
      annualizedVolume,
      originalFee,
      feeAfterRange: [feeAfterLow, feeAfterHigh] as const,
      savingsRange: [savingsLow, savingsHigh] as const,
      level
    };
  }, [exchange.feeModel, feeSide, holdToken, monthlyVolume, months, tradeType, useReferral]);

  const copy = async () => {
    await navigator.clipboard.writeText(exchange.primaryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('inputs')}</h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('exchange')}
            <select
              value={exchangeId}
              onChange={(e) => setExchangeId(e.target.value as ExchangeId)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              {exchanges.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
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

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('fee_side')}
            <select
              value={feeSide}
              onChange={(e) => setFeeSide(e.target.value as FeeSide)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="maker">{t('fee_side_maker')}</option>
              <option value="taker">{t('fee_side_taker')}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('monthly_volume')}
            <input
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              placeholder={t('monthly_volume_placeholder')}
            />
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('trading_months')}
            <input
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              inputMode="numeric"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              placeholder="12"
            />
          </label>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('use_referral')}</div>
              <button
                type="button"
                onClick={() => setUseReferral((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  useReferral ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${useReferral ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{t('use_referral_note')}</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-950">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('hold_token')}</div>
              <button
                type="button"
                onClick={() => setHoldToken((v) => !v)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  holdToken ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${holdToken ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{t('hold_token_note')}</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('output')}</h2>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {exchange.name} · {tradeType === 'spot' ? t('trade_type_spot') : t('trade_type_futures')} ·{' '}
              {feeSide === 'maker' ? t('fee_side_maker') : t('fee_side_taker')}
            </div>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            {t(`level.${result.level}`)}
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('original_fee')}</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{formatUsd(result.originalFee)}</div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {t('original_fee_note', {months: result.tradingMonths})}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('after_discount')}</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {formatUsd(result.feeAfterRange[0])} – {formatUsd(result.feeAfterRange[1])}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t('after_discount_note')}</div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('savings')}</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {formatUsd(result.savingsRange[0])} – {formatUsd(result.savingsRange[1])}
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t('savings_note')}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={copy}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50 transition dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30"
          >
            {copied ? commonT('copied') : commonT('copy_code')}
          </button>
          <a
            href={getRegisterLink(exchange)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {commonT('register')}
          </a>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          {t('disclaimer')}
        </div>
      </div>
    </div>
  );
}

