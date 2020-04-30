import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Guest/home/home.component';
import { FacultiesComponent } from './Guest/faculties/faculties.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LocationComponent } from './Guest/location/location.component';
import { SportsComponent } from './Guest/sports/sports.component';
import { AcademicComponent } from './Guest/academic/academic.component';
import { ActivityComponent } from './Guest/activity/activity.component';
import { InternationalActivityComponent } from './Guest/international-activity/international-activity.component';
import { ReligiousComponent } from './Guest/religious/religious.component';
import { DiscoverComponent } from './Guest/discover/discover.component';
import { InternationalComponent } from './Guest/international/international.component';
import { BusinessComponent } from './Guest/business/business.component';
import { ComputingComponent } from './Guest/computing/computing.component';
import { EngineringComponent } from './Guest/enginering/enginering.component';
import { NewsComponent } from './Guest/news/news.component';
import { LifeAtNsbmComponent } from './Guest/life-at-nsbm/life-at-nsbm.component';
import { CalendarComponent } from './Guest/calendar/calendar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';


const routes: Routes = [
{path:'', component: AuthComponent},
{path:'guest', component: HomeComponent},
{path:'faculties', component: FacultiesComponent},
{path:'login', component: AuthComponent},
{path: 'about us' , component: AboutUsComponent},
{path: 'location' , component: LocationComponent},
{path: 'Sports clubs' , component: SportsComponent},
{path: 'Academic clubs' , component: AcademicComponent},
{path: 'Activity clubs' , component: ActivityComponent},
{path: 'International clubs' , component: InternationalActivityComponent},
{path: 'Religious clubs' , component: ReligiousComponent},
{path: 'Discover NSBM' , component: DiscoverComponent},
{path: 'international' , component: InternationalComponent},
{path: 'business' , component: BusinessComponent},
{path: 'computing' , component: ComputingComponent},
{path: 'enginering' , component: EngineringComponent},
{path: 'news' , component: NewsComponent},
{path: 'life at NSBM' , component: LifeAtNsbmComponent},
{path: 'calender' , component: CalendarComponent},
{path: 'registration' , component: RegistrationComponent},
{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
