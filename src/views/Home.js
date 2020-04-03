import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { useTranslation, Trans } from 'react-i18next';

const Home = () => {
  const { t, i18n } = useTranslation(['common', 'else']);
  const [currLang, setCurrLang] = useState(i18n.language);
  console.log(i18n);

  const changeLang = () => {
    if (currLang === 'vi-VN') {
      i18n.changeLanguage('en-US');

      setCurrLang('en-US');
    } else {
      i18n.changeLanguage('vi-VN');
      setCurrLang('vi-VN');
    }
  };

  console.log(i18n);
  return (
    <Card>
      <div>{t('title')}</div>
      <div>{t('body')}</div>
      <div>{t('x', {defaultValue: 'test'})}</div>
      <div>{t('else:titleid')}</div>
      <Trans i18nKey='x'>Test</Trans>
      <Button onClick={changeLang}>Change Language</Button>
    </Card>
  );
};

export default Home;
