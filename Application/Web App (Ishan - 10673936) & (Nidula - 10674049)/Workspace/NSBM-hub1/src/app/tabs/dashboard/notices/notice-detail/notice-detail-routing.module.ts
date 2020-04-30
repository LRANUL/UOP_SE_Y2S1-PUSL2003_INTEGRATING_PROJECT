import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeDetailPage } from './notice-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeDetailPageRoutingModule {}
