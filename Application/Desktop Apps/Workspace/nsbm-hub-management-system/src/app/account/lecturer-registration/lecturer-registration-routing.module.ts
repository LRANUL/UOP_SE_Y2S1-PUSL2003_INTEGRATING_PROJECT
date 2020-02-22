import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LecturerRegistrationPage } from './lecturer-registration.page';

const routes: Routes = [
  {
    path: '',
    component: LecturerRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LecturerRegistrationPageRoutingModule {}
