import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* Components */
import { ApartmentsComponent } from './apartments/apartments.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ApartmentsComponent
      },
      {
        path: 'create',
        component: CreateApartmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
