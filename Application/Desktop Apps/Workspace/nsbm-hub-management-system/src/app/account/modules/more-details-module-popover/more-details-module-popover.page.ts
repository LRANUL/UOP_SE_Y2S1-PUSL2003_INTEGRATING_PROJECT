import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-module-popover',
  templateUrl: './more-details-module-popover.page.html',
  styleUrls: ['./more-details-module-popover.page.scss'],
})
export class MoreDetailsModulePopoverPage implements OnInit {

  passedModuleDocId = null;
  passedAssignedLecturer = null;
  passedAssignedLectureHall = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (modules page) and assigning to these variables
    this.passedModuleDocId = this.navParams.get('moduleDocId');

    this.passedAssignedLecturer = this.navParams.get('assignedLecturer');
    this.passedAssignedLectureHall = this.navParams.get('assignedLectureHall');

  }


  // Closing the popover
  closeMoreDetailsModulePopover() {
    this.popoverController.dismiss();
  }


}
