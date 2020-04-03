import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPanelPage } from './notifications-panel.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPanelPageRoutingModule {}
