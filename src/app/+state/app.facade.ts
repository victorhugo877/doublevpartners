import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  setTokenSession,
  setFollowersUser
}  from './app.actions';
import { appSelectors } from './app.selectors';
import { AppStateModel } from 'src/lib/models/state/app.state';
import { Observable } from 'rxjs';
import { nonEmptyString } from 'check-types';
import { UserFollowers } from 'src/lib/models/users.model';

@Injectable({
    providedIn: 'root',
  })
  export class AppFacade {
    tokenSession$: Observable<string> = this.store$.pipe(select(appSelectors.getTokenSession)); 
    followersUser$: Observable<UserFollowers[]> = this.store$.pipe(select(appSelectors.getFollowersUser)); 
    
    constructor(private readonly store$: Store<AppStateModel.IAppPartialState>) {}

    setTokenSession(tokenSession: string): void {
      this.store$.dispatch(setTokenSession({ payload: { tokenSession } }));
    }

    setFollowersUser(followersUser: UserFollowers[]): void {
      this.store$.dispatch(setFollowersUser({ payload: { followersUser } }));
    }
  }