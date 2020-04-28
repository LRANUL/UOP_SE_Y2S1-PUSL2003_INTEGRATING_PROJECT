import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'side-menu', loadChildren: './account/side-menu/side-menu.module#SideMenuPageModule' },  {
    path: 'notifications-popover',
    loadChildren: () => import('./account/notifications-popover/notifications-popover.module').then( m => m.NotificationsPopoverPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
