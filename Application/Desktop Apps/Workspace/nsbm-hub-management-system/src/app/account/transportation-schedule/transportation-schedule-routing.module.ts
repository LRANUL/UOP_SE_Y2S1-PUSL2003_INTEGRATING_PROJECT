import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportationSchedulePage } from './transportation-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: TransportationSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportationSchedulePageRoutingModule {}
