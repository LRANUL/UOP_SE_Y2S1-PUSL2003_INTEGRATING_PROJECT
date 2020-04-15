import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-event-sessions-popover',
  templateUrl: './more-details-event-sessions-popover.page.html',
  styleUrls: ['./more-details-event-sessions-popover.page.scss'],
})
export class MoreDetailsEventSessionsPopoverPage implements OnInit {

  passedEventSessionDocId = null;
  passedStatus = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (dashboard page) and assigning to these variables
    this.passedEventSessionDocId = this.navParams.get('eventSessionDocId');

    this.passedStatus = this.navParams.get('status');

  }

  // Closing the popover
  closeMoreDetailsEventSessionsPopover() {
    this.popoverController.dismiss();
  }

}
