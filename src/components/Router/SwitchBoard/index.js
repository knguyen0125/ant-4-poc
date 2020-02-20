import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import { useSelector } from 'react-redux';
import routeMap from './routeMap';
import DefaultLayout from '../../../layout/DefaultLayout';
import Login from '../../../views/WebAuthentication/Login';
import PrivateRoute from '../PrivateRoute';
import { MenuSelectors } from '../../../store/modules/menu';
import { AuthSelectors } from '../../../store/modules/auth';

const NotFound = loadable(() => import('../../../views/Exceptions/NotFound'));
const ServerError = loadable(() =>
  import('../../../views/Exceptions/ServerError'),
);
const Forbidden = loadable(() => import('../../../views/Exceptions/Forbidden'));

const SwitchBoard = () => {
  const sortedRoutes = useSelector(MenuSelectors.selectFlatMenu);

  return (
    <DefaultLayout>
      <Switch>
        {sortedRoutes.map(route => {
          let Component = routeMap[route.component];
          const PathRoute = route.isPrivate ? PrivateRoute : Route;

          if (!Component) {
            Component = NotFound;
          }

          return (
            <PathRoute key={route.path} path={route.path} exact={route.isExact}>
              <Component />
            </PathRoute>
          );
        })}
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/exceptions/500" exact>
          <ServerError />
        </Route>
        <Route path="/exceptions/404" exact>
          <NotFound />
        </Route>
        <Route path="/exceptions/403" exact>
          <Forbidden />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </DefaultLayout>
  );
};

export default SwitchBoard;
