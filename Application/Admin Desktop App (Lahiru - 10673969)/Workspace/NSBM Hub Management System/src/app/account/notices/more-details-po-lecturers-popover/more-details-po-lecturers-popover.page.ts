import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-po-lecturers-popover',
  templateUrl: './more-details-po-lecturers-popover.page.html',
  styleUrls: ['./more-details-po-lecturers-popover.page.scss'],
})
export class MoreDetailsPoLecturersPopoverPage implements OnInit {

  passedNoticeDocId = null;
  passedNoticeCreatedLecturer = null;
  passedNoticeCreatedDateTime = null;
  passedNoticeRecipient = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (notice page) and assigning to these variables
    this.passedNoticeDocId = this.navParams.get('noticeDocId');

    this.passedNoticeCreatedLecturer = this.navParams.get('noticeCreatedLecturer');
    this.passedNoticeCreatedDateTime = this.navParams.get('noticeCreatedDateTime');
    this.passedNoticeRecipient = this.navParams.get('noticeRecipient');


  }

  // Closing the popover
  closeMoreDetailsPOLecturersNoticePopover() {
    this.popoverController.dismiss();
  }

}
