import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { MoreInformationPopoverPage } from '../more-information-popover/more-information-popover.page';

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
    private popoverController: PopoverController
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
      console.log("Password and Confirm Password is SAME");

      
    }
    else if(value.password != value.confirmPassword){

      console.log("Password and Confirm Password is NOT SAME");

      this.alertNotice("Password Mismatch", "Entered passwords in fields are not the same. Please Recheck.");

    }

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
