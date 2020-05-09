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

import { MaterialModule } from './material.module';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { EditLectureSessionModalPageModule } from './account/semester-calendar/edit-lecture-session-modal/edit-lecture-session-modal.module';

import { MoreDetailsSessionPopoverPageModule } from './account/semester-calendar/more-details-session-popover/more-details-session-popover.module';

import { MoreDetailsModulePopoverPageModule } from './account/modules/more-details-module-popover/more-details-module-popover.module';
import { EditModuleModalPageModule } from './account/modules/edit-module-modal/edit-module-modal.module';
import { MoreDetailsTodaysLecturesPopoverPageModule } from './account/dashboard/more-details-todays-lectures-popover/more-details-todays-lectures-popover.module';
import { ViewImageNoticeModalPageModule } from './account/notices/view-image-notice-modal/view-image-notice-modal.module';
import { MoreDetailsLecturesPopoverPageModule } from './account/dashboard/more-details-lectures-popover/more-details-lectures-popover.module';
import { EditEventSessionModalPageModule } from './account/events/edit-event-session-modal/edit-event-session-modal.module';
import { EditTransportSlotModalPageModule } from './account/transportation-schedule/edit-transport-slot-modal/edit-transport-slot-modal.module';
import { MoreDetailsLecturersPoPopoverPageModule } from './account/notices/more-details-lecturers-po-popover/more-details-lecturers-po-popover.module';
import { MoreDetailsPoLecturersPopoverPageModule } from './account/notices/more-details-po-lecturers-popover/more-details-po-lecturers-popover.module';
import { MoreDetailsPoStudentsPopoverPageModule } from './account/notices/more-details-po-students-popover/more-details-po-students-popover.module';
import { EditPoToLecturersNoticesModalPageModule } from './account/notices/edit-po-to-lecturers-notices-modal/edit-po-to-lecturers-notices-modal.module';
import { EditPoToStudentsNoticesModalPageModule } from './account/notices/edit-po-to-students-notices-modal/edit-po-to-students-notices-modal.module';
import { EditBatchModalPageModule } from './account/settings/editModals/edit-batch-modal/edit-batch-modal.module';
import { EditDegreeProgramModalPageModule } from './account/settings/editModals/edit-degree-program-modal/edit-degree-program-modal.module';
import { EditCreditWeightingModalPageModule } from './account/settings/editModals/edit-credit-weighting-modal/edit-credit-weighting-modal.module';
import { EditLectureHallModalPageModule } from './account/settings/editModals/edit-lecture-hall-modal/edit-lecture-hall-modal.module';
import { EditSessionStatusModalPageModule } from './account/settings/editModals/edit-session-status-modal/edit-session-status-modal.module';
import { EditUserAccountStatusModalPageModule } from './account/settings/editModals/edit-user-account-status-modal/edit-user-account-status-modal.module';
import { EditNoticeCategoryModalPageModule } from './account/settings/editModals/edit-notice-category-modal/edit-notice-category-modal.module';
import { EditNewsCategoryModalPageModule } from './account/settings/editModals/edit-news-category-modal/edit-news-category-modal.module';
import { UpdateAccountDetailsModalPageModule } from './account/settings/update-account-details-modal/update-account-details-modal.module';
import { UpdateAccountPasswordModalPageModule } from './account/settings/update-account-password-modal/update-account-password-modal.module';
import { EditLectureSeriesModalPageModule } from './account/semester-calendar/edit-lecture-series-modal/edit-lecture-series-modal.module';
import { NotificationsPopoverPageModule } from './account/notifications-popover/notifications-popover.module';
import { MoreDetailsEventPopoverPageModule } from './account/dashboard/more-details-event-popover/more-details-event-popover.module';
import { EditNewsItemModalPageModule } from './account/news/edit-news-item-modal/edit-news-item-modal.module';
import { MoreInformationPopoverPageModule } from './account/settings/more-information-popover/more-information-popover.module';




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
    MaterialModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    EditLectureSessionModalPageModule,
    MoreDetailsSessionPopoverPageModule,
    MoreDetailsModulePopoverPageModule,
    EditModuleModalPageModule,
    MoreDetailsEventPopoverPageModule,
    MoreDetailsTodaysLecturesPopoverPageModule,
    MoreDetailsLecturesPopoverPageModule,
    ViewImageNoticeModalPageModule,
    EditEventSessionModalPageModule,
    EditTransportSlotModalPageModule,
    MoreDetailsPoStudentsPopoverPageModule,
    MoreDetailsPoLecturersPopoverPageModule,
    EditPoToStudentsNoticesModalPageModule,
    EditPoToLecturersNoticesModalPageModule,
    EditBatchModalPageModule,
    EditDegreeProgramModalPageModule,
    EditBatchModalPageModule,
    EditCreditWeightingModalPageModule,
    EditLectureHallModalPageModule,
    EditSessionStatusModalPageModule,
    EditUserAccountStatusModalPageModule,
    EditNoticeCategoryModalPageModule,
    EditNewsCategoryModalPageModule,
    UpdateAccountDetailsModalPageModule,
    UpdateAccountPasswordModalPageModule,
    EditLectureSeriesModalPageModule,
    NotificationsPopoverPageModule,
    EditNewsItemModalPageModule,
    MoreInformationPopoverPageModule
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
