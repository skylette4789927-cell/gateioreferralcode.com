import {useTranslations} from 'next-intl';

export default function Steps() {
  const t = useTranslations('Steps');
  
  const steps = [
    { title: t('step1_title'), desc: t('step1_desc') },
    { title: t('step2_title'), desc: t('step2_desc') },
    { title: t('step3_title'), desc: t('step3_desc') },
    { title: t('step4_title'), desc: t('step4_desc') },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t('title')}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10 shadow-lg">
                {index + 1}
              </div>
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}