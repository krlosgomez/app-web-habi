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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
