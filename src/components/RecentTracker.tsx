'use client';

import {useEffect} from 'react';
import type {Exchange, ExchangeId} from '@/lib/exchanges';
import {readJson, writeJson} from '@/lib/localStorage';

const STORAGE_KEY = 'exchangebonuscode:recent';
const MAX_ITEMS = 8;

export type RecentItem = {
  exchangeId: ExchangeId;
  viewedAt: number;
};

function readRecent(): RecentItem[] {
  return readJson<RecentItem[]>(STORAGE_KEY, []);
}

function writeRecent(value: RecentItem[]) {
  writeJson(STORAGE_KEY, value);
}

export default function RecentTracker({exchange}: {exchange: Exchange}) {
  useEffect(() => {
    const current = readRecent();
    const next: RecentItem[] = [
      {exchangeId: exchange.id, viewedAt: Date.now()},
      ...current.filter((x) => x.exchangeId !== exchange.id)
    ].slice(0, MAX_ITEMS);
    writeRecent(next);
  }, [exchange.id]);

  return null;
}

