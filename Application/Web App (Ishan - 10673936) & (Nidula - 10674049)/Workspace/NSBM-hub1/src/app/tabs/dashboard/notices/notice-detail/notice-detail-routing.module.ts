import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeDetailPage } from './notice-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeDetailPage
  },
  {
    path: 'edit/:noticeId',
    loadChildren: () => import('./notice-edit/notice-edit.module').then( m => m.NoticeEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeDetailPageRoutingModule {}
