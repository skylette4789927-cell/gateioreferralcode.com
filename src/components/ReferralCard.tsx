'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function ReferralCard() {
  const t = useTranslations('ReferralCard');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeCode, setActiveCode] = useState("YOURGATE");

  const codes = [
    { id: "YOURGATE", label: "Recommended" },
    { id: "BldGB1Fb", label: "Alternative" }
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setActiveCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg mx-auto -mt-12 relative z-10 border border-gray-100 dark:border-gray-700">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('title')}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('subtitle')}</p>
      </div>
      
      <div className="space-y-4 mb-6">
        {codes.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActiveCode(item.id)}
            className={`flex justify-between items-center p-4 rounded-lg border cursor-pointer transition-all ${
              activeCode === item.id 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400 ring-1 ring-blue-500 dark:ring-blue-400' 
                : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
            }`}
          >
            <div>
              <span className={`text-xs font-semibold uppercase block mb-1 ${
                activeCode === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500'
              }`}>
                {item.label}
              </span>
              <span className="font-mono text-xl font-bold tracking-wider text-gray-800 dark:text-white">
                {item.id}
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                copyCode(item.id);
              }}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition ${
                copiedCode === item.id 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/50'
              }`}
            >
              {copiedCode === item.id ? t('copied') : t('copy')}
            </button>
          </div>
        ))}
      </div>
      
      <ul className="space-y-3 mb-8">
        <li className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="mr-3 text-green-500 text-xl">✔</span> {t('benefit1')}
        </li>
        <li className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="mr-3 text-green-500 text-xl">✔</span> {t('benefit2')}
        </li>
        <li className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="mr-3 text-green-500 text-xl">✔</span> {t('benefit3')}
        </li>
      </ul>
      
      <a 
        href={`https://www.gateport.business/share/${activeCode}`}
        target="_blank"
        rel="noopener noreferrer" 
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-4 rounded-xl transition text-lg shadow-lg hover:shadow-blue-500/30"
      >
        {t('register')}
      </a>
    </div>
  );
}