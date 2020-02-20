import { RouterState } from 'connected-react-router';
import IErrorState from '../modules/error/models/IErrorState';
import ILoadingState from '../modules/loading/models/ILoadingState';

export default interface IStore {
  readonly error: IErrorState;
  readonly loading: ILoadingState;
  readonly router: RouterState;
  readonly [k: string]: any;
}
