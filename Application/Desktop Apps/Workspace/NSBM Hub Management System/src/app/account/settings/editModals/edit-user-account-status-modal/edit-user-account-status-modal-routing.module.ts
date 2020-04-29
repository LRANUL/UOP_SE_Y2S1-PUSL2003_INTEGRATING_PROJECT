import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUserAccountStatusModalPage } from './edit-user-account-status-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditUserAccountStatusModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUserAccountStatusModalPageRoutingModule {}
