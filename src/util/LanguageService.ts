import { createIntl, createIntlCache } from '@formatjs/intl';
import languageData from '../containers/Topbar/languageData';
import AppLocale from '../lngProvider';
import ILanguage from '../models/Language';
import config from './config';

export function GetCurrentLocate(locale: string = null): ILanguage {
  if (!locale) {
    locale = localStorage.getItem('lang');
  }
  if (!locale) {
    return config.defaultLocale;
  } else {
    const locates = languageData.filter((p) => p.locale === locale);
    if (locates.length > 0) {
      return locates[0];
    }
    return config.defaultLocale;
  }
}

const GetIntl = <T = string>(locale: string = null) => {
  const loc = GetCurrentLocate(locale);

  const currentAppLocale = AppLocale[loc.locale];

  const cache = createIntlCache();

  const intl = createIntl<T>(
    {
      locale: currentAppLocale.locale,
      messages: currentAppLocale.messages
    },
    cache
  );
  return intl;
};

export default GetIntl;
