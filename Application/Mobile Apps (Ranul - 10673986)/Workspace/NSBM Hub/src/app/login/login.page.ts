import { ServicesService } from './../services.service';
import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { NavController } from "@ionic/angular";
import { constructor } from 'firebase';
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
    private network: Network
  ) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
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

    this.navCtrl.navigateForward("/welcome");
  }
}





