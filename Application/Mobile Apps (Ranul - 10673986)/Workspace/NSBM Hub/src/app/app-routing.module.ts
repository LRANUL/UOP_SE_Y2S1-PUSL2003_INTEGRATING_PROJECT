import {WelcomePage} from './welcome/welcome.page';

import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './welcome/welcome.module#WelcomePageModule'
    },
    {
        path: "login",
        loadChildren: "./login/login.module#LoginPageModule"
    },
    {
        path: "",
        loadChildren: () => import ("./tabs/tabs.module").then(m => m.TabsPageModule)
    },
    {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupPageModule'
    }, {
        path: 'home/calendar',
        loadChildren: './home/calendar/calendar.module#CalendarPageModule'
    }, {
        path: '',
        loadChildren: './home/facilities/facilities.module#FacilitiesPageModule'
    }, {
        path: 'guest',
        loadChildren: './guest/guest.module#GuestPageModule'
    },  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'facilities', loadChildren: './facilities/facilities.module#FacilitiesPageModule' },



];
@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

    public rootPage : any = WelcomePage;
}
