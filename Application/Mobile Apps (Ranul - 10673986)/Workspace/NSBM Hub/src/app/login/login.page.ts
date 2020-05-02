import { ServicesService } from './../services.service';
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { NavController } from "@ionic/angular";
import { constructor } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})

export class Login implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = "";
  userEmail: string;
  public show: boolean = false;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private firestore: AngularFirestore,
    public alertController: AlertController,
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
    this.validations_form = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.minLength(5), Validators.required])
      )
    });
  }

  validation_messages = {
    email: [
      { type: "required", message: "Your NSBM University Email is required." },
      { type: "pattern", message: "Please enter a valid email." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 5 characters long."
      }
    ]
  };

  async loginUser(value) {
    this.authService.loginUser(value).then(
      async res => {
        console.log(res);
        this.errorMessage = "";
        this.firestore.collection('/users/userTypes/studentUsers').doc(this.authService.userDetails().email).ref.get().then(async (doc) => {
          if (doc.data().status.toString() == "Active") {
            const loading = await this.loadingController.create({
              message: 'Logging in...',
              duration: 2000
            });

            await loading.present();

            const { role, data } = await loading.onDidDismiss();
            console.log('Loading dismissed!');
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

    this.navCtrl.navigateForward("/welcome");
  }
}





