import 'i18next';

import common from '@/../../public/locales/en/common.json';
import themeColor from '@/../../public/locales/en/pages/theme-color.json';

import componentSelect from '@/../../public/locales/en/component/select.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      'pages/theme-color': typeof themeColor;
      'component/select': typeof componentSelect;
    };
  }
}
