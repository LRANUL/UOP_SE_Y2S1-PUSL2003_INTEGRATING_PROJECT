import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModulesPage } from './modules.page';

const routes: Routes = [
  {
    path: '',
    component: ModulesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulesPageRoutingModule {}
