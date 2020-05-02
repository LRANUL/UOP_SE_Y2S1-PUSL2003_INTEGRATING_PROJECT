import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ServicesService } from './../services.service';
import * as firebase from "firebase";
import { LoadingController, NavController, AlertController } from '@ionic/angular';
;
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = "";
  userEmail: string;
  public show: boolean = false;
  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 400
  };

  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private firestore: AngularFirestore,
  ) { }


  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        this.firestore.collection('/users/userTypes/studentUsers').doc(this.authService.userDetails().email).ref.get().then(async (doc) => {
          if (doc.data().status.toString() == "Active") {
            // User is signed in.
            console.log('User is signed in');
            const loading = await this.loadingController.create({
              message: 'Please wait...',
              duration: 2000
            });
            await loading.present();

            const { role, data } = await loading.onDidDismiss();
            console.log('Loading dismissed!');

            this.userEmail = this.authService.userDetails().email;
            this.navCtrl.navigateForward("tabs/home");
          }
          else {
            this.authService.logoutUser()
            const loading = await this.loadingController.create({
              message: 'Session Closing...',
              duration: 2000
            });
            await loading.present();
            const { role, data } = await loading.onDidDismiss();
            console.log('Loading dismissed!');
            const alert = await this.alertController.create({
              header: 'Account Disabled',
              subHeader: 'Contact Program Office',
              message: 'You cannot access the NSBM HUB as your account is disabled !',
              buttons: ['OK']
            });
            await alert.present();
          }
        })
      }
      else {
        // No user is signed in.
        console.log('User is NOT signed in');

      }
    });
  };

  async loginUser(value) {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    this.authService.loginUser(value).then(
      async res => {
        console.log(res);
        this.errorMessage = "";

        this.navCtrl.navigateForward("tabs/home");
      },
      err => {
        this.errorMessage = err.message;
      }
    );
  }
  goToRegisterPage() {
    this.navCtrl.navigateForward("/signup");
  }
  goToGuestPage() {
    console.log("Guest Logging in...");

    this.navCtrl.navigateForward("/guest");
  }
  goToLoginPage() {
    console.log("Guest Logging in...");

    this.navCtrl.navigateForward("/login");
  }
}

// let disconnectSubscription = this.network.onDisconnect().subscribe(async () => {
//   console.log('network was disconnected :-(');

//   const alert = await this.alertController.create({
//     header: 'No Network',
//     subHeader: 'Connectivity Lost',
//     message: 'We are not sensing any network connections, please connect to continue using.',
//     backdropDismiss: false
//   });

//   await alert.present();

// });


// disconnectSubscription.unsubscribe();



// let connectSubscription = this.network.onConnect().subscribe(() => {
//   console.log('network connected!');
//   setTimeout(async () => {
//     console.log('we got a wifi connection, woohoo!');
//     const alert = await this.alertController.create({
//       header: 'Connected',
//       subHeader: 'Connection Established',
//       message: 'Please wait while we preparing your content.',
//       backdropDismiss: false
//     });

//     await alert.present();
//   }, 2000);
// });

// // stop connect watch
// connectSubscription.unsubscribe();