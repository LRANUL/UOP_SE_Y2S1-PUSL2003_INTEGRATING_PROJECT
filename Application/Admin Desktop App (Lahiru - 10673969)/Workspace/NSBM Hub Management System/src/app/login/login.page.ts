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

  // Loading spinner
  loginLoadingSpinner: Boolean = false;

  // Splash screen
  splashContent: Boolean = true;

  // Login content
  loginContent: Boolean = false;

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
      //Validators.pattern('[a-zA-Z0-9._%-]+@[nsbm.lk]+')
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
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
  ) {}



  ngOnInit() {

    // Setting timere for the splash screen
    setTimeout(() => {
      this.splashContent = false;
      this.loginContent = true;
    },5000);

    firebase.auth().onAuthStateChanged(async (user) => {

      // Setting loading spinner to spin
      this.loginLoadingSpinner = true;

      if (user) {


        // Checking if logged in user type in a lecturer user
        this._loginService.retrieveLoggedInUserDetailsLecturer(this._loginService.retrieveLoggedInUserDetailsAuth().uid).subscribe(response => {
          if (response.length > 0) {

            // Setting loading spinner to stop spinning
            this.loginLoadingSpinner = false;

            this._router.navigate(["/login"]);

            if(firebase.auth().currentUser){
              firebase.auth().signOut()
                .then(() => {
                  console.log("Logout Successful");
                }).catch((error) => {
                  console.log("Logout Process Failed, " + error);
                  this.alertNotice("Error", "Logout Process Failed, " + error);
                });
            }

          }
          else {
            // console.log("Record not found in lecturer users collection");
          }
        }, error => {
            // Setting loading spinner to spin
            this.loginLoadingSpinner = true;
            console.log("Error: " + error);
            this.alertNotice("Error", "An error has occurred: " + error);
        });

        // Checking if logged in user type in a program office user
        this._loginService.retrieveLoggedInUserDetailsProgramOffice(this._loginService.retrieveLoggedInUserDetailsAuth().uid).subscribe(response => {
            if (response.length > 0) {

                // Setting loading spinner to stop spinning
                this.loginLoadingSpinner = false;

                /* Process of checking account status is ACTIVE or not */
                let resgisteredProgramOfficeUser = response;
                let programOfficeUserAccountStatus;

                // Retrieving the account status of this program office user account
                resgisteredProgramOfficeUser.forEach(document => {
                    let firestoreDoc: any = document.payload.doc.data();
                    programOfficeUserAccountStatus = firestoreDoc.status;
                });
                
                // Checking if the program office user account is active
                if(programOfficeUserAccountStatus == "Active"){

                  // Adding new login record to user activity monitoring collection to firestore database
                  this._loginService.userActivityMonitoring(this._loginService.retrieveLoggedInUserDetailsAuth().uid, this._loginService.retrieveLoggedInUserDetailsAuth().email);

                  // Navigating to the dashboard
                  this._router.navigate(["/side-menu/dashboard"]);

                }
                else{
                  this.alertNotice("Account Deactivated", "Account has been deactivated. Please contact Web Administrator.");
                  this._loginService.logout();
                  this._router.navigate(["/login"]);
                }

            }
            else {
                // console.log("Record not found in program office users collection");
            }
        }, error => {
            // Setting loading spinner to stop spinning
            this.loginLoadingSpinner = false;

            // console.log("Error: " + error);
            this.alertNotice("Error", "An error has occurred: " + error);
        });


      }
      else {
        // If user is not logged in
        console.log('User is NOT Logged In');

        this.loginLoadingSpinner = false;
      }
    });
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

    // Setting loading spinner to spin
    this.loginLoadingSpinner = true;

    const loginCredentials: LoginCredential = this.loginForm.value;
    this._loginService.login(loginCredentials)
      .then((authData)=> {
        this._router.navigate(["/side-menu/dashboard"]);
        console.log("Authentication (Login) Successful, ",authData);
        console.log(firebase.auth().currentUser);
        console.log(firebase.auth().currentUser.uid);

        // Setting loading spinner to stop spinning
        this.loginLoadingSpinner = false;
      })
      .catch((authError)=> {
        console.log("Authentication Error: ", authError);
        this.alertNotice("Error", "Login process failed, " + authError);

        // Setting loading spinner to stop spinning
        this.loginLoadingSpinner = false;
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

  

}
