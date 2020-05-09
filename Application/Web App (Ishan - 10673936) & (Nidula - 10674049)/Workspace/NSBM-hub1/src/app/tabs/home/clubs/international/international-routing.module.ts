import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternationalPage } from './international.page';

const routes: Routes = [
  {
    path: '',
    component: InternationalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternationalPageRoutingModule {}
