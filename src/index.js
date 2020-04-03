import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ConfigProvider } from 'antd';
import './index.css';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import '~/styles/index.less';
import I18nProvider from "~/I18NProvider";

const store = configureStore();

const getPopupContainer = (triggerNode) => {
  console.log(triggerNode?.parentNode.querySelector('[data-testid]'));

  const parentNode = triggerNode?.parentNode;

  let id = parentNode?.getAttribute('data-testid');

  if (!id) {
    id = parentNode
      ?.querySelector('[data-testid]')
      ?.getAttribute('data-testid');
  }

  const node = document.createElement('div');
  node.setAttribute('data-test-class', 'ami-popup');
  node.setAttribute('data-testid', id);

  document.body.appendChild(node);

  return node;
};

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ConfigProvider getPopupContainer={getPopupContainer}>
        <I18nProvider/>
      </ConfigProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
