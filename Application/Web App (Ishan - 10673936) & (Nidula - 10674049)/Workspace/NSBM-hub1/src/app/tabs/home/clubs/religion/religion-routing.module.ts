import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReligionPage } from './religion.page';

const routes: Routes = [
  {
    path: '',
    component: ReligionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReligionPageRoutingModule {}
