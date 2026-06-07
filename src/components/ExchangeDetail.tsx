import type {Exchange} from '@/lib/exchanges';
import ExchangeCodeCard from '@/components/ExchangeCodeCard';
import Disclaimer from '@/components/Disclaimer';
import FAQList from '@/components/FAQList';
import {Link} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import RecentTracker from '@/components/RecentTracker';

export default function ExchangeDetail({exchange}: {exchange: Exchange}) {
  const t = useTranslations('ExchangeDetail');

  const faqs = [
    {
      q: t('faq.q1', {name: exchange.name}),
      a: t('faq.a1')
    },
    {
      q: t('faq.q2', {name: exchange.name}),
      a: t('faq.a2')
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3')
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4')
    }
  ];

  return (
    <div className="space-y-10">
      <RecentTracker exchange={exchange} />
      <section className="pt-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {t('title', {name: exchange.name})}
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
          <div className="mt-6">
            <ExchangeCodeCard exchange={exchange} />
          </div>
          <Disclaimer className="mt-5" />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('how.title')}</h2>
            <ol className="mt-4 space-y-3 text-gray-700 dark:text-gray-200 list-decimal list-inside">
              <li>{t('how.step1')}</li>
              <li>{t('how.step2')}</li>
              <li>{t('how.step3')}</li>
              <li>{t('how.step4')}</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('rewards.title')}</h2>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200 list-disc list-inside">
              <li>{t('rewards.item1')}</li>
              <li>{t('rewards.item2')}</li>
              <li>{t('rewards.item3')}</li>
            </ul>
            <div className="mt-4">
              <Link href="/bonus-value-calculator" className="text-blue-600 hover:underline font-semibold">
                {t('rewards.cta')} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FAQList title={t('faq.title')} faqs={faqs} />
    </div>
  );
}
