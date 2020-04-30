import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SideMenuPage } from '../side-menu/side-menu.page';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { EditModuleModalPage } from './edit-module-modal/edit-module-modal.page';
import { MoreDetailsModulePopoverPage } from './more-details-module-popover/more-details-module-popover.page';
import { NotificationsPopoverPage } from '../notifications-popover/notifications-popover.page';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  searchRegisteredModuleForm: FormGroup;

  registerModuleForm: FormGroup;

  // Loading spinner variable declaration
  loadingSpinnerSearchRegisteredModule: Boolean = false;

  // Page load search module text variable declaration
  pageLoadSearchModuleText: Boolean = true;


  constructor(
    private modulesService: FirestoreService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private sideMenuPageUserFaculty: SideMenuPage
  ) { }

  ngOnInit() {

    // Disabling the button to search for registered modules upon load
    this.searchRegisteredModuleButtonDisabled = "true";
   
    this.retrievePublishedModuleCreditsWeightingActive();

    this.retrievePublishedDegreeProgram();

    this.retrieveRegisteredLecturers();

    this.retrievePublishedLectureHalls();

    this.searchRegisteredModuleForm = this.formBuilder.group({
      moduleCode: new FormControl(''),
      moduleTitle: new FormControl(''),
      degreeProgram: new FormControl('')
    });

    this.registerModuleForm = this.formBuilder.group({
      moduleCode: new FormControl('', Validators.required),
      moduleTitle: new FormControl('', Validators.required),
      creditsWeighting: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required),
      academicPeriod: new FormControl('', Validators.required),
      academicPeriodYear: new FormControl('', Validators.required),
      academicPeriodSemester: new FormControl('', Validators.required),
      moduleLeader: new FormControl('', Validators.required),
      assignedLecturer: new FormControl('', Validators.required),
      assignedLectureHall: new FormControl('', Validators.required)
    });
  }


  // Opening notifications popover
  async openNotificationPopover(ev: Event){
    const moreDetailsLectureSessionPopover = await this.popoverController.create({
      component: NotificationsPopoverPage,
      componentProps: {
        loggedInUserId: this.sideMenuPageUserFaculty.passUserId()
      },
      event: ev
    });
    moreDetailsLectureSessionPopover.present();
  }

  


  // Retrieving the published module credits weighting and their details from the firestore database
  publishedModuleCreditsWeighting;

  retrievePublishedModuleCreditsWeightingActive = () => {
    this.modulesService.retrievePublishedModuleCreditsWeightingActive().subscribe(response => (this.publishedModuleCreditsWeighting = response));
  }


  // Retrieving the published degree programs and their details from the firestore database
  publishedDegreePrograms;

  retrievePublishedDegreeProgram = () => {
    this.modulesService.retrievePublishedDegreeProgram(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedDegreePrograms = response));
  }

  // Implementation of generating an array for the count of, no of years and no of semesters
  convertToArray(n: number): any[] {
    return Array(n);
  }


  // Retrieving registered lecturer users and their details from the firestore database
  registeredLecturerUsers;

  retrieveRegisteredLecturers = () => {
    this.modulesService.retrieveRegisteredLecturers().subscribe(response => (this.registeredLecturerUsers = response));
  }


  // Retrieving published lecture halls and their details from the firestore database
  publishedLectureHalls;

  retrievePublishedLectureHalls = () => {
    this.modulesService.retrievePublishedLectureHalls(this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedLectureHalls = response))
  }

  
  publishedDegreeProgram;
  awardingBodyUniversity;

  async retrieveAwardingBodyUniversity(event){

    let selectedDegree = event.detail.value;

    // Retrieving the awardingBody University of the selected degree
    this.modulesService.retrievingAwardingBodyUniversityOfDegree(selectedDegree, this.sideMenuPageUserFaculty.passUserFaculty()).subscribe(response => (this.publishedDegreeProgram =
      response.forEach(document => {
        let firestoreDoc: any = document.payload.doc.data();
        this.awardingBodyUniversity = firestoreDoc.awardingBodyUniversity;
        console.log(this.awardingBodyUniversity);
      })
    ));

  }


  // Declaring variable to store the string value of true or false for the search registered modules button
  searchRegisteredModuleButtonDisabled: string;

  // Checking if user entered a value to module code field (Search Registered Module section)
  validateModuleCodeInput(evModuleCode: any){
    
    // Assigning entered value into this variable
    let moduleCodeValue = evModuleCode.target.value;

    // If field is not empty, search registered modules button will be enabled
    if(moduleCodeValue != ""){
      this.searchRegisteredModuleButtonDisabled = "false";
    }// If field id empty, search registered modules button will be disabled
    else if (moduleCodeValue == ""){
      this.searchRegisteredModuleButtonDisabled = "true";
    }
  }

  // Checking if user entered a value to module title field (Search Registered Module section)
  validateModuleTitleInput(evModuleTitle: any){

    // Assigning entered value into this variable
    let moduleTitleValue = evModuleTitle.target.value;

    // If field is not empty, search registered modules button will be enabled
    if(moduleTitleValue != ""){
      this.searchRegisteredModuleButtonDisabled = "false";
    }// If field id empty, search registered modules button will be disabled
    else if (moduleTitleValue == ""){
      this.searchRegisteredModuleButtonDisabled = "true";
    }
  }

  // Checking if user entered a value to degree program field (Search Registered Module section)
  validateDegreeProgramSelect(evDegreeProgram: any){

    // Assigning entered value into this variable
    let degreeProgramValue = evDegreeProgram.target.value;

    // If field is not empty, search registered modules button will be enabled
    if(degreeProgramValue != ""){
      this.searchRegisteredModuleButtonDisabled = "false";
    }// If field id empty, search registered modules button will be disabled
    else if (degreeProgramValue == ""){
      this.searchRegisteredModuleButtonDisabled = "true";
    }
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


  registeredModules;

  // Used to store the user selected awarding body university, which is identified by the selected degree
  userDataAwardingBodyUniversity;

  doSearchRegisteredModule(value){

    // Setting page load search module text to false
    this.pageLoadSearchModuleText = false;

    // Setting loading spinner as true until necessary content is loaded
    this.loadingSpinnerSearchRegisteredModule = true;

    // Depending on the user's input the necessary reponse and operation is taken
    if(value.moduleCode != "" && value.moduleTitle != "" && value.degreeProgram != ""){

      // Alert notice with relavant message
      this.alertNotice("ALERT", "You have entered a Module Code, Title and selected a Degree Program. Module search will proceed with the Module Code");

      // Retrieving registered modules with the search value of moduleCode
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(response => (this.registeredModules = response));

      // Assigning loading spinner to false upon the necessary content has loaded
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

    }
    else if(value.moduleCode != "" && value.moduleTitle){

      // Alert notice with relavant message
      this.alertNotice("ALERT", "You have entered a Module Code and Title. Module search will proceed with the Module Code");

      // Retrieving registered modules with the search value of moduleCode
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(response => (this.registeredModules = response));
      
      // Assigning loading spinner to false upon the necessary content has loaded
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);
    
    }
    else if(value.moduleTitle != "" && value.degreeProgram != ""){

      // Alert notice with relavant message
      this.alertNotice("ALERT", "You have entered a Module Title and selected a Degree Program. Module search will proceed with the Module Title");

      // Retrieving registered modules with the search value of moduleTitle
      this.modulesService.retrieveRegisterdModulesModuleTitle(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleTitle).subscribe(response => (this.registeredModules = response));
      
      // Assigning loading spinner to false upon the necessary content has loaded
      this.modulesService.retrieveRegisterdModulesModuleTitle(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleTitle).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

    }
    else if(value.moduleCode != "" && value.degreeProgram != ""){

      // Alert notice with relavant message
      this.alertNotice("ALERT", "You have entered a Module Code and selected a Degree Program. Module search will proceed with the Module Code");

      // Retrieving registered modules with the search value of moduleCode
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(response => (this.registeredModules = response));
      
      // Assigning loading spinner to false upon the necessary content has loaded
      this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

    }
    else if(value.moduleCode != "" || value.moduleTitle != "" || value.degreeProgram != ""){
    
      if(value.moduleCode != ""){

        // Retrieving registered modules with the search value of moduleCode
        this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(response => (this.registeredModules = response));
        
        // Assigning loading spinner to false upon the necessary content has loaded
        this.modulesService.retrieveRegisterdModulesModuleCode(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleCode).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

      }
      if(value.moduleTitle != ""){

        // Retrieving registered modules with the search value of moduleTitle
        this.modulesService.retrieveRegisterdModulesModuleTitle(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleTitle).subscribe(response => (this.registeredModules = response));
        
        // Assigning loading spinner to false upon the necessary content has loaded
        this.modulesService.retrieveRegisterdModulesModuleTitle(this.sideMenuPageUserFaculty.passUserFaculty(), value.moduleTitle).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

      }
      if(value.degreeProgram != ""){

        // Retrieving registered modules with the search value of degreeProgram
        this.modulesService.retrieveRegisterdModulesDegreeProgram(this.sideMenuPageUserFaculty.passUserFaculty(), value.degreeProgram, this.awardingBodyUniversity).subscribe(response => (this.registeredModules = response));
        
        // Assigning loading spinner to false upon the necessary content has loaded
        this.modulesService.retrieveRegisterdModulesDegreeProgram(this.sideMenuPageUserFaculty.passUserFaculty(), value.degreeProgram, this.awardingBodyUniversity).subscribe(() => this.loadingSpinnerSearchRegisteredModule = false);

      }

    }

  }




  // Opening more details module popover
  async moreDetailsRegisteredModule(ev: Event, value){
    const moreDetailsModulePopover = await this.popoverController.create({
      component: MoreDetailsModulePopoverPage,
      componentProps: {
        moduleDocId: value.payload.doc.id,
        assignedLecturer: value.payload.doc.data().assignedLecturer,
        assignedLectureHall: value.payload.doc.data().assignedLectureHall
      },
      event: ev
    });

    moreDetailsModulePopover.present();
  }


  // Opening edit module modal 
  async editRegisteredModule(value){
    const editModuleModal = await this.modalController.create({
      component: EditModuleModalPage,
      // Passing values to the modal using 'componentProps'
      componentProps: {
        moduleDocId: value.payload.doc.id,
        moduleCode: value.payload.doc.data().moduleCode,
        moduleTitle: value.payload.doc.data().moduleTitle,
        moduleCreditsWeighting: value.payload.doc.data().creditsWeighting,
        moduleDegree: value.payload.doc.data().degree,
        moduleAwardingBodyUniversity: value.payload.doc.data().awardingBodyUniversity,
        moduleAcademicPeriodYear: value.payload.doc.data().academicPeriod.academicYear,
        moduleAcademicPeriodSemester: value.payload.doc.data().academicPeriod.academicSemester,
        moduleModuleLeader: value.payload.doc.data().moduleLeader,
        moduleAssignedLecturer: value.payload.doc.data().assignedLecturer,
        moduleAssignedLectureHall: value.payload.doc.data().assignedLectureHall,
        userFaculty: this.sideMenuPageUserFaculty.passUserFaculty()
      },
      // Disabling modal closing from any outside clicks
      backdropDismiss: false
    });
    editModuleModal.present();
  }




  // Confirm Box Implementation (Remove registered module process)
  async removeRegisteredModule ( title: string, content: string, DocId) {

    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [

        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("Alert Box: Remove Registered Module Request Denied");
          }
        },
        {
          text: 'Continue',
          handler: () => {
            console.log("Alert Box: Remove Registered Module Request Accepted");

            // Calling function to remove lecture session
            this.modulesService.removeRegisteredModule(this.sideMenuPageUserFaculty.passUserFaculty(), DocId);

          }
        }

      ]
    });

    await alert.present();

  }






  // Function for the process of searching modules
  doRegisterModule(value){

    console.log(value);

    // Calling the function to add the details into firestore database by passing the necessary value.
    this.modulesService.registerModule(this.sideMenuPageUserFaculty.passUserFaculty(), value, this.awardingBodyUniversity);

    this.alertNotice("Module Registered", "Module has been registered.");

  }




}
