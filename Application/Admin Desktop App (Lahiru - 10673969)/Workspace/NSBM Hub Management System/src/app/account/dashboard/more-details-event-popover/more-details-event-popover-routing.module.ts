import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsEventPopoverPage } from './more-details-event-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsEventPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsEventPopoverPageRoutingModule {}
