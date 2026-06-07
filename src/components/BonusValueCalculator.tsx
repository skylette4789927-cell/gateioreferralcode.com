'use client';

import {useEffect, useMemo, useState} from 'react';
import type {CountryId, UserType} from '@/lib/countries';
import {checkCountryAvailability, getCountries} from '@/lib/countries';
import type {Exchange, ExchangeId, TradeType} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import {writeJson} from '@/lib/localStorage';
import {Link} from '@/i18n/routing';

function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return '$0';
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(value);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function getRegisterLink(exchange: Exchange): string {
  if (exchange.id === 'gate-io') return `https://www.gateport.business/share/${exchange.primaryCode}`;
  return exchange.registerUrl;
}

export default function BonusValueCalculator({exchanges}: {exchanges: Exchange[]}) {
  const t = useTranslations('Calculator');
  const commonT = useTranslations('Common');
  const countries = useMemo(() => getCountries(), []);

  const [exchangeId, setExchangeId] = useState<ExchangeId>('gate-io');
  const [countryId, setCountryId] = useState<CountryId>(countries[0]?.id ?? 'vietnam');
  const [userType, setUserType] = useState<UserType>('new');
  const [deposit, setDeposit] = useState<string>('100');
  const [monthlyVolume, setMonthlyVolume] = useState<string>('1000');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [useReferral, setUseReferral] = useState<boolean>(true);
  const [holdToken, setHoldToken] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const exchange = useMemo(() => exchanges.find((x) => x.id === exchangeId) ?? exchanges[0], [exchangeId, exchanges]);
  const countryName = useMemo(() => countries.find((c) => c.id === countryId)?.name ?? countryId, [countries, countryId]);

  const candidateExchanges = useMemo(() => {
    const ids: ExchangeId[] = ['gate-io', 'okx', 'binance'];
    const list = exchanges.filter((e) => ids.includes(e.id));
    return list.length > 0 ? list : exchanges.slice(0, 3);
  }, [exchanges]);

  const result = useMemo(() => {
    const monthly = Number(monthlyVolume);
    const annualVolume = Number.isFinite(monthly) && monthly > 0 ? monthly * 12 : 0;

    const depositValue = Number(deposit);
    const depositNote =
      Number.isFinite(depositValue) && depositValue > 0
        ? t('deposit_note_value', {value: formatUsd(depositValue)})
        : t('deposit_note_default');

    const calcForExchange = (ex: Exchange) => {
      const feeTier = ex.feeModel[tradeType];
      const assumedAnnualFees = annualVolume * feeTier.takerFeeRate;

      const [baseLow, baseHigh] = feeTier.possibleDiscountRange;
      const adjLow = clamp01(baseLow + (useReferral ? 0.02 : 0) + (holdToken ? 0.03 : 0));
      const adjHigh = clamp01(baseHigh + (useReferral ? 0.05 : 0) + (holdToken ? 0.08 : 0));

      const lowSavings = assumedAnnualFees * adjLow;
      const highSavings = assumedAnnualFees * Math.max(adjLow, adjHigh);

      const availability = checkCountryAvailability({countryId, exchangeId: ex.id, userType, tradeType});

      let score = 50;
      if (availability.status === 'available') score += 25;
      else if (availability.status === 'limited') score += 10;
      else score -= 30;

      if (annualVolume >= 60000) score += 10;
      else if (annualVolume >= 12000) score += 5;

      if (useReferral) score += 5;
      if (holdToken) score += 5;
      if (userType === 'existing') score -= 10;

      const scoreClamped = Math.max(0, Math.min(100, Math.round(score)));

      return {
        exchange: ex,
        availability,
        assumedAnnualFees,
        savingsRange: [lowSavings, highSavings] as const,
        discountRange: [adjLow, Math.max(adjLow, adjHigh)] as const,
        score: scoreClamped
      };
    };

    const computed = candidateExchanges.map(calcForExchange).sort((a, b) => b.score - a.score);
    const recommended = computed[0];
    const selected = computed.find((x) => x.exchange.id === exchange.id) ?? recommended;

    const requirements = [
      t('req_new_account'),
      useReferral ? t('req_referral_code') : null,
      selected.exchange.kycRequired ? t('req_kyc') : null,
      depositValue > 0 || annualVolume > 0 ? t('req_deposit_or_trade') : null
    ].filter(Boolean) as string[];

    return {
      annualVolume,
      depositNote,
      selected,
      recommended,
      requirements
    };
  }, [candidateExchanges, countryId, deposit, exchange, holdToken, monthlyVolume, tradeType, t, useReferral, userType]);

  useEffect(() => {
    const mv = Number(monthlyVolume);
    const dp = Number(deposit);
    writeJson('exchangebonuscode:last_calc', {
      exchangeId,
      countryId,
      userType,
      tradeType,
      monthlyVolume: Number.isFinite(mv) ? mv : 0,
      deposit: Number.isFinite(dp) ? dp : 0,
      savedAt: Date.now()
    });
  }, [countryId, deposit, exchangeId, monthlyVolume, tradeType, userType]);

  const copy = async () => {
    await navigator.clipboard.writeText(result.selected.exchange.primaryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('inputs')}</div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
              {exchanges.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('new_user')}
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserType)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="new">{t('new_user_yes')}</option>
              <option value="existing">{t('new_user_no')}</option>
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
            {t('first_deposit')}
            <input
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              inputMode="decimal"
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
              placeholder={t('first_deposit_placeholder')}
            />
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
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${holdToken ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">{t('hold_token_note')}</div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">{t('output_estimate')}</div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {t('output_country_exchange', {country: countryName, exchange: result.selected.exchange.name})}
            </div>
          </div>
          <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
            {t('match_score', {score: result.selected.score})}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('fee_savings_title')}</div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              <div>
                {t('output_annual_volume')}: <span className="font-semibold">{formatUsd(result.annualVolume)}</span>
              </div>
              <div className="mt-1">
                {t('output_assumed_fees')}{' '}
                <span className="font-semibold">{formatUsd(result.selected.assumedAnnualFees)}</span>
              </div>
              <div className="mt-2">
                {t('output_savings_range', {
                  low: formatPercent(result.selected.discountRange[0]),
                  high: formatPercent(result.selected.discountRange[1])
                })}{' '}
                <span className="font-semibold">
                  {formatUsd(result.selected.savingsRange[0])} – {formatUsd(result.selected.savingsRange[1])} {t('per_year')}
                </span>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t('output_note', {depositNote: result.depositNote})}</div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{t('best_match_title')}</div>
            <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{result.recommended.exchange.name}</div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t('best_match_note', {
                status:
                  result.recommended.availability.status === 'available'
                    ? t('availability_available')
                    : result.recommended.availability.status === 'limited'
                      ? t('availability_limited')
                      : t('availability_not_confirmed')
              })}
            </div>
            <div className="mt-4 text-sm font-semibold text-gray-800 dark:text-gray-200">{t('requirements_title')}</div>
            <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-200">
              {result.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200">
                    ✓
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
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
            href={getRegisterLink(result.selected.exchange)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {commonT('register')}
          </a>
          <Link
            href="/compare"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {t('cta_compare')}
          </Link>
        </div>
      </div>
    </div>
  );
}
