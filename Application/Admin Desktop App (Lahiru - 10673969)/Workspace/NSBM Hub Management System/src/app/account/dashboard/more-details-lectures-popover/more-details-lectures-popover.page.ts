import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-details-lectures-popover',
  templateUrl: './more-details-lectures-popover.page.html',
  styleUrls: ['./more-details-lectures-popover.page.scss'],
})
export class MoreDetailsLecturesPopoverPage implements OnInit {

  passedLectureSessionDocId = null;
  passedBatch = null;
  passedLecturer = null;
  passedLectureHall = null;
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

    this.passedBatch = this.navParams.get('batch');
    this.passedLecturer = this.navParams.get('lecturer');
    this.passedLectureHall = this.navParams.get('lectureHall');
    this.passedDegree = this.navParams.get('degree');
    this.passedAwardingBodyUniversity = this.navParams.get('awardingBodyUniversity');
    this.passedAcademicPeriodYear = this.navParams.get('academicPeriodYear');
    this.passedAcademicPeriodSemester = this.navParams.get('academicPeriodSemester');

    
  }

  // Closing the popover
  closeMoreDetailsUpcomingLecturesPopover() {
    this.popoverController.dismiss();
  }

}
