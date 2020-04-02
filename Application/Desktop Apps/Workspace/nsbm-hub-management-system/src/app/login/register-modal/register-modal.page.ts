import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.page.html',
  styleUrls: ['./register-modal.page.scss'],
})
export class RegisterModalPage implements OnInit {

  newUserRegistrationForm: FormGroup;
  

  constructor(
    private modalController:ModalController,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) { }

  CloseRegisterModal(){ // Implementation for closing the 'register' modal
    this.modalController.dismiss();
  }

  ngOnInit() {

    this.newUserRegistrationForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      middleName: new FormControl(''),
      lastName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      NSBMEmailAddress: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%-]+@[nsbm.lk]+')
      ])),
      faculty: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+[!@#$%^&*]?')
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+[!@#$%^&*]?')
      ])),
      termsAndConditionsCheckbox: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });

  }



  // Alert Box Implementation (Send New User Details)
  async sendNewUserDetailsConfirmation(title: string, content: string, value) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Confirmation request cancelled");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            this.doNewUserRegistration(value);

          }
        }

      ]
    });

    await alert.present();

  }



  doNewUserRegistration(value){
console.log("1");

    this.loginService.newUserRegistorDetailsVerification(value);
  }

}


