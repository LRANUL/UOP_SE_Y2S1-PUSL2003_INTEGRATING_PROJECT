import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { SideMenuPage } from '../side-menu/side-menu.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private profileService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage
  ) { }

  ngOnInit() {

    this.retrieveLoggedInUserDetailsFirestore();

  }

  loggedInProgramOfficeUser;
  retrieveLoggedInUserDetailsFirestore = () => 
    this.profileService.retrieveLoggedInUserDetailsFirestore(this.sideMenuPageUserFaculty.passUserId()).subscribe(response  => (this.loggedInProgramOfficeUser = response));


}
