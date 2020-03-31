import React from 'react';
import { useDispatch, useSelector } from './store/hooks';
import SwitchBoard from './components/Router/SwitchBoard';
import * as AuthActions from './store/modules/auth/actions'
import * as MenuActions from './store/modules/menu/actions'
import { LoadingSelectors } from './store/modules/loading';
import InitialLoadingLayout from './layout/InitialLoadingLayout';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) =>
    LoadingSelectors.selectLoading(state, [
      MenuActions.getMenu.request,
      AuthActions.getCurrentUser.request
    ]),
  );

  React.useEffect(() => {
    dispatch(AuthActions.getCurrentUser.request());
    dispatch(MenuActions.getMenu.request());
  }, [dispatch]);

  if (isLoading) {
    return <InitialLoadingLayout loading={isLoading} />;
  }

  return <SwitchBoard />;
}

export default App;
