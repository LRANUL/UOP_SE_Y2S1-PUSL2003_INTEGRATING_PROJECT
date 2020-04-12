import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-edit-lecture-session-modal',
  templateUrl: './edit-lecture-session-modal.page.html',
  styleUrls: ['./edit-lecture-session-modal.page.scss'],
})
export class EditLectureSessionModalPage implements OnInit {

  editLectureSessionForm: FormGroup;

  // Declaring variables to store the passed value
  passedLectureSessionId = null;
  passedLectureSessionBatch = null;
  passedLectureSessionDegreeProgram = null;
  passedLectureSessionAcademicYear = null;
  passedLectureSessionAcademicSemester = null;
  passedLectureSesionModuleCode = null;
  passedLectureSessionModuleTitle = null;
  passedLectureSessionLecturer = null;
  passedLectureSessionLectureHall = null;
  passedLectureSessionStatus = null;

  passedLectureSessionStartDateTime = null;
  lectureSessionStartDateTime;
  
  passedLectureSessionEndDateTime = null;
  lectureSessionEndTime;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editLectureSessionService: FirestoreService
  ) { }

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

    this.retrievePublishedBatch();

    this.retrievePublishedDegreeProgram();

    this.retrievePublishedModules();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHallsSOC();

    this.retrievePublishedSessionStatuses();
    

    // Getting the values from the parent page and assigning them to the variables
    this.passedLectureSessionId = this.navParams.get('lectureSessionId');
    
    this.passedLectureSessionBatch = this.navParams.get('lectureSessionBatch');
    this.passedLectureSessionDegreeProgram = this.navParams.get('lectureSessionDegreeProgram');
    this.passedLectureSessionAcademicYear = this.navParams.get('lectureSessionAcademicYear');
    this.passedLectureSessionAcademicSemester = this.navParams.get('lectureSessionAcademicSemester');
    this.passedLectureSesionModuleCode = this.navParams.get('lectureSesionModuleCode');
    this.passedLectureSessionModuleTitle = this.navParams.get('lectureSessionModuleTitle');
    this.passedLectureSessionStartDateTime = this.navParams.get('lectureSessionStartDateTime');
    this.passedLectureSessionEndDateTime = this.navParams.get('lectureSessionEndDateTime');
    this.passedLectureSessionLecturer = this.navParams.get('lectureSessionLecturer');
    this.passedLectureSessionLectureHall = this.navParams.get('lectureSessionLectureHall');
    this.passedLectureSessionStatus = this.navParams.get('lectureSessionStatus');

    // Assigning date and time seperately to the variables
    this.lectureSessionStartDateTime = this.passedLectureSessionStartDateTime.toISOString();
    this.lectureSessionEndTime = this.passedLectureSessionEndDateTime.toISOString();
    console.log(this.passedLectureSessionAcademicSemester);
    console.log(this.publishedDegreeProgramNoOfSemestersAnnaully);
  }



  // Retrieving the published batches from the firestore database
  publishedBatches;
  
  retrievePublishedBatch = () => 
    this.editLectureSessionService.retrievePublishedBatch(this.navParams.get('userFaculty')).subscribe(response => (this.publishedBatches = response));




  // Retrieving the published degree programs and details from the firestore database
  publishedDegreePrograms;

  publishedDegreeProgramDegree;
  publishedDegreeProgramAffiliatedUniversity;
  publishedDegreeProgramNoOfYears
  publishedDegreeProgramNoOfSemestersAnnaully;

  retrievePublishedDegreeProgram = () => {
    this.editLectureSessionService.retrievePublishedDegreeProgram(this.navParams.get('userFaculty')).subscribe(response => (this.publishedDegreePrograms = 
       response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.publishedDegreeProgramDegree = firestoreDoc.degree;
        this.publishedDegreeProgramAffiliatedUniversity = firestoreDoc.affiliatedUniversity;
        this.publishedDegreeProgramNoOfYears = firestoreDoc.deliveryNoOfYears;
        this.publishedDegreeProgramNoOfSemestersAnnaully = firestoreDoc.deliveryNoOfSemestersAnnually;
      })
    ));

  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }
  

    

  // Retrieving the published modules and their details from the firestore database
  publishedModules;

  publishedModuleCode;
  publishedModuleTitle;

  retrievePublishedModules = () => {
    this.editLectureSessionService.retrievePublishedModules(this.navParams.get('userFaculty')).subscribe(response => (this.publishedModules = 
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.publishedModuleCode = document.payload.doc.id;
        this.publishedModuleTitle = firestoreDoc.moduleTitle;
      })
    ));
  }



  // Retrieving the registered lecturers from the firestore database
  registeredLecturers;

  retrieveRegisteredLecturers = () =>
    this.editLectureSessionService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturers = response));
  


  // Retrieving the published lecture halls from the firestore database
  publishedLectureHalls;

  retrievePublishedLectureHallsSOC = () =>
    this.editLectureSessionService.retrievePublishedLectureHallsSOC(this.navParams.get('userFaculty')).subscribe(response => (this.publishedLectureHalls = response));
    

  
  // Retrieving the published session statuses from the firestore database
  publishedSessionStatuses;
  
  retrievePublishedSessionStatuses = () =>
    this.editLectureSessionService.retrievePublishedSessionStatuses().subscribe(response => (this.publishedSessionStatuses = response));


   
  userFormDataModuleCode;  

  userFormDataLectureSessionStartDateWithPreviousDate; // Used to store lecture session date from a count in milliseconds since 00:00:00 UTC on 1 January 1970
  userFormDataLectureSessionStartDateWithPreviousDateUnix;
  userFormDataLectureSessionStartDateWithPreviousTimeHoursMilli;
  userFormDataLectureSessionStartDateWithPreviousTimeMinutesMilli;
  userFormDataLectureSessionStartDateWithPreviousTimeSecondsMilli;
  userFormDataLectureSessionStartDateWithPreviousTimeMilliseconds;
  userFormDataLectureSessionStartDateWithPreviousTimeUnix
  userFormDataLectureSessionStartDateWithoutPreviousTimeUnix; 
  userFormDataLectureSessionStartTimeUnix; // Used to store lecture session start time convertion from hours to milliseconds
  userFormDataLectureSessionStartDateTimeUnix;  // Used to store lecture session start time in unix epoch timestamp
  userFormDataLectureSessionStartDateTime; // Used to store lecture session start time in ISO 8601 timestamp

  userFormDataLectureSessionEndTimeUnix; // Used to store lecture session end time convertion from hours to milliseconds
  userFormDataLectureSessionEndDateTimeUnix; // Used to store lecture session end time in unix epoch timestamp
  userFormDataLectureSessionEndDateTime; // Used to store lecture session end time in ISO 8601 timestamp

  // Process of adding edited values of lecture session to firestore database
  doEditLectureSession(value) {
    
    // Retrieving module code for user selected module title
    if(value.module == this.publishedModuleTitle){
      this.userFormDataModuleCode = this.publishedModuleCode;
    }
    

    // Calculating lecture session start datetime
    // Converting user selected date to (Unix Epoch Seconds time) in milliseconds
    this.userFormDataLectureSessionStartDateWithPreviousDate = new Date(value.sessionDate);
    this.userFormDataLectureSessionStartDateWithPreviousDateUnix = this.userFormDataLectureSessionStartDateWithPreviousDate.getTime();
    this.userFormDataLectureSessionStartDateWithPreviousTimeHoursMilli = (this.userFormDataLectureSessionStartDateWithPreviousDate).getHours().getMilliseconds();
    this.userFormDataLectureSessionStartDateWithPreviousTimeMinutesMilli = (this.userFormDataLectureSessionStartDateWithPreviousDate).getMinutes().getMilliseconds();
    this.userFormDataLectureSessionStartDateWithPreviousTimeSecondsMilli = (this.userFormDataLectureSessionStartDateWithPreviousDate).getSeconds().getMilliseconds();
    this.userFormDataLectureSessionStartDateWithPreviousTimeMilliseconds = (this.userFormDataLectureSessionStartDateWithPreviousDate).getMilliseconds();

    this.userFormDataLectureSessionStartDateWithPreviousTimeUnix = this.userFormDataLectureSessionStartDateWithPreviousTimeHoursMilli + this.userFormDataLectureSessionStartDateWithPreviousTimeMinutesMilli +
      this.userFormDataLectureSessionStartDateWithPreviousTimeSecondsMilli + this.userFormDataLectureSessionStartDateWithPreviousTimeMilliseconds;

    this.userFormDataLectureSessionStartDateWithoutPreviousTimeUnix = this.userFormDataLectureSessionStartDateWithPreviousDateUnix - this.userFormDataLectureSessionStartDateWithPreviousTimeUnix;

    // Converting user selected time from hours to milliseconds
    this.userFormDataLectureSessionStartTimeUnix = value.sessionStartTime.toDate().getMilliseconds();

    // Adding date milliseconds value and start time milliseconds value to generate the (Unix Epoch Timestamp) in milliseconds for the lecture session start UNIX datetime timestamp
    this.userFormDataLectureSessionStartDateTimeUnix = this.userFormDataLectureSessionStartDateWithoutPreviousTimeUnix + this.userFormDataLectureSessionStartTimeUnix;

    // Converting lecture start datetime (Unix Epoch Timestamp) milliseconds to ISO 8601 timestamp
    this.userFormDataLectureSessionStartDateTime = this.userFormDataLectureSessionStartDateTimeUnix.toISOString();

    console.log(this.userFormDataLectureSessionStartDateTime);

    // Calculating lecture session end datetime
    // Converting user selected time from hours to milliseconds
    this.userFormDataLectureSessionEndTimeUnix = value.sessionEndTime.toDate().getMilliseconds();

    // Adding date milliseconds value and start time milliseconds value to generate the (Unix Epoch Timestamp) in milliseconds for the lecture session start UNIX datetime timestamp
    this.userFormDataLectureSessionEndDateTimeUnix = this.userFormDataLectureSessionStartDateWithoutPreviousTimeUnix + this.userFormDataLectureSessionEndTimeUnix;

    // Converting lecture end datetime (Unix Epoch Timestamp) milliseconds to ISO 8601 timestamp
    this.userFormDataLectureSessionEndDateTime = this.userFormDataLectureSessionEndDateTimeUnix.toDate().getMilliseconds();

    // Update values in firestore database with the user updated values
    this.editLectureSessionService.updateLectureSession(this.navParams.get('userFaculty'), this.passedLectureSessionId, value, this.userFormDataModuleCode, this.userFormDataLectureSessionStartDateTime, this.userFormDataLectureSessionEndDateTime);
   
    console.log(this.userFormDataLectureSessionEndDateTime);




  }
  



  // Implementation for closing the modal
  closeModal(){
    this.modalController.dismiss();
  }

  

}
