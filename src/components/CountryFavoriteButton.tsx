'use client';

import {useEffect, useMemo, useState} from 'react';
import type {CountryId} from '@/lib/countries';
import {readJson, writeJson} from '@/lib/localStorage';
import {useTranslations} from 'next-intl';

const STORAGE_KEY = 'exchangebonuscode:country-favorites';
const FAVORITES_EVENT = 'exchangebonuscode:country-favorites';

function readFavorites(): CountryId[] {
  return readJson<CountryId[]>(STORAGE_KEY, []);
}

function writeFavorites(value: CountryId[]) {
  writeJson(STORAGE_KEY, value);
}

export default function CountryFavoriteButton({countryId, className}: {countryId: CountryId; className?: string}) {
  const t = useTranslations('Countries');
  const [favorites, setFavorites] = useState<CountryId[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const isFavorite = useMemo(() => favorites.includes(countryId), [favorites, countryId]);

  const toggle = () => {
    const next = isFavorite ? favorites.filter((id) => id !== countryId) : [...favorites, countryId];
    setFavorites(next);
    writeFavorites(next);
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  };

  return (
    <button
      type="button"
      aria-label={isFavorite ? t('favorite_remove') : t('favorite_add')}
      onClick={toggle}
      className={
        className ??
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
      }
    >
      <svg
        viewBox="0 0 24 24"
        className={isFavorite ? 'h-5 w-5 fill-yellow-400 stroke-yellow-500' : 'h-5 w-5 fill-none stroke-current'}
        strokeWidth="2"
      >
        <path d="M12 17.3l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.76 1.64 7.03z" />
      </svg>
    </button>
  );
}

