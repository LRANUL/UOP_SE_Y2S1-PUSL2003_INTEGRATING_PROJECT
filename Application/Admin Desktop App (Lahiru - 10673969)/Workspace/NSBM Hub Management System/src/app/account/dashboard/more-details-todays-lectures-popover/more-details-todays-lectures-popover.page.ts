import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-todays-lectures-popover',
  templateUrl: './more-details-todays-lectures-popover.page.html',
  styleUrls: ['./more-details-todays-lectures-popover.page.scss'],
})
export class MoreDetailsTodaysLecturesPopoverPage implements OnInit {

  passedLectureSessionDocId = null;
  passedDegree = null;
  passedAwardingBodyUniversity = null;
  passedAcademicPeriodYear = null;
  passedAcademicPeriodSemester = null;

  constructor(
    private navParams: NavParams,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {

    // Retrieving the passed value from the parent page (dashboard page) and assigning to these variables
    this.passedLectureSessionDocId = this.navParams.get('lectureSessionDocId');

    this.passedDegree = this.navParams.get('degree');
    this.passedAwardingBodyUniversity = this.navParams.get('awardingBodyUniversity');
    this.passedAcademicPeriodYear = this.navParams.get('academicPeriodYear');
    this.passedAcademicPeriodSemester = this.navParams.get('academicPeriodSemester');
    
  }

  // Closing the popover
  closeMoreDetailsTodaysLecturesPopover() {
    this.popoverController.dismiss();
  }


}
