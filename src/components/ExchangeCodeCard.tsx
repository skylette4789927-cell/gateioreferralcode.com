'use client';

import {useMemo, useState} from 'react';
import type {Exchange} from '@/lib/exchanges';
import {useTranslations} from 'next-intl';
import FavoriteButton from '@/components/FavoriteButton';

function getRegisterLink(exchange: Exchange): string {
  if (exchange.id === 'gate-io') {
    return `https://www.gateport.business/share/${exchange.primaryCode}`;
  }

  return exchange.registerUrl;
}

export default function ExchangeCodeCard({exchange}: {exchange: Exchange}) {
  const c = useTranslations('Common');
  const e = useTranslations('Exchange');
  const [copied, setCopied] = useState(false);
  const registerLink = useMemo(() => getRegisterLink(exchange), [exchange]);

  const copy = async () => {
    await navigator.clipboard.writeText(exchange.primaryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{e('referral_code_label', {name: exchange.name})}</div>
          <div className="mt-1 font-mono text-3xl font-bold tracking-wider text-gray-900 dark:text-white">
            {exchange.primaryCode}
          </div>
          </div>
          <FavoriteButton exchangeId={exchange.id} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={copy}
            className="flex-1 px-4 py-3 rounded-xl font-semibold border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
          >
            {copied ? c('copied') : c('copy_code')}
          </button>

          <a
            href={registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white text-center transition"
          >
            {c('register')}
          </a>
        </div>
      </div>
    </div>
  );
}
