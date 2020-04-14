import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulesPage } from './modules.page';

const routes: Routes = [
  {
    path: '',
    component: ModulesPage
  },
  {
    path: 'more-details-module-popover',
    loadChildren: () => import('./more-details-module-popover/more-details-module-popover.module').then( m => m.MoreDetailsModulePopoverPageModule)
  },
  {
    path: 'edit-module-modal',
    loadChildren: () => import('./edit-module-modal/edit-module-modal.module').then( m => m.EditModuleModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesPageRoutingModule {}
