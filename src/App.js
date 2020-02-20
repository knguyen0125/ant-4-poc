import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwitchBoard from './components/Router/SwitchBoard';
import { MenuActions, MenuConstants } from './store/modules/menu';
import { AuthActions, AuthConstants } from './store/modules/auth';
import { LoadingSelectors } from './store/modules/loading';
import InitialLoadingLayout from './layout/InitialLoadingLayout';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state =>
    LoadingSelectors.selectLoading(state, [
      MenuConstants.REQUEST_MENU,
      AuthConstants.GET_CURRENT_USER,
    ]),
  );

  React.useEffect(() => {
    dispatch(AuthActions.getCurrentUser({ showNotificationOnError: false }));
    dispatch(MenuActions.getMenu());
  }, [dispatch]);

  if (isLoading) {
    return <InitialLoadingLayout loading={isLoading} />;
  }

  return <SwitchBoard />;
}

export default App;
