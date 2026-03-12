import {useTranslations} from 'next-intl';

export default function ComparisonTable() {
  const t = useTranslations('ComparisonTable');

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{t('title')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">{t('exchange')}</th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">{t('best_for')}</th>
                <th className="py-3 px-6 text-left font-semibold text-gray-700 dark:text-gray-200">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr>
                <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">Binance</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('liquidity')}</td>
                <td className="py-4 px-6"><button className="text-blue-600 hover:underline font-medium">{t('view_bonus')}</button></td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-bold text-gray-900 dark:text-white">OKX</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('derivatives')}</td>
                <td className="py-4 px-6"><button className="text-blue-600 hover:underline font-medium">{t('view_bonus')}</button></td>
              </tr>
              <tr className="bg-blue-50 dark:bg-blue-900/20">
                <td className="py-4 px-6 font-bold text-blue-600 dark:text-blue-400">Gate.io</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('altcoins')}</td>
                <td className="py-4 px-6"><button className="text-blue-600 hover:underline font-bold">{t('view_bonus')}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}