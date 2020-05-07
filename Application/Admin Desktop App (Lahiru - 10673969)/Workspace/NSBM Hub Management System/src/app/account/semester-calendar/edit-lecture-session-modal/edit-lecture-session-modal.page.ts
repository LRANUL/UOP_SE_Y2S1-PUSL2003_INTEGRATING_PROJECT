import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SideMenuPage } from '../../side-menu/side-menu.page';


@Component({
  selector: 'app-edit-lecture-session-modal',
  templateUrl: './edit-lecture-session-modal.page.html',
  styleUrls: ['./edit-lecture-session-modal.page.scss'],
})
export class EditLectureSessionModalPage implements OnInit {

  // Setting min validation for angular material calendar
  minDate: Date;

  // Setting max validation for angular material calendar
  maxDate: Date;


  editLectureSessionForm: FormGroup;

  // Declaring variables to store the passed value
  passedLectureSessionId = null;
  passedLectureSessionBatch = null;
  passedLectureSessionDegree = null;
  passedLectureSessionAcademicYear = null;
  passedLectureSessionAcademicSemester = null;
  passedLectureSessionModuleCode = null;
  passedLectureSessionModuleTitle = null;
  passedLectureSessionLecturer = null;
  passedLectureSessionLectureHall = null;
  passedLectureSessionStatus = null;
  passedLectureSessionStartDateTime = null;
  passedLectureSessionEndDateTime = null;

  passedUserFaculty = null;

  lectureSessionDate;
  lectureSessionStartTime;
  lectureSessionEndTime;
  
  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editLectureSessionService: FirestoreService,
    private alertController: AlertController
  ) {

    // Retrieving current date and setting as min data
    this.minDate = new Date();

    // Retrieving the current year
    const currentYear = new Date().getFullYear();
    // Setting the max date december 31st two years in the future
    this.maxDate = new Date(currentYear + 2, 11, 31);

   }

  ngOnInit() {

    this.editLectureSessionForm = this.formBuilder.group({
      batch: new FormControl(''),
      degreeProgram: new FormControl(''),
      academicYear: new FormControl(''),
      academicSemester: new FormControl(''),
      module: new FormControl(''),
      lecturer: new FormControl(''),
      lectureHall: new FormControl(''),
      lectureStatus: new FormControl(''),
      sessionDate: new FormControl(''),
      sessionStartTime: new FormControl(''),
      sessionEndTime: new FormControl('')
    });

    // Getting the values from the parent page (semester calendar page) and assigning them to the variables
    this.passedLectureSessionId = this.navParams.get('lectureSessionId');
    
    this.passedLectureSessionBatch = this.navParams.get('lectureSessionBatch');
    this.passedLectureSessionDegree = this.navParams.get('lectureSessionDegreeProgram');
    this.passedLectureSessionAcademicYear = this.navParams.get('lectureSessionAcademicYear');
    this.passedLectureSessionAcademicSemester = this.navParams.get('lectureSessionAcademicSemester');
    this.passedLectureSessionModuleCode = this.navParams.get('lectureSessionModuleCode');
    this.passedLectureSessionModuleTitle = this.navParams.get('lectureSessionModuleTitle');
    this.passedLectureSessionStartDateTime = this.navParams.get('lectureSessionStartDateTime');
    this.passedLectureSessionEndDateTime = this.navParams.get('lectureSessionEndDateTime');
    this.passedLectureSessionLecturer = this.navParams.get('lectureSessionLecturer');
    this.passedLectureSessionLectureHall = this.navParams.get('lectureSessionLectureHall');
    this.passedLectureSessionStatus = this.navParams.get('lectureSessionStatus');

    this.passedUserFaculty = this.navParams.get('userFaculty');


    // Assigning lecture session start date time to get the lecture session date
    this.lectureSessionDate = this.passedLectureSessionStartDateTime.toDate();
    
    // Setting the time section of the lecture session date time to zero
    this.lectureSessionDate.setHours(0,0,0,0);

    // Retracting the lecture session start time in format: Hour:Minute AM/PM, Sample: 09:00 AM
    this.lectureSessionStartTime = this.passedLectureSessionStartDateTime.toDate().toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true});

    // Retracting the lecture session end time in format: Hour:Minute AM/PM, Sample: 05:00 PM
    this.lectureSessionEndTime = this.passedLectureSessionEndDateTime.toDate().toLocaleString([], { hour: "2-digit", minute: "2-digit", hour12: true});


    this.editLectureSessionForm.patchValue({
      batch: this.passedLectureSessionBatch,
      degreeProgram: this.passedLectureSessionDegree,
      academicYear: this.passedLectureSessionAcademicYear,
      academicSemester: this.passedLectureSessionAcademicSemester,
      module: this.passedLectureSessionModuleCode,
      lecturer: this.passedLectureSessionLecturer,
      lectureHall: this.passedLectureSessionLectureHall,
      lectureStatus: this.passedLectureSessionStatus,
      sessionDate: this.lectureSessionDate,
      sessionStartTime: this.lectureSessionStartTime,
      sessionEndTime: this.lectureSessionEndTime
    });



    this.retrievePublishedBatch();

    this.retrievePublishedDegreeProgram();

    this.retrieveRegisteredModules();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHallsSOC();

    this.retrievePublishedSessionStatuses();

    
    
    this.retrieveAwardingBodyUniversityOnLoad(this.passedLectureSessionDegree);
    
  }



  // Retrieving the published batches from the firestore database
  publishedBatches;
  retrievePublishedBatch(){
    this.editLectureSessionService.retrievePublishedBatch(this.passedUserFaculty).subscribe(response => (this.publishedBatches = response));
  }


  // Retrieving the published degree programs and details from the firestore database
  publishedDegreePrograms;


  retrievePublishedDegreeProgram = () => {
    this.editLectureSessionService.retrievePublishedDegreeProgram(this.navParams.get('userFaculty')).subscribe(response => (this.publishedDegreePrograms = response));
  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }


  publishedAwardingBodyUniversityOfDegree;
  awardingBodyUniversity;
  degreeCode;

  // Executed upon page load
  async retrieveAwardingBodyUniversityOnLoad(degree){
    // Retrieving the awardingBody University of the selected degree
    this.editLectureSessionService.retrievingAwardingBodyUniversityOfDegree(degree, this.passedUserFaculty).subscribe(response => (this.publishedAwardingBodyUniversityOfDegree =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.awardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.degreeCode = firestoreDoc.degreeCode;
      //  console.log(this.awardingBodyUniversity);
      //  console.log(this.degreeCode);
      })
    ));
  }

  // Executed upon select option change
  async retrieveAwardingBodyUniversityOnChange(event){
    // Retrieving the awardingBody University of the selected degree
    this.editLectureSessionService.retrievingAwardingBodyUniversityOfDegree(event.detail.value, this.passedUserFaculty).subscribe(response => (this.publishedAwardingBodyUniversityOfDegree =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.awardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.degreeCode = firestoreDoc.degreeCode;
      //  console.log(this.awardingBodyUniversity);
      //  console.log(this.degreeCode);
      })
    ));
  }



  publishedModuleTitleOfModuleCode;

  // Executed upon select option change
  async retrieveModuleTitleOnChange(event){
    // Retrieving the module title of the selected module code
    this.editLectureSessionService.retrievingModuleTitleOfModuleCode(event.detail.value, this.passedUserFaculty).subscribe(response => (this.publishedModuleTitleOfModuleCode =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.passedLectureSessionModuleTitle = firestoreDoc.moduleTitle;
      })
    ));
  }


  

  // Retrieving the published modules and their details from the firestore database
  publishedModules;

  publishedModuleCode;
  publishedModuleTitle;

  retrieveRegisteredModules = () => {
    this.editLectureSessionService.retrieveRegisteredModules(this.navParams.get('userFaculty')).subscribe(response => (this.publishedModules = response));
  }



  // Retrieving the registered lecturers from the firestore database
  registeredLecturers;

  retrieveRegisteredLecturers = () =>
    this.editLectureSessionService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturers = response));
  


  // Retrieving the published lecture halls from the firestore database
  publishedLectureHalls;

  retrievePublishedLectureHallsSOC = () =>
    this.editLectureSessionService.retrievePublishedLectureHalls(this.navParams.get('userFaculty')).subscribe(response => (this.publishedLectureHalls = response));
    

  
  // Retrieving the published session statuses from the firestore database
  publishedSessionStatuses;
  
  retrievePublishedSessionStatuses = () =>
    this.editLectureSessionService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));




  // Confirm Box Implementation (Edit Published Lecture Session)
  async editPublishedLectureSession ( title: string, content: string, value) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Edit Published Lecture Session Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Edit Published Lecture Session Request Accepted");

            // Calling function to edit published lecture session
            this.doEditLectureSession(value);
          }
        }
      ]
    });
    await alert.present();
  }

   
  // Process of adding edited values of lecture session to firestore database
  doEditLectureSession(value) {

    // Extracting month, date and year from selected lecture session date, sample format - 04/30/2020
    // Month has to be incremented by one because the month range is retrieve by - 0-11
    let lectureSessionDate = (new Date(value.sessionDate).getMonth()+1) + "/" + new Date(value.sessionDate).getDate() + "/" + new Date(value.sessionDate).getFullYear();

    // Merging lecture session date and lecture session start time into date format
    let lectureSessionStartDateTime = new Date(lectureSessionDate + " " + value.sessionStartTime);

    // Merging lecture session date and lecture session end time into date format
    let lectureSessionEndDateTime = new Date(lectureSessionDate + " " + value.sessionEndTime);

    // Update values in firestore database with the user updated values
    this.editLectureSessionService.updateLectureSession(this.passedUserFaculty, this.passedLectureSessionId, value, 
      this.awardingBodyUniversity, this.degreeCode, this.passedLectureSessionModuleTitle, lectureSessionStartDateTime, lectureSessionEndDateTime)
      .then(success => {
        this.alertNotice("Lecture Session Updated", "Lecture Session has been updated with the new details.");
      }, error => {
        console.log("Error: " + error);
        this.alertNotice("ERROR", "Error has occurred: " + error);
    });

  }
  

  // Alert Box Implementation
  async alertNotice ( title: string, content: string ) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    });

    await alert.present();
  }



  // Implementation for closing the modal
  closeEditLectureSessionModal(){
    this.modalController.dismiss();
  }

  

}
