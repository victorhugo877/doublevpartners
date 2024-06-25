import { ActionCreator, createAction, props } from '@ngrx/store';
import { AppStateModel } from 'src/lib/models/state/app.state';
import {AppEntity } from './app.models';
import AppActionTypes = AppStateModel.AppActionTypes;
import IStatePartialAction = AppStateModel.IStatePartialAction;
import IPayloadSetTokenSession = AppStateModel.IPayloadSetTokenSession;
import IPayloadSetFollowersUser = AppStateModel.IPayloadSetFollowersUser

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction(
  '[App] Load App Success',
  props<{ app: AppEntity[] }>(),
);

export const setTokenSession: ActionCreator<
  string,
  AppStateModel.ActionCreator<IStatePartialAction<IPayloadSetTokenSession>>
> = createAction<string, IStatePartialAction<IPayloadSetTokenSession>>(
  AppActionTypes.SET_TOKEN_SESSION,
  props<IStatePartialAction<IPayloadSetTokenSession>>(),
);

export const setFollowersUser: ActionCreator<
  string,
  AppStateModel.ActionCreator<IStatePartialAction<IPayloadSetFollowersUser>>
> = createAction<string, IStatePartialAction<IPayloadSetFollowersUser>>(
  AppActionTypes.SET_FOLLOWERS_USERS,
  props<IStatePartialAction<IPayloadSetFollowersUser>>(),
);



