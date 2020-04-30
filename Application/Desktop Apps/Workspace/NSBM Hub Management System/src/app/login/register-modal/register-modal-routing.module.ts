import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterModalPage } from './register-modal.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterModalPageRoutingModule {}
