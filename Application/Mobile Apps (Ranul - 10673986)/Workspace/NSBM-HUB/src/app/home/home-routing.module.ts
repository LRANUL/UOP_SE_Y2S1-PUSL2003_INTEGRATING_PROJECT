import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { homePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: homePage,
  },
  {
    path: 'esign',
    loadChildren: () => import('./esign/esign.module').then( m => m.EsignPageModule)
  },
  {
    path: 'lecturer',
    loadChildren: () => import('./lecturer/lecturer.module').then( m => m.LecturerPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
