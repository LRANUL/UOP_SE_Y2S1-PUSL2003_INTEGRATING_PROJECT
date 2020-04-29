import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditModuleModalPage } from './edit-module-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditModuleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditModuleModalPageRoutingModule {}
