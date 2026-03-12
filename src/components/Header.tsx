import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations('Header');
  
  return (
    <header className="w-full border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">
          Gate Referral
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-600">{t('home')}</Link>
           <Link href="/gate-io-invitation-code" className="hover:text-blue-600">{t('invitation_code')}</Link>
           <Link href="/gate-io-referral-bonus" className="hover:text-blue-600">{t('bonus')}</Link>
           <Link href="/gate-io-referral-id" className="hover:text-blue-600">{t('guide')}</Link>
           <Link href="/blog" className="hover:text-blue-600">{t('blog')}</Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}