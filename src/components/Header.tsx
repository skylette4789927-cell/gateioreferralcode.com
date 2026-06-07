import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
          Exchange Bonus Code
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-600">{t('home')}</Link>
          <Link href="/bonus-codes" className="hover:text-blue-600">{t('bonus_codes')}</Link>
          <Link href="/compare" className="hover:text-blue-600">{t('compare')}</Link>
          <Link href="/calculators" className="hover:text-blue-600">{t('calculators')}</Link>
          <Link href="/countries" className="hover:text-blue-600">{t('countries')}</Link>
          <Link href="/guides" className="hover:text-blue-600">{t('guides')}</Link>
          <Link href="/blog" className="hover:text-blue-600">{t('blog')}</Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
