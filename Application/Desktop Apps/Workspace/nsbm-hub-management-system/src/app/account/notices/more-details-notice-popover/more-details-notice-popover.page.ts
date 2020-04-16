import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-more-details-notice-popover',
  templateUrl: './more-details-notice-popover.page.html',
  styleUrls: ['./more-details-notice-popover.page.scss'],
})
export class MoreDetailsNoticePopoverPage implements OnInit {

  passedNoticeDocId = null;
  passedNoticeCreatedFaculty = null;
  passedNoticeCredtedDateTime = null;
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
    this.passedNoticeCredtedDateTime = this.navParams.get('noticeCredtedDateTime');

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

    console.log(this.passedNoticeRecipientBatch);
    console.log(this.passedNoticeRecipientModule);

  }

  // Closing the popover
  closeMoreDetailsNoticePopover() {
    this.popoverController.dismiss();
  }


}
