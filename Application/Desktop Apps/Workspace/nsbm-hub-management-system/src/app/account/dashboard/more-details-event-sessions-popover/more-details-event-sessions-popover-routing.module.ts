import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoreDetailsEventSessionsPopoverPage } from './more-details-event-sessions-popover.page';

const routes: Routes = [
  {
    path: '',
    component: MoreDetailsEventSessionsPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoreDetailsEventSessionsPopoverPageRoutingModule {}
