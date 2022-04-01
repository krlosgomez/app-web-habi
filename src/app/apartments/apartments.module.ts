import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Libs */
import { NgxMaskModule, IConfig } from 'ngx-mask'
/* Routes */
import { ApartmentsRoutingModule } from './apartments-routing.module';
/* Components */
import { ApartmentsComponent } from './apartments/apartments.component';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { ReactiveFormsModule } from '@angular/forms';

export const options: Partial<IConfig> | (() => Partial<IConfig>) | null = null;

@NgModule({
  declarations: [
    ApartmentsComponent,
    CreateApartmentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ApartmentsRoutingModule
  ]
})
export class ApartmentsModule { }
