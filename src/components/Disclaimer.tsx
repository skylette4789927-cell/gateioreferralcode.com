import {useTranslations} from 'next-intl';

export default function Disclaimer({className}: {className?: string}) {
  const t = useTranslations('Disclaimer');

  return (
    <div className={className ?? ''}>
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-900 dark:border-yellow-900/40 dark:bg-yellow-900/20 dark:text-yellow-100">
        {t('text')}
      </div>
    </div>
  );
}
