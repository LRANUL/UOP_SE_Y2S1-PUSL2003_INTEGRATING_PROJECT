import { Component, OnInit } from '@angular/core';

import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AboutModalPage } from './about-modal/about-modal.page';
import { RegisterModalPage } from './register-modal/register-modal.page';


import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../types';

import { FirestoreService } from '../services/firebase/firestore.service';

import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Retrieving the user entered value
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Implementation of error messages
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid password' },
      { type: 'minlength', message: 'Password invalid length' }
    ]
  }


  loginForm = this.formBuilder.group({
    email: ["", [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%-]+@[nsbm.lk]+')
    ] ],
    password: ["", [
      Validators.required, 
      Validators.pattern('[a-zA-Z0-9]+[!@#$%^&*]?'),
      Validators.minLength(10)
    ] ]
  });

  constructor(
    private _router: Router,
    private _loginService: FirestoreService,
    private formBuilder: FormBuilder,
    private modalController:ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private angularFireAuth: AngularFireAuth
  ) {
    
  }

  // Displays the entered values into the console
  public submit(){
    console.log(this.loginForm.value);
  }


  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();

  }

  // Login operation implementation
  async login(){
    const loading = await this.loadingController.create({
      message: 'Logging In..',
      duration: 2000
    });

    await loading.present();

    const loginCredentials: LoginCredential = this.loginForm.value;
    this._loginService.login(loginCredentials)
      .then((authData)=> {
        this._router.navigate(["/side-menu/dashboard"]);
        console.log("Authentication (Login) Successful, ",authData);
        console.log(firebase.auth().currentUser);
        console.log(firebase.auth().currentUser.uid);
      })
      .catch((authError)=> {
        console.log("Authentication Error: ", authError);
        this.alertNotice("Error", "Login process failed, " + authError);
      });

  }



  async OpenAboutModal(){  // Implementation for opening the 'about' modal

    this.modalController.create({
      component:AboutModalPage,
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    }).then((modalElement)=>{
      modalElement.present();
    });
    
  }

  OpenRegisterModal(){  // Implementation for opening the 'register' modal

    this.modalController.create({
      component:RegisterModalPage,
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    }).then((modalElement)=>{
      modalElement.present();
    });
    
  }

  ngOnInit() {


    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {

        // If user is logged in
        console.log('User is Logged In');
        const loading = await this.loadingController.create({
          message: 'Logging In..',
          duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();
        console.log('Loading spinner dismissed');

        // Navigating to the dashboard
        this._router.navigate(["/side-menu/dashboard"]);
      }
      else {
        // If user is not logged in
        console.log('User is NOT Logged In');

      }
    });


  }

}
