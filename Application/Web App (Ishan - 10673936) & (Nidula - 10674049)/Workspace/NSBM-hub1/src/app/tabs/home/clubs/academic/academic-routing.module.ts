import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicPage } from './academic.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicPageRoutingModule {}
