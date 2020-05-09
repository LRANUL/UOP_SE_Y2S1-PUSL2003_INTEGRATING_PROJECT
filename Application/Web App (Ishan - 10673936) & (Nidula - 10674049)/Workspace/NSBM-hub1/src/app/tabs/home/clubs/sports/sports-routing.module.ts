import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportsPage } from './sports.page';

const routes: Routes = [
  {
    path: '',
    component: SportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsPageRoutingModule {}
