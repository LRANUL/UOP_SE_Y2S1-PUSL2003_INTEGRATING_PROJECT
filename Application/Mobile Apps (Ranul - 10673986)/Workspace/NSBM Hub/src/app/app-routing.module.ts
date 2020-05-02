import {WelcomePage} from './welcome/welcome.page';

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
    },
    {
        path: "login",
        loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: "",
        loadChildren: () => import ("./tabs/tabs.module").then(m => m.TabsPageModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
    }, {
        path: 'home/calendar',
        loadChildren: () => import('./home/calendar/calendar.module').then(m => m.CalendarPageModule)
    }, {
        path: '',
        loadChildren: () => import('./home/facilities/facilities.module').then(m => m.FacilitiesPageModule)
    }, {
        path: 'guest',
        loadChildren: () => import('./guest/guest.module').then(m => m.GuestPageModule)
    },  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule) },
  { path: 'facilities', loadChildren: () => import('./facilities/facilities.module').then(m => m.FacilitiesPageModule) },



];
@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

    public rootPage : any = WelcomePage;
}
