import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-po-students-popover',
  templateUrl: './more-details-po-students-popover.page.html',
  styleUrls: ['./more-details-po-students-popover.page.scss'],
})
export class MoreDetailsPoStudentsPopoverPage implements OnInit {

  passedNoticeDocId = null;
  passedNoticeCreatedFaculty = null;
  passedNoticeCreatedDateTime = null;
  passedNoticeRecipientBatch = null;
  passedNoticeRecipientModule = null;

  recipientBatchNone: Boolean = false;

  recipientModuleNone: Boolean = false;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (notice page) and assigning to these variables
    this.passedNoticeDocId = this.navParams.get('noticeDocId');

    this.passedNoticeCreatedFaculty = this.navParams.get('noticeCreatedFaculty');
    this.passedNoticeCreatedDateTime = this.navParams.get('noticeCreatedDateTime');

    if(this.navParams.get('noticeRecipientBatch') == "NULL"){
      this.passedNoticeRecipientBatch = "None";
      this.recipientBatchNone = true;
    }
    else if(this.navParams.get('noticeRecipientModule') == "NULL"){
      this.passedNoticeRecipientModule = "None";
      this.recipientModuleNone = true;
    }

    this.passedNoticeRecipientBatch = this.navParams.get('noticeRecipientBatch');
    this.passedNoticeRecipientModule = this.navParams.get('noticeRecipientModule');

  //  console.log(this.passedNoticeRecipientBatch);
  //  console.log(this.passedNoticeRecipientModule);

  }

  // Closing the popover
  closeMoreDetailsPOStudentsNoticePopover() {
    this.popoverController.dismiss();
  }

}
