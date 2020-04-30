import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShuttleSchedulePage } from './shuttle-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ShuttleSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShuttleSchedulePageRoutingModule {}
