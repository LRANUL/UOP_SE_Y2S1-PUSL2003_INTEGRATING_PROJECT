import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicesService } from '../services.service';
import { ThemeService } from './../theme.service';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class homePage implements OnInit {
  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    private ThemeService: ThemeService,
    private InAppBrowser: InAppBrowser,
    private network: Network
  ) { }

  ngOnInit() {
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
    } else {
      this.navCtrl.navigateBack("");
    }
  }


  DarkMode() {
    this.ThemeService.toggleAppTheme();
  }
  openLMS() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://lmsnew.nsbm.lk/my/', '_blank', options);

  }
  openOutlook() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://outlook.office.com/mail/inbox', '_blank', options);

  }
  openOffice365() {
    const options: InAppBrowserOptions = {
      zoom: 'no',
      location: 'no',
    }
    const browser = this.InAppBrowser.create('https://www.office.com/?auth=2', '_blank', options);

  }
  openCalender() {
    this.navCtrl.navigateRoot("/calendar");
  }
  openFacilities(){}
  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }

}