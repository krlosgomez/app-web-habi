import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'apartments',
    loadChildren: () =>
      import('./apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    path: '**',
    redirectTo: 'apartments'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
