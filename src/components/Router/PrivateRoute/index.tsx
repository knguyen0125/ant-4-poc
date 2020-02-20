import React from 'react';
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {isArray} from 'lodash';
import { AuthSelectors } from '../../../store/modules/auth';
import IStore from '../../../store/models/IStore';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const location = useLocation();

  const currentUser = useSelector((state: IStore) =>
    AuthSelectors.selectCurrentUser(state)
  );

  if (!currentUser) {
    // @ts-ignore
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: `?from=${location.pathname}`,
          state: {
            from: location.pathname
          }
        }}
      />
    );
  }

  return React.cloneElement(<Route />, props, children);
};

export default PrivateRoute;
