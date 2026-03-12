import {useTranslations} from 'next-intl';

export default function Intro() {
  const t = useTranslations('Intro');
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t('title')}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          {t('content')}
        </p>
      </div>
    </section>
  );
}