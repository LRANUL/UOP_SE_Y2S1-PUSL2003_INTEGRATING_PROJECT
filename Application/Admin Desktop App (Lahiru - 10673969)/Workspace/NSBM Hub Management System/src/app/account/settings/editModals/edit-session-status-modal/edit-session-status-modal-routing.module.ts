import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSessionStatusModalPage } from './edit-session-status-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditSessionStatusModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSessionStatusModalPageRoutingModule {}
