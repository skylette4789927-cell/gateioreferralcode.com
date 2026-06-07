'use client';

import {useMemo, useState} from 'react';
import type {Exchange, ExchangeId} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

function scoreExchange(ex: Exchange): number {
  const bonusScore = ex.bonusTypes.length * 10;
  const bestForScore = ex.bestFor.length * 3;
  const discountScore = Math.round(ex.feeModel.spot.possibleDiscountRange[1] * 100);
  return bonusScore + bestForScore + discountScore;
}

export default function CompareTool({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<ExchangeId, string>;
}) {
  const t = useTranslations('CompareTool');
  const e = useTranslations('Exchange');
  const [selected, setSelected] = useState<ExchangeId[]>(['gate-io', 'okx']);

  const selectedExchanges = useMemo(() => {
    return exchanges.filter((e) => selected.includes(e.id));
  }, [exchanges, selected]);

  const topPick = useMemo(() => {
    if (selectedExchanges.length === 0) return null;
    return [...selectedExchanges].sort((a, b) => scoreExchange(b) - scoreExchange(a))[0];
  }, [selectedExchanges]);

  const toggle = (id: ExchangeId) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('pick_title')}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {exchanges.map((ex) => (
            <label
              key={ex.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <input
                type="checkbox"
                checked={selected.includes(ex.id)}
                onChange={() => toggle(ex.id)}
              />
              <span>{ex.name}</span>
            </label>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {t('pick_note')}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="text-lg font-bold text-gray-900 dark:text-white">{t('result_title')}</div>
        {topPick ? (
          <div className="mt-3 space-y-2 text-gray-700 dark:text-gray-200">
            <div>
              {t('best_match')}: <span className="font-semibold">{topPick.name}</span>
            </div>
            <div className="text-sm">
              {t('bonus_types')}: {topPick.bonusTypes
                .map((bt) => (bt === 'fee-discount' ? e('bonus_type.fee_discount') : e(`bonus_type.${bt}`)))
                .join(', ')}{' '}
              · {t('best_for')}: {topPick.bestFor.map((tag) => e(`best_for_tag.${tag}`)).join(', ')}
            </div>
            <Link
              href={detailHrefById[topPick.id]}
              className="inline-block mt-3 text-blue-600 hover:underline font-semibold"
            >
              {t('view_referral', {name: topPick.name})} →
            </Link>
          </div>
        ) : (
          <div className="mt-3 text-gray-600 dark:text-gray-300">{t('empty')}</div>
        )}
      </div>
    </div>
  );
}
