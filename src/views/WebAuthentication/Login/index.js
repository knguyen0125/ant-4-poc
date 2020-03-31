import React from 'react';
import { useDispatch, useSelector } from '../../../store/hooks';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import queryString from 'query-string';
import { AuthActions, AuthSelectors } from '../../../store/modules/auth';

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector(AuthSelectors.selectCurrentUser);

  const query = queryString.parse(location.search);
  React.useEffect(() => {
    if (currentUser) {
      dispatch(push(query.from));
    }
  }, [currentUser, query.from, dispatch]);

  const handleLogin = () => {
    dispatch(
      AuthActions.login.request({ username: 'admin', password: 'password' }),
    );
  };

  return (
    <div>
      Login Screen
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
