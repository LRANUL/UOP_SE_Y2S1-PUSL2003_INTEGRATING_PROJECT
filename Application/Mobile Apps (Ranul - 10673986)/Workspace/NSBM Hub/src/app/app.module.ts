import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ServicesService } from "./services.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import * as firebase from "firebase";
import { ReactiveFormsModule } from '@angular/forms';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Network } from '@ionic-native/network/ngx';

firebase.initializeApp(environment.firebase);
export const firebaseConfig = {
  apiKey: "AIzaSyCfLDvT7GmvC91O55qGoIYxloWBJu1AYws",
  authDomain: "pusl2003-be5c8.firebaseapp.com",
  databaseURL: "https://pusl2003-be5c8.firebaseio.com",
  projectId: "pusl2003-be5c8",
  storageBucket: "pusl2003-be5c8.appspot.com",
  messagingSenderId: "435147747566",
  appId: "1:435147747566:web:7c7695c8c41f081f6a43ff",
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ServicesService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InAppBrowser,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
