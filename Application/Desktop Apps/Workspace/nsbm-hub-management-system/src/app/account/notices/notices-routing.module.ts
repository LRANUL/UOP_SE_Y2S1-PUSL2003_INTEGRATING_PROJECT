import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesPage } from './notices.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesPage
  },
  {
    path: 'more-details-notice-popover',
    loadChildren: () => import('./more-details-notice-popover/more-details-notice-popover.module').then( m => m.MoreDetailsNoticePopoverPageModule)
  },
  {
    path: 'view-image-notice-modal',
    loadChildren: () => import('./view-image-notice-modal/view-image-notice-modal.module').then( m => m.ViewImageNoticeModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}
