import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeTablePage } from './time-table.page';

const routes: Routes = [
  {
    path: '',
    component: TimeTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeTablePageRoutingModule {}
