import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturersPage } from './lecturers.page';

const routes: Routes = [
  {
    path: '',
    component: LecturersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturersPageRoutingModule {}
