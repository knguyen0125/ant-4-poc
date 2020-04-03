import i18n from 'i18next';
import axios from 'axios';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const createI18nInstance = async () => {
  const namespaces = await axios.get('/api/locales/namespaces');
  const languages = await axios.get('/api/locales/languages');

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en-US',
      fallbackNs: 'common',
      defaultNS: ['common'],
      ns: namespaces.data,
      debug: true,

      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/api/locales/{{lng}}/{{ns}}',
      },
    });
};

export { createI18nInstance, i18n };
