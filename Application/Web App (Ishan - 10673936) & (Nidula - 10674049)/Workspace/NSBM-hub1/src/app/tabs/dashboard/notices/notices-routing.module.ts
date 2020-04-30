import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesPage } from './notices.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesPage,
    
    
  },
  {
    path: 'new',
    loadChildren: () => import('./new-notice/new-notice.module').then( m => m.NewNoticePageModule)
  },

  

  {
    path: ':noticeId',
    loadChildren: () => import('./notice-detail/notice-detail.module').then( m => m.NoticeDetailPageModule),
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}
