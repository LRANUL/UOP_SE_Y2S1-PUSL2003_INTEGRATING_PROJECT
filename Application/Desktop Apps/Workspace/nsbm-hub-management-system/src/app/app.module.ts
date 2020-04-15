import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth"; 
import { environment } from "../environments/environment";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModalPageModule } from './login/about-modal/about-modal.module';
import { RegisterModalPageModule } from './login/register-modal/register-modal.module';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { FirestoreService } from './services/firebase/firestore.service';

import { NgCalendarModule } from 'ionic2-calendar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTooltipModule } from '@angular/material';

import { EditLectureSessionModalPageModule } from './account/semester-calendar/edit-lecture-session-modal/edit-lecture-session-modal.module';

import { MoreDetailsSessionPopoverPageModule } from './account/semester-calendar/more-details-session-popover/more-details-session-popover.module';

import { MoreDetailsModulePopoverPageModule } from './account/modules/more-details-module-popover/more-details-module-popover.module';
import { EditModuleModalPageModule } from './account/modules/edit-module-modal/edit-module-modal.module';
import { MoreDetailsTodaysLecturesPopoverPageModule } from './account/dashboard/more-details-todays-lectures-popover/more-details-todays-lectures-popover.module';
import { MoreDetailsEventSessionsPopoverPageModule } from './account/dashboard/more-details-event-sessions-popover/more-details-event-sessions-popover.module';
import { MoreDetailsNoticePopoverPageModule } from './account/notices/more-details-notice-popover/more-details-notice-popover.module';
import { ViewImageNoticeModalPageModule } from './account/notices/view-image-notice-modal/view-image-notice-modal.module';
import { MoreDetailsLecturesPopoverPageModule } from './account/dashboard/more-details-lectures-popover/more-details-lectures-popover.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig), // Requires the firebase config information as parameters. These will be retrieved from the environments.ts file.
    AngularFireAuthModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AboutModalPageModule,
    RegisterModalPageModule,
    NgCalendarModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    EditLectureSessionModalPageModule,
    MoreDetailsSessionPopoverPageModule,
    MoreDetailsModulePopoverPageModule,
    EditModuleModalPageModule,
    MoreDetailsEventSessionsPopoverPageModule,
    MoreDetailsTodaysLecturesPopoverPageModule,
    MoreDetailsLecturesPopoverPageModule,
    ViewImageNoticeModalPageModule,
    MoreDetailsNoticePopoverPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
