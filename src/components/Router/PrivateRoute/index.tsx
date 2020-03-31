import React from 'react';
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from '../../../store/hooks';
import { AuthSelectors } from '../../../store/modules/auth';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const location = useLocation();

  const currentUser = useSelector(AuthSelectors.selectCurrentUser);

  if (!currentUser) {
    // @ts-ignore
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: `?from=${location.pathname}`,
          state: {
            from: location.pathname,
          },
        }}
      />
    );
  }

  return React.cloneElement(<Route />, props, children);
};

export default PrivateRoute;
