import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./rootActions').default>;
  export type RootState = StateType<
  ReturnType<typeof import('./rootReducer').default>
  >;

  interface Types {
    RootAction: ActionType<typeof import('./rootActions').default>;
  }
}
