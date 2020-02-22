import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuPage } from './side-menu.page';


const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'notices',
        loadChildren: '../notices/notices.module#NoticesPageModule'
      }
    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule {}
