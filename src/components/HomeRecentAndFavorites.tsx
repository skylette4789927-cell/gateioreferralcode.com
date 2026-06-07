'use client';

import {useEffect, useMemo, useState} from 'react';
import type {Exchange, ExchangeId} from '@/lib/exchanges';
import {readJson} from '@/lib/localStorage';
import type {RecentItem} from '@/components/RecentTracker';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

const FAVORITES_KEY = 'exchangebonuscode:favorites';
const RECENT_KEY = 'exchangebonuscode:recent';

function readFavorites(): ExchangeId[] {
  return readJson<ExchangeId[]>(FAVORITES_KEY, []);
}

function readRecent(): RecentItem[] {
  return readJson<RecentItem[]>(RECENT_KEY, []);
}

export default function HomeRecentAndFavorites({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('Home');
  const [favorites, setFavorites] = useState<ExchangeId[]>([]);
  const [recent, setRecent] = useState<RecentItem[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
    setRecent(readRecent());

    const onStorage = () => {
      setFavorites(readFavorites());
      setRecent(readRecent());
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('focus', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onStorage);
    };
  }, []);

  const exchangeById = useMemo(() => new Map(exchanges.map((e) => [e.id, e])), [exchanges]);

  const favoriteExchanges = favorites.map((id) => exchangeById.get(id)).filter(Boolean) as Exchange[];
  const recentExchanges = recent.map((x) => exchangeById.get(x.exchangeId)).filter(Boolean) as Exchange[];

  if (favoriteExchanges.length === 0 && recentExchanges.length === 0) {
    return null;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 max-w-6xl grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{t('recent.title')}</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('recent.subtitle')}</div>
          {recentExchanges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {recentExchanges.map((ex) => (
                <Link
                  key={ex.id}
                  href={detailHrefById[ex.id]}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {ex.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t('recent.empty')}</div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{t('favorites.title')}</div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t('favorites.subtitle')}</div>
          {favoriteExchanges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {favoriteExchanges.map((ex) => (
                <Link
                  key={ex.id}
                  href={detailHrefById[ex.id]}
                  className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {ex.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">{t('favorites.empty')}</div>
          )}
        </div>
      </div>
    </section>
  );
}

