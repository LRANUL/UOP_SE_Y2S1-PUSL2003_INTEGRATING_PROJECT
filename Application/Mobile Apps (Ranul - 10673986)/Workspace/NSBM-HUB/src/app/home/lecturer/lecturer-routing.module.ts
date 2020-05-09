import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerPage } from './lecturer.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerPageRoutingModule {}
