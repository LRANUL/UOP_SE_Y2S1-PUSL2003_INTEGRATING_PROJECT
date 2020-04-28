import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPopoverPage } from './notifications-popover.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPopoverPageRoutingModule {}
