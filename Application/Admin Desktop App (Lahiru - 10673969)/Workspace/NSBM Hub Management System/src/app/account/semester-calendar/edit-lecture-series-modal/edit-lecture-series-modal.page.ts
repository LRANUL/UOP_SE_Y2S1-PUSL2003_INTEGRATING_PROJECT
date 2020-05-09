import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';

@Component({
  selector: 'app-edit-lecture-series-modal',
  templateUrl: './edit-lecture-series-modal.page.html',
  styleUrls: ['./edit-lecture-series-modal.page.scss'],
})
export class EditLectureSeriesModalPage implements OnInit {

  passedLectureSeriesDocId = null;
  passedLectureSeriesNoOfLectures = null;
  passedLectureSeriesEnrollmentKey = null;
  passedLoggedInUserFaculty = null;

  editLectureSeriesForm: FormGroup;
  

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private editLectureSeriesService: FirestoreService,
    private alertController: AlertController
  ) { }

  ngOnInit() {

    this.passedLectureSeriesDocId = this.navParams.get('lectureSeriesDocId');
    this.passedLectureSeriesNoOfLectures = this.navParams.get('lectureSeriesNoOfLecturers');
    this.passedLectureSeriesEnrollmentKey = this.navParams.get('lectureSeriesEnrollmentKey');
    this.passedLoggedInUserFaculty = this.navParams.get('loggedInUserFaculty');

    this.editLectureSeriesForm = this.formBuilder.group({
      noOfLectures: new FormControl(''),
      enrollmentKey: new FormControl('')
    });

    this.editLectureSeriesForm.setValue({
      noOfLectures: this.passedLectureSeriesNoOfLectures,
      enrollmentKey: this.passedLectureSeriesEnrollmentKey
    })

  }


  doEditLectureSeries(value){

    this.editLectureSeriesService.updateLectureSeries(value, this.passedLectureSeriesDocId, this.passedLoggedInUserFaculty);

    this.alertNotice("Lecture Series Updated", "Lecture series details has been updated.");
  
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



  closeEditLectureSeriesModal(){
    this.modalController.dismiss();
  }

}
