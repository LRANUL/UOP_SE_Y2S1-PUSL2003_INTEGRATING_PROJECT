import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemesterCalenderPage } from './semester-calender.page';

const routes: Routes = [
  {
    path: '',
    component: SemesterCalenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemesterCalenderPageRoutingModule {}
