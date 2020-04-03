import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18nInstance , i18n } from '~/i18n';
import App from '~/App';

const I18nProvider = () => {
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    const s = async () => {
      await createI18nInstance();

      setReady(true);
    };

    s();
  }, []);

  if (!ready) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default I18nProvider;
