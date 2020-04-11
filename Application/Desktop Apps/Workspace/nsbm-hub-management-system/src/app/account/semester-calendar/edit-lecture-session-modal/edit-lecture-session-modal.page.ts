import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

import { SideMenuPage } from '../../side-menu/side-menu.page';


@Component({
  selector: 'app-edit-lecture-session-modal',
  templateUrl: './edit-lecture-session-modal.page.html',
  styleUrls: ['./edit-lecture-session-modal.page.scss'],
})
export class EditLectureSessionModalPage implements OnInit {

  passedLectureSessionId = null;
  passedLectureSesionBatch = null;
  passedLectureSessionDegreeProgram = null;
  passedLectureSessionAcademicYear = null;
  passedLectureSessionAcademicSemester = null;
  passedLectureSesionModuleCode = null;
  passedLectureSessionModuleTitle = null;
  passedLectureSessionStartDateTime = null;
  passedLectureSessionEndDateTime = null;
  passedLectureSessionLecturer = null;
  passedLectureSessionLectureHall = null;
  passedLectureSessionStatus = null;


  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private editLectureSessionService: FirestoreService,
    private sideMenuPageUserFaculty: SideMenuPage
  ) { }

  ngOnInit() {

    this.retrievePublishedBatch();

    this.retrievePublishedDegreeProgram();

    this.retrievePublishedModules();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHallsSOC();
    


    this.passedLectureSessionId = "efefefef";// this.navParams.get('passedLectureSessionId');
    /*
    this.passedLectureSesionBatch = this.navParams.get('passedLectureSesionBatch');
    this.passedLectureSessionDegreeProgram = this.navParams.get('passedLectureSessionDegreeProgram');
    this.passedLectureSessionAcademicYear = this.navParams.get('passedLectureSessionAcademicYear');
    this.passedLectureSessionAcademicSemester = this.navParams.get('passedLectureSessionAcademicSemester');
    this.passedLectureSesionModuleCode = this.navParams.get('passedLectureSesionModuleCode');
    this.passedLectureSessionModuleTitle = this.navParams.get('passedLectureSessionModuleTitle');
    this.passedLectureSessionStartDateTime = this.navParams.get('passedLectureSessionStartDateTime');
    this.passedLectureSessionEndDateTime = this.navParams.get('passedLectureSessionEndDateTime');
    this.passedLectureSessionLecturer = this.navParams.get('passedLectureSessionLecturer');
    this.passedLectureSessionLectureHall = this.navParams.get('passedLectureSessionLectureHall');
    this.passedLectureSessionStatus = this.navParams.get('passedLectureSessionStatus');
    */


  }

  publishedBatches;
  
  retrievePublishedBatch = () => 
    this.editLectureSessionService.retrievePublishedBatch().subscribe(response => (this.publishedBatches = response));


  publishedDegreePrograms;

  retrievePublishedDegreeProgram = () => 
    this.editLectureSessionService.retrievePublishedDegreeProgram().subscribe(response => (this.publishedDegreePrograms = response));


  publishedModules;

  retrievePublishedModules = () => 
    this.editLectureSessionService.retrievePublishedModules().subscribe(response => (this.publishedModules = response));

  registeredLecturers;

  retrieveRegisteredLecturers = () =>
    this.editLectureSessionService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturers = response));
  
    publishedLectureHalls;

  retrievePublishedLectureHallsSOC = () =>
    this.editLectureSessionService.retrievePublishedLectureHallsSOC().subscribe(response => (this.publishedLectureHalls = response));
    
      


  closeModal(){
    this.modalController.dismiss();
  }

  

}
