import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { AppStateModel } from 'src/lib/models/state/app.state';
import IAppSelectors = AppStateModel.IAppSelectors;
import { pathOr } from 'ramda';
import { DATA_USER_FOLLOWERS, UserFollowers } from 'src/lib/models/users.model';


export const getAppState: MemoizedSelector<
  AppStateModel.IAppPartialState,
  AppStateModel.IAppState
> = createFeatureSelector<AppStateModel.IAppPartialState, AppStateModel.IAppState>(
  AppStateModel.APP_FEATURE_KEY,
);

export const getTokenSession: MemoizedSelector<
  AppStateModel.IAppPartialState,
  string
> = createSelector(getAppState, (state: AppStateModel.IAppState): string =>
  pathOr<string>('', ['tokenSession'], state),
);

export const getFollowersUser: MemoizedSelector<
  AppStateModel.IAppPartialState,
  UserFollowers[]
> = createSelector(getAppState, (state: AppStateModel.IAppState): UserFollowers[] =>
  pathOr<UserFollowers[]>([DATA_USER_FOLLOWERS], ['followersUser'], state),
);
export const appSelectors: IAppSelectors = {
  getTokenSession,
  getFollowersUser
};
