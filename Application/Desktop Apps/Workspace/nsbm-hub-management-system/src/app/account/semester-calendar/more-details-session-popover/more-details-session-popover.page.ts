import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-session-popover',
  templateUrl: './more-details-session-popover.page.html',
  styleUrls: ['./more-details-session-popover.page.scss'],
})
export class MoreDetailsSessionPopoverPage implements OnInit {

  passedLectureSessionId = null;
  passedLecturer = null;
  passedLectureHall = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page and assigning to this variable
    this.passedLectureSessionId = this.navParams.get('lectureSessionId');

    this.passedLecturer = this.navParams.get('lecturer');
    this.passedLectureHall = this.navParams.get('lectureHall');

  }


  


  // Closing the popover
  closePopover() {
    this.popoverController.dismiss();
  }






}
