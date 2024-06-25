import { ActionReducer, createReducer, on } from '@ngrx/store';
import { AppStateModel } from 'src/lib/models/state/app.state';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  setFollowersUser,
  setTokenSession
 } from './app.actions';
 import { AppEntity } from './app.models';
import IStateAction = AppStateModel.IStateAction;
import StateActionTypesPayload = AppStateModel.StateActionTypesPayload;
import IPayloadSetTokenSession = AppStateModel.IPayloadSetTokenSession;
import IPayloadSetFollowersUser = AppStateModel.IPayloadSetFollowersUser;
import { pathOr } from 'ramda';
import { DATA_USER_FOLLOWERS, UserFollowers } from 'src/lib/models/users.model';

export const APP_FEATURE_KEY = 'app';


export interface State extends EntityState<AppEntity> {
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: string | null; // last none error (if any)
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<AppEntity> = createEntityAdapter<AppEntity>();

export const initialState: State = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const appReducer: ActionReducer<AppStateModel.IAppState> = createReducer<AppStateModel.IAppState>(
    AppStateModel.INITIAL_STATE,
    on(
      setTokenSession,
        (
          state: AppStateModel.IAppState,
          action: IStateAction<IPayloadSetTokenSession>,
        ): AppStateModel.IAppState => {
          const tokenSession: string = pathOr('', ['payload', 'tokenSession'], action);
          let newTokenSession: string = '';
              
          newTokenSession = tokenSession;
      
    
          return { ...state, tokenSession: newTokenSession };
        },
    ),
    on(
      setFollowersUser,
        (
          state: AppStateModel.IAppState,
          action: IStateAction<IPayloadSetFollowersUser>,
        ): AppStateModel.IAppState => {
          const followersUser: UserFollowers[] = pathOr([DATA_USER_FOLLOWERS], ['payload', 'followersUser'], action);
          let newFollowersUser: UserFollowers[] = [DATA_USER_FOLLOWERS];
              
          newFollowersUser = followersUser;
      
    
          return { ...state, followersUser: newFollowersUser };
        },
    ),
);
export function reducer(
    state: AppStateModel.IAppState,
    action: StateActionTypesPayload,
  ): AppStateModel.IAppState {
    return appReducer(state, action);
  }