import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ModalController, NavParams, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-module-modal',
  templateUrl: './edit-module-modal.page.html',
  styleUrls: ['./edit-module-modal.page.scss'],
})
export class EditModuleModalPage implements OnInit {

  editModuleDetailsForm: FormGroup;

  // Declaring variables to store the passed value
  passedModuleDocId = null;
  passedModuleCode = null;
  passedModuleTitle = null;
  passedModuleCreditsWeighting = null;
  passedModuleDegree = null;
  passedModuleAwardingBodyUniversity = null;
  passedModuleAcademicPeriodYear = null;
  passedModuleAcademicPeriodSemester = null;
  passedModuleModuleLeader = null;
  passedModuleAssignedLecturer = null;
  passedModuleAssignedLectureHall = null;
  passedUserFaculty = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editModuleService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.editModuleDetailsForm = this.formBuilder.group({
      moduleCode: new FormControl(''),
      moduleTitle: new FormControl(''),
      creditsWeighting: new FormControl(''),
      degreeProgram: new FormControl(''),
      academicPeriodYear: new FormControl(''),
      academicPeriodSemester: new FormControl(''),
      moduleLeader: new FormControl(''),
      assignedLecturer: new FormControl(''),
      assignedLectureHall: new FormControl('')
    });
    

    // Getting the values from the parent page (module page) and assigning them to the variables
    this.passedModuleDocId = this.navParams.get('moduleDocId');

    this.passedModuleCode = this.navParams.get('moduleCode');
    this.passedModuleTitle = this.navParams.get('moduleTitle');
    this.passedModuleCreditsWeighting = this.navParams.get('moduleCreditsWeighting');
    this.passedModuleDegree = this.navParams.get('moduleDegree');
    this.passedModuleAwardingBodyUniversity = this.navParams.get('moduleAwardingBodyUniversity');
    this.passedModuleAcademicPeriodYear = this.navParams.get('moduleAcademicPeriodYear');
    this.passedModuleAcademicPeriodSemester = this.navParams.get('moduleAcademicPeriodSemester');
    this.passedModuleModuleLeader = this.navParams.get('moduleModuleLeader');
    this.passedModuleAssignedLecturer = this.navParams.get('moduleAssignedLecturer');
    this.passedModuleAssignedLectureHall = this.navParams.get('moduleAssignedLectureHall');

    this.passedUserFaculty = this.navParams.get('userFaculty');


    this.retrievePublishedModuleCreditsWeighting();

    this.retrievePublishedDegreeProgram();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHalls();
  }


  // Retrieving the published credits weighting from the firestore database
  publishedCreditsWeighting;

  retrievePublishedModuleCreditsWeighting = () => {
    this.editModuleService.retrievePublishedModuleCreditsWeighting().subscribe(response => (this.publishedCreditsWeighting = response));
  }

  // Retrieving the published degree programs and details from the firestore database
  publishedDegreePrograms;

  publishedDegreeProgramDegree;
  publishedDegreeProgramAwardingBodyUniversity;
  publishedDegreeProgramNoOfYears
  publishedDegreeProgramNoOfSemestersAnnaully;

  retrievePublishedDegreeProgram = () => {
    this.editModuleService.retrievePublishedDegreeProgram(this.passedUserFaculty).subscribe(response => (this.publishedDegreePrograms = 
       response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.publishedDegreeProgramDegree = firestoreDoc.degree;
        this.publishedDegreeProgramAwardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        this.publishedDegreeProgramNoOfYears = firestoreDoc.deliveryNoOfYears;
        this.publishedDegreeProgramNoOfSemestersAnnaully = firestoreDoc.deliveryNoOfSemestersAnnually;
      })
    ));
  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }

  // Retrieving registered lecturers and their details from the firestore database
  registeredLecturers;

  retrieveRegisteredLecturers = () => {
    this.editModuleService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturers = response));
  }

  // Retriving publshed lecture halls from the firestore database
  publishedLectureHalls;

  retrievePublishedLectureHalls = () => {
    this.editModuleService.retrievePublishedLectureHalls(this.passedUserFaculty).subscribe(response => (this.publishedLectureHalls = response));
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



  userFormDataAwardingBodyUniversity;

  // Process of editing module details
  doEditModuleDetails(value){

    // Retriving the awardingBodyUniversity from the user selected degreeProgram
    if(value.degreeProgram == this.publishedDegreeProgramDegree){
      this.userFormDataAwardingBodyUniversity = this.publishedDegreeProgramAwardingBodyUniversity;
    }

    console.log(value.degreeProgram);
    console.log(this.publishedDegreeProgramDegree);
    console.log(this.userFormDataAwardingBodyUniversity);

    // Process of updating module details in the firestore database
    this.editModuleService.updateModule(this.passedUserFaculty, this.passedModuleDocId, value, this.userFormDataAwardingBodyUniversity);

    // Alert box displaying confirmation of updating of module datails 
    this.alertNotice("Updated", "Module Details has been updated.");

  }





  // Implementation for closing the modal
  closeEditModule(){
    this.modalController.dismiss();
  }


}
