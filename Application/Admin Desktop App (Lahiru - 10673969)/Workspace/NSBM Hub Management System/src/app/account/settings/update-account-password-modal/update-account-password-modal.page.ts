import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, PopoverController, ToastController, LoadingController } from '@ionic/angular';
import { MoreInformationPopoverPage } from '../more-information-popover/more-information-popover.page';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-account-password-modal',
  templateUrl: './update-account-password-modal.page.html',
  styleUrls: ['./update-account-password-modal.page.scss'],
})
export class UpdateAccountPasswordModalPage implements OnInit {

  
  updateAccountPasswordForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private popoverController: PopoverController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {

    this.updateAccountPasswordForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+[!@#$%^&*]?'),
        Validators.minLength(10)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]+[!@#$%^&*]?'),
        Validators.minLength(10)
      ]))
    });
    
  }



  

  doUpdateAccountPassword(value){
    // Checking if the entered password and confirm password is the same
    if(value.password == value.confirmPassword){
      this.updateAccountPassword('Confirmation','Current password will be updated with the entered value, do you want to continue?', value)
    }
    else if(value.password != value.confirmPassword){
      console.log("Password and Confirm Password doesn't contain similar values");
      this.alertNotice("Password Mismatch", "Entered passwords in the fields are not the same. Please Recheck.");
    }
  }

  // Confirm Box Implementation (Update account password confirmation box)
  async updateAccountPassword (title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Update Account Password Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: async () => {
            console.log("Alert Box: Update Account Password Request Accepted");

            // Updating account password of the currently logged in user
            let loggedInUser = firebase.auth().currentUser;
            let newAccountPassword = value.confirmPassword 
            loggedInUser.updatePassword(newAccountPassword).then(async function () {
            //  this.alertNoticeHeaderOnly("Account Password Updated");
            }
            ).catch(function (error) {
              console.log("Error: " + error);
            //  this.alertNotice("Error: ", "An error has occurred: " + error);
            });

            // Loading spinner
            const loading = await this.loadingController.create({
              message: 'Updating Password',
              duration: 1000
            });
        
            await loading.present();

            // Confirmation alert box
            this.alertNoticeHeaderOnly("Account Password Updated");
          }
        }
      ]
    });
    await alert.present();
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

  // Alert Box with header text only implementation
  async alertNoticeHeaderOnly ( title: string ) {
    const alert = await this.alertController.create({
      header: title,
      buttons: ['OK']
    });
    await alert.present();
  }



  // Opening more information popover
  async openMoreInformationPopover(ev: Event){
    const moreInformationPopover = await this.popoverController.create({
      component: MoreInformationPopoverPage,
      event: ev
    });
    moreInformationPopover.present();
  }




  closeEditAccountPasswordModal(){
    this.modalController.dismiss();
  }

}
