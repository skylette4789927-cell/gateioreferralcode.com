import {useTranslations} from 'next-intl';

export default function BonusTable() {
  const t = useTranslations('BonusTable');

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">{t('title')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">{t('reward')}</th>
                <th className="py-4 px-6 text-left font-semibold uppercase tracking-wider">{t('requirement')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{t('welcome_bonus')}</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('deposit_crypto')}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{t('trading_rewards')}</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('futures_trading')}</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{t('vip_upgrade')}</td>
                <td className="py-4 px-6 text-gray-600 dark:text-gray-300">{t('high_volume')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}