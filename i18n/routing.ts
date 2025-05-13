import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'guj'],
 
  // Used when no locale matches
  defaultLocale: 'en',
    localePrefix: 'as-needed',

  // pathnames:{
  //   "/en/dashboard":{
  //     en:"/dashboard"
  //   }
  // }
});

export type Locale = (typeof routing.locales)[number];
