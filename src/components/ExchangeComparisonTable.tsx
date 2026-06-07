import type {Exchange} from '@/lib/exchanges';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

export default function ExchangeComparisonTable({
  exchanges,
  detailHrefById
}: {
  exchanges: Exchange[];
  detailHrefById: Record<string, string>;
}) {
  const t = useTranslations('Exchange');
  const c = useTranslations('Common');

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">{t('table.exchange')}</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">{t('table.bonus_types')}</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">{t('table.best_for')}</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">{t('table.action')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {exchanges.map((ex) => (
            <tr key={ex.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/60 transition">
              <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{ex.name}</td>
              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-200">
                {ex.bonusTypes
                  .map((bt) => (bt === 'fee-discount' ? t('bonus_type.fee_discount') : t(`bonus_type.${bt}`)))
                  .join(', ')}
              </td>
              <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-200">
                {ex.bestFor.map((tag) => t(`best_for_tag.${tag}`)).join(', ')}
              </td>
              <td className="py-4 px-4">
                <Link href={detailHrefById[ex.id]} className="text-blue-600 hover:underline font-semibold">
                  {c('view_code')}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
