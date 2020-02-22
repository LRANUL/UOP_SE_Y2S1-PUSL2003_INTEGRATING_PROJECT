import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AboutModalPage } from './about-modal/about-modal.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginCredential } from '../types';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';



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
    private _loginService: LoginService,
    private formBuilder: FormBuilder,
    private modalController:ModalController
  ) {}

  // Displays the entered values into the console
  public submit(){
    console.log(this.loginForm.value);
  }


  login(){
    const loginCredentials: LoginCredential = this.loginForm.value;
    this._loginService.login(loginCredentials)
      .then((authData)=> {
        this._router.navigate(["/side-menu/dashboard"]);
        console.log("Authentication Successful",authData);
      })
      .catch((authError)=> {
        console.log("Authentication Error: ", authError);
      });

  }



  OpenModal(){  // Implementation for opening the 'about' modal
    this.modalController.create({component:AboutModalPage}).then((modalElement)=>{
      modalElement.present();
    })
  }

  ngOnInit() {
  }

}
