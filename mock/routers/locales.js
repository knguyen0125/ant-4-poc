const { Router } = require('express');

const localeProvider = Router();


localeProvider.get('/namespaces', (req, res) => {
  setTimeout(() => {

    res.json(['common', 'else']);
  }, 1000)
});
localeProvider.get('/languages', (req, res) => {
  setTimeout(() => {

    res.json(['vi-VN', 'en-US']);
  }, 1000)
});

localeProvider.get('/en-US/common', (req, res) => {
  return res.json({
    title: 'This text exists in both languages. Current language: English',
    body: 'This text does not exist in local language',
  });
});
localeProvider.get('/en-US/else', (req, res) => {
  return res.json({
    titleid: 'Something something',
  });
});

localeProvider.get('/vi-VN/common', (req, res) => {
  return res.json({
    title: 'This text exists in both languages. Current language: Vietnamese',
  });
});

module.exports = localeProvider;
