import {WelcomePage} from './welcome/welcome.page';

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
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
        path: 'guest',
        loadChildren: () => import('./guest/guest.module').then(m => m.GuestPageModule)
    },
    {
        path: 'home/esign',
        loadChildren: () => import('./home/esign/esign.module').then(m => m.EsignPageModule)
    },
    {
        path: 'home/lecturer',
        loadChildren: () => import('./home/lecturer/lecturer.module').then(m => m.LecturerPageModule)
    }
 


];
@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
