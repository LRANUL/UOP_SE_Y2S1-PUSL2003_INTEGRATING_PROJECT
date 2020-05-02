import { ThemeService } from './../theme.service';
import { ServicesService } from './../services.service';
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { NavController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
;
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class settingsPage {

  userEmail: string;
  Status: any;
  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    public loadingController: LoadingController,
    private ThemeService: ThemeService,
    public storage: Storage,
    public alertController: AlertController,
    public toastController: ToastController,
    private firebase: ServicesService,
    private firestore: AngularFirestore,
  ) {
    storage.ready().then(() => {
      storage.get('Status').then((val) => {
        this.Status = val;
      })
    });

  }

  Toggle() {
    this.storage.set('Status', this.Status);
  }


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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'New Password'

        },
      ],
      message: this.authService.userDetails().email,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Change',
          handler: async (alertData) => {
            var user = firebase.auth().currentUser;
            var newPassword = alertData.password;
            user.updatePassword(newPassword).then(async function () {
              console.log('Password Updated')
              
            }
            ).catch(function (error) {
              // An error happened.
            });
            const toast = await this.toastController.create({
              message: 'Your password has been updated.',
              duration: 2000
            });
            toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    this.firestore.collection('/users/userTypes/studentUsers').doc(this.authService.userDetails().email).set({
      accountActivity: 'Offline',
    }, { merge: true });
    this.authService
      .logoutUser()
      .then(async res => {
        console.log(res);
        const loading = await this.loadingController.create({
          message: 'Logging out...',
          duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed!');

        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }
}