import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAccountDetailsModalPage } from './update-account-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAccountDetailsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAccountDetailsModalPageRoutingModule {}
