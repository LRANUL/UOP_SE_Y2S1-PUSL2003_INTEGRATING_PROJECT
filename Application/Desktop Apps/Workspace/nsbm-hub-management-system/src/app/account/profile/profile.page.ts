import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private profileService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    this.retrieveLoggedInUserDetailsProgramOffice();

  }

  // Opening notifications popover
  async openNotificationPopover(ev: Event){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: NotificationsPopoverPage,
      componentProps: {
        loggedInUserId: this.sideMenuPageUserFaculty.passUserId()
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
  }
  

  loggedInProgramOfficeUser;
  retrieveLoggedInUserDetailsProgramOffice = () => 
    this.profileService.retrieveLoggedInUserDetailsProgramOffice(this.sideMenuPageUserFaculty.passUserId()).subscribe(response  => (this.loggedInProgramOfficeUser = response));


}
