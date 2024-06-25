import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UsersRoutingModule } from './users-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartVerticalBarComponent } from './chart-vertical-bar/chart-vertical-bar.component';
import {MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    UsersComponent,
    ChartVerticalBarComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    NgbAlertModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatPaginatorModule,
    MatCardModule
  ]
})
export class UsersModule { }
