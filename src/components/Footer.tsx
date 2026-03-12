import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8 text-center mt-12">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} gateioreferralcode.com {t('rights_reserved')}</p>
      </div>
    </footer>
  );
}