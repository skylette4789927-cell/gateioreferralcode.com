import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  return (
    <section className="bg-gray-900 text-white py-20 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('title')}</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
        <a 
          href="https://www.gateport.business/share/YOURGATE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full text-lg transition transform hover:scale-105"
        >
          {t('cta')}
        </a>
      </div>
    </section>
  );
}