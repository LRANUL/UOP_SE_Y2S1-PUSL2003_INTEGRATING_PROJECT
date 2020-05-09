import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsignPage } from './esign.page';

const routes: Routes = [
  {
    path: '',
    component: EsignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsignPageRoutingModule {}
