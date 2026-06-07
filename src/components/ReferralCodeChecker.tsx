'use client';

import {useMemo, useState} from 'react';
import type {CountryId, UserType} from '@/lib/countries';
import {getCountries} from '@/lib/countries';
import {getExchangeDetailHref} from '@/lib/exchanges';
import type {Exchange, ExchangeId} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

function getFormatRule(exchange: Exchange): RegExp {
  const min = exchange.codeRules?.minLength ?? 4;
  const max = exchange.codeRules?.maxLength ?? 20;
  const pattern = exchange.codeRules?.pattern ?? '^[0-9A-Za-z]+$';
  return new RegExp(`^(?=.{${min},${max}}$)${pattern.replace(/^\^|\$$/g, '')}$`);
}

export default function ReferralCodeChecker({exchanges}: {exchanges: Exchange[]}) {
  const t = useTranslations('ReferralChecker');
  const countries = useMemo(() => getCountries(), []);
  const [exchangeId, setExchangeId] = useState<ExchangeId>('gate-io');
  const [code, setCode] = useState('');
  const [countryId, setCountryId] = useState<CountryId>(countries[0]?.id ?? 'vietnam');
  const [userType, setUserType] = useState<UserType>('new');
  const [copied, setCopied] = useState(false);

  const exchange = useMemo(() => exchanges.find((x) => x.id === exchangeId) ?? exchanges[0], [exchangeId, exchanges]);
  const country = useMemo(() => countries.find((c) => c.id === countryId) ?? countries[0], [countries, countryId]);

  const result = useMemo(() => {
    const trimmed = code.trim();
    const rule = getFormatRule(exchange);

    const looksValid = trimmed.length > 0 && rule.test(trimmed);
    const verified = looksValid && trimmed === exchange.primaryCode;

    return {
      trimmed,
      looksValid,
      verified
    };
  }, [code, exchange]);

  const status = () => {
    if (result.trimmed.length === 0) return 'empty';
    if (!result.looksValid) return 'invalid';
    if (result.verified) return 'verified';
    return 'valid_unverified';
  };

  const copy = async () => {
    if (!result.trimmed) return;
    await navigator.clipboard.writeText(result.trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('inputs')}</div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
            {t('referral_code')}
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-mono dark:border-gray-700 dark:bg-gray-950"
              placeholder={t('referral_code_placeholder')}
            />
          </label>

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
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('result')}</div>
        <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-200">
          {status() === 'empty' ? (
            <div className="text-gray-600 dark:text-gray-300">{t('status_enter')}</div>
          ) : null}

          {status() === 'invalid' ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-100">
              <div className="font-semibold">{t('status_invalid_title')}</div>
              <div className="mt-1">{t('status_invalid_desc')}</div>
            </div>
          ) : null}

          {status() === 'valid_unverified' ? (
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 dark:border-yellow-900/40 dark:bg-yellow-900/20 dark:text-yellow-100">
              <div className="font-semibold">{t('status_valid_title')}</div>
              <div className="mt-1">{t('status_valid_unverified_desc')}</div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/bonus-codes"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  {t('cta_compare_verified')}
                </Link>
              </div>
            </div>
          ) : null}

          {status() === 'verified' ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-900 dark:border-green-900/40 dark:bg-green-900/20 dark:text-green-100">
              <div className="font-semibold">{t('status_verified_title')}</div>
              <div className="mt-1">{t('status_verified_desc')}</div>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-green-300 bg-white px-4 py-2.5 text-sm font-semibold text-green-800 hover:bg-green-50 transition dark:border-green-900/40 dark:bg-green-950 dark:text-green-100 dark:hover:bg-green-900/30"
                >
                  {copied ? t('copied') : t('cta_use_code')}
                </button>
                <Link
                  href={getExchangeDetailHref(exchange.id)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                >
                  {t('cta_view_bonus')}
                </Link>
              </div>
            </div>
          ) : null}

          {userType === 'existing' ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200">
              <div className="font-semibold">{t('existing_user_title')}</div>
              <div className="mt-1">{t('existing_user_desc')}</div>
            </div>
          ) : null}

          <div className="text-xs text-gray-500 dark:text-gray-400">{t('note', {name: exchange.name, country: country?.name ?? ''})}</div>
        </div>
      </div>
    </div>
  );
}
