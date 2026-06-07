'use client';

import {useMemo, useState} from 'react';
import type {Exchange, ExchangeId, TradeType} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

type Experience = 'new' | 'experienced';
type Preference = 'bonus' | 'fees';

const countries = ['Vietnam', 'UAE', 'Australia', 'Singapore', 'Taiwan'];

function scoreExchange({
  exchange,
  experience,
  tradeType,
  preference
}: {
  exchange: Exchange;
  experience: Experience;
  tradeType: TradeType;
  preference: Preference;
}): number {
  const tier = exchange.feeModel[tradeType];
  const feeScore = tier.takerFeeRate > 0 ? 1 / tier.takerFeeRate : 0;
  const bonusScore = exchange.bonusTypes.length;
  const signupScore = exchange.bonusTypes.includes('signup') ? 2 : 0;

  return (
    (experience === 'new' ? signupScore : 0) +
    (preference === 'fees' ? feeScore : 0) +
    (preference === 'bonus' ? bonusScore : 0)
  );
}

export default function HomeBonusFinder({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('Home');
  const [experience, setExperience] = useState<Experience>('new');
  const [tradeType, setTradeType] = useState<TradeType>('spot');
  const [preference, setPreference] = useState<Preference>('bonus');
  const [country, setCountry] = useState<string>('Vietnam');

  const ranked = useMemo(() => {
    return [...exchanges]
      .map((exchange) => ({
        exchange,
        score: scoreExchange({exchange, experience, tradeType, preference})
      }))
      .sort((a, b) => b.score - a.score);
  }, [exchanges, experience, preference, tradeType]);

  const best = ranked[0]?.exchange ?? null;
  const alternatives = ranked.slice(1, 3).map((x) => x.exchange);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="text-lg font-bold text-gray-900 dark:text-white">{t('finder.title')}</div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('finder.subtitle')}</div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('finder.experience')}
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value as Experience)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="new">{t('finder.experience_new')}</option>
            <option value="experienced">{t('finder.experience_experienced')}</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('finder.trade_type')}
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value as TradeType)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="spot">{t('finder.trade_type_spot')}</option>
            <option value="futures">{t('finder.trade_type_futures')}</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('finder.preference')}
          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value as Preference)}
            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
          >
            <option value="bonus">{t('finder.preference_bonus')}</option>
            <option value="fees">{t('finder.preference_fees')}</option>
          </select>
        </label>

        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {t('finder.country')}
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
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-950">
        <div className="text-sm text-gray-600 dark:text-gray-300">{t('finder.result_title')}</div>
        {best ? (
          <div className="mt-1">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {t('finder.best_match', {name: best.name})}
            </div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              {t('finder.why', {country})}
            </div>
            {alternatives.length > 0 ? (
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {t('finder.alternatives')}: {alternatives.map((x) => x.name).join(', ')}
              </div>
            ) : null}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={detailHrefById[best.id]}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {t('finder.cta_view')}
              </Link>
              <Link
                href="/bonus-value-calculator"
                className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t('finder.cta_calc')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">{t('finder.empty')}</div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('finder.note')}</div>
    </div>
  );
}

