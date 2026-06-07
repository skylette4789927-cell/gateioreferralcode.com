import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  type AppLocale = (typeof routing.locales)[number];

  const isValidLocale = (value: string): value is AppLocale => {
    return routing.locales.includes(value as AppLocale);
  };

  const requested = await requestLocale;
  const locale: AppLocale = requested && isValidLocale(requested) ? requested : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
