import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.page.html',
  styleUrls: ['./notifications-popover.page.scss'],
})
export class NotificationsPopoverPage implements OnInit {

  passedLoggedInUserId = null;

  constructor(
    private notificationsPopoverService: FirestoreService,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    this.passedLoggedInUserId = this.navParams.get('loggedInUserId');

    this.retrieveLoggedInUserDetailsProgramOffice();

  }

  // Retrieving logged in user details from the firestore database
  registeredProgramOfficeUser;
  retrieveLoggedInUserDetailsProgramOffice = () =>
    this.notificationsPopoverService.retrieveLoggedInUserDetailsProgramOffice(this.passedLoggedInUserId).subscribe(response =>
      this.registeredProgramOfficeUser = response);

}