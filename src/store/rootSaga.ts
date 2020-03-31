import { all, fork } from 'redux-saga/effects';
import authSaga from './modules/auth/sagas';
import menuSaga from "./modules/menu/sagas";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(menuSaga)]);
}
