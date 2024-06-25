import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from "ngx-cookie-service";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './small-features/header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";

//State
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppFacade } from './+state/app.facade';
import { reducer } from './+state/app.reducer';
import { AppStateModel } from 'src/lib/models/state/app.state';
import { environment } from '../environments/environment';
import APP_FEATURE_KEY = AppStateModel.APP_FEATURE_KEY;
import INITIAL_STATE = AppStateModel.INITIAL_STATE;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbAlertModule,
    HttpClientModule,
    NoopAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    StoreModule.forRoot(
      {
         // @ts-ignore
        [APP_FEATURE_KEY]: reducer,
      },
      {
        initialState: {
          [APP_FEATURE_KEY]: INITIAL_STATE,
        },
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
