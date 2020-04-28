import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAccountPasswordModalPage } from './update-account-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAccountPasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAccountPasswordModalPageRoutingModule {}
