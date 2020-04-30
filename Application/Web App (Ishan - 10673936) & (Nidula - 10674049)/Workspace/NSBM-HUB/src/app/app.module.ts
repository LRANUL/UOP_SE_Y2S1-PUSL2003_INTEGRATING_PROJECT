import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {AgmCoreModule} from '@agm/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './Guest/home/home.component';
import { HeaderComponent } from './Guest/header/header.component';
import { AcademicComponent } from './Guest/academic/academic.component';
import { ActivityComponent } from './Guest/activity/activity.component';
import { BusinessComponent } from './Guest/business/business.component';
import { CalendarComponent } from './Guest/calendar/calendar.component';
import { ComputingComponent } from './Guest/computing/computing.component';
import { DiscoverComponent } from './Guest/discover/discover.component';
import { EngineringComponent } from './Guest/enginering/enginering.component';
import { FacultiesComponent } from './Guest/faculties/faculties.component';
import { InternationalComponent } from './Guest/international/international.component';
import { InternationalActivityComponent } from './Guest/international-activity/international-activity.component';
import { LifeAtNsbmComponent } from './Guest/life-at-nsbm/life-at-nsbm.component';
import { LocationComponent } from './Guest/location/location.component';
import { NewsComponent } from './Guest/news/news.component';
import { ReligiousComponent } from './Guest/religious/religious.component';
import { SportsComponent } from './Guest/sports/sports.component';
import { RegistrationComponent } from './auth/registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AboutUsComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    AcademicComponent,
    ActivityComponent,
    BusinessComponent,
    CalendarComponent,
    ComputingComponent,
    DiscoverComponent,
    EngineringComponent,
    FacultiesComponent,
    InternationalComponent,
    InternationalActivityComponent,
    LifeAtNsbmComponent,
    LocationComponent,
    NewsComponent,
    ReligiousComponent,
    SportsComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFfCdAIhkH0DXw5RqBXx2vasksmR_5bOc'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
