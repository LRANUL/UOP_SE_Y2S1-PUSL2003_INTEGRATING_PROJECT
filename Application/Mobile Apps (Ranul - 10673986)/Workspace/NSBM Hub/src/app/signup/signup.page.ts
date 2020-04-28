import { firebaseConfig } from './../app.module';
import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  students: any;
  FirstName: string;
  LastName: string;
  ID: number;

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

  constructor(
    private navCtrl: NavController,
    private authService: ServicesService,
    private formBuilder: FormBuilder,
    private network: Network

  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      fName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      mName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      lName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')
      ])),
      faculty: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])),
      degree: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ])),
      batch: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9]{2}\.[0-9]{1,1})$')
      ])),
      sid: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{8}$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  goLoginPage() {
    this.navCtrl.navigateForward("/login");


  }


}





