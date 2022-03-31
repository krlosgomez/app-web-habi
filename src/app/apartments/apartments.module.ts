import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Routes */
import { ApartmentsRoutingModule } from './apartments-routing.module';
/* Components */
import { ApartmentsComponent } from './apartments/apartments.component';


@NgModule({
  declarations: [
    ApartmentsComponent
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule
  ]
})
export class ApartmentsModule { }
