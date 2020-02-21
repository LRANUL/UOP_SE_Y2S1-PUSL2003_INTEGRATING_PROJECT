import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AboutModalPage } from './about-modal/about-modal.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
      { type: 'minlength', message: 'Length' }
    ],
    password: [
      { type: 'required', message: 'Password is required' }
    ]
  }


  loginForm = this.formBuilder.group({
    email: ["", [Validators.required, Validators.minLength(4)] ],
    password: ["", [Validators.required] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private modalController:ModalController
  ) {}

  // Displays the entered values into the console
  public submit(){
    console.log(this.loginForm.value);
  }



  OpenModal(){  // Implementation for opening the 'about' modal
    this.modalController.create({component:AboutModalPage}).then((modalElement)=>{
      modalElement.present();
    })
  }

  ngOnInit() {
  }

}
