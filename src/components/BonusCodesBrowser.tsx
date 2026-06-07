'use client';

import {useEffect, useMemo, useState} from 'react';
import type {BonusType, Exchange, ExchangeId} from '@/lib/exchanges';
import {readJson} from '@/lib/localStorage';
import ExchangeCard from '@/components/ExchangeCard';
import {useTranslations} from 'next-intl';

const FAVORITES_STORAGE_KEY = 'exchangebonuscode:favorites';
const FAVORITES_EVENT = 'exchangebonuscode:favorites';

type SortKey = 'featured' | 'updated' | 'max-discount' | 'name';

const allBonusTypes: BonusType[] = ['signup', 'trading', 'fee-discount', 'voucher', 'cashback'];

export default function BonusCodesBrowser({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('BonusCodes');
  const [query, setQuery] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<BonusType[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('featured');
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<ExchangeId[]>([]);

  useEffect(() => {
    const refresh = () => {
      setFavorites(readJson<ExchangeId[]>(FAVORITES_STORAGE_KEY, []));
    };

    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    window.addEventListener(FAVORITES_EVENT, refresh as EventListener);

    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('focus', refresh);
      window.removeEventListener(FAVORITES_EVENT, refresh as EventListener);
    };
  }, []);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = exchanges.filter((ex) => {
      if (q && !ex.name.toLowerCase().includes(q)) return false;
      if (favoritesOnly && !favorites.includes(ex.id)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.some((bt) => ex.bonusTypes.includes(bt))) return false;
      return true;
    });

    if (sortKey === 'featured') return filtered;

    return [...filtered].sort((a, b) => {
      if (sortKey === 'updated') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      if (sortKey === 'name') return a.name.localeCompare(b.name);
      if (sortKey === 'max-discount') {
        const aMax = Math.max(a.feeModel.spot.possibleDiscountRange[1], a.feeModel.futures.possibleDiscountRange[1]);
        const bMax = Math.max(b.feeModel.spot.possibleDiscountRange[1], b.feeModel.futures.possibleDiscountRange[1]);
        return bMax - aMax;
      }
      return 0;
    });
  }, [exchanges, favorites, favoritesOnly, query, selectedTypes, sortKey]);

  const toggleType = (bt: BonusType) => {
    setSelectedTypes((prev) => (prev.includes(bt) ? prev.filter((x) => x !== bt) : [...prev, bt]));
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedTypes([]);
    setSortKey('featured');
    setFavoritesOnly(false);
  };

  return (
    <div>
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="grid gap-4 lg:grid-cols-3">
          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('search_label')}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            />
          </label>

          <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('sort_label')}
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-950"
            >
              <option value="featured">{t('sort_featured')}</option>
              <option value="updated">{t('sort_updated')}</option>
              <option value="max-discount">{t('sort_max_discount')}</option>
              <option value="name">{t('sort_name')}</option>
            </select>
          </label>

          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {t('filters_label')}
            <div className="mt-2 flex flex-wrap gap-2">
              {allBonusTypes.map((bt) => {
                const active = selectedTypes.includes(bt);
                return (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => toggleType(bt)}
                    className={
                      active
                        ? 'rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white'
                        : 'rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800'
                    }
                  >
                    {bt === 'fee-discount' ? t('bonus_type_fees') : t(`bonus_type_${bt}`)}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setFavoritesOnly((v) => !v)}
                className={
                  favoritesOnly
                    ? 'rounded-full bg-yellow-500 px-3 py-2 text-xs font-semibold text-gray-900'
                    : 'rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800'
                }
              >
                {t('favorites_only')}
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {t('clear_filters')}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          {t('results_count', {count: filteredAndSorted.length})}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSorted.map((ex) => (
          <ExchangeCard key={ex.id} exchange={ex} href={detailHrefById[ex.id]} />
        ))}
      </div>
    </div>
  );
}
