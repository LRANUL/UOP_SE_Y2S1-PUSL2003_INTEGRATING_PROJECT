import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-lecturers-po-popover',
  templateUrl: './more-details-lecturers-po-popover.page.html',
  styleUrls: ['./more-details-lecturers-po-popover.page.scss'],
})
export class MoreDetailsLecturersPoPopoverPage implements OnInit {

  passedNoticeDocId = null;
  passedNoticeCreatedLecturer = null;
  passedNoticeCredtedDateTime = null;
  passedNoticeRecipient = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (notice page) and assigning to these variables
    this.passedNoticeDocId = this.navParams.get('noticeDocId');

    this.passedNoticeCreatedLecturer = this.navParams.get('noticeCreatedLecturer');
    this.passedNoticeCredtedDateTime = this.navParams.get('noticeCredtedDateTime');
    this.passedNoticeRecipient = this.navParams.get('noticeRecipient');


  }

  // Closing the popover
  closeMoreDetailsLecturersPONoticePopover() {
    this.popoverController.dismiss();
  }

}
