import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-po-to-students-notices-modal',
  templateUrl: './edit-po-to-students-notices-modal.page.html',
  styleUrls: ['./edit-po-to-students-notices-modal.page.scss'],
})
export class EditPoToStudentsNoticesModalPage implements OnInit {

  passedNoticeDocId = null;
  passedNoticeTitle = null;
  passedNoticeDescription = null;
  passedNoticeCategory = null;

  editPOToStudentsNoticeForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private editPOToStudentsNoticeService: FirestoreService,
    private navParams: NavParams,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.retrievePublishedNoticeCategories();

    this.passedNoticeDocId = this.navParams.get('noticeDocId');
    this.passedNoticeTitle = this.navParams.get('noticeTitle');
    this.passedNoticeDescription = this.navParams.get('noticeDescription');
    this.passedNoticeCategory = this.navParams.get('noticeCategory');

    this.editPOToStudentsNoticeForm = this.formBuilder.group({
      noticeTitle: new FormControl('', Validators.required),
      noticeDescription: new FormControl('', Validators.required),
      noticeCategory: new FormControl('', Validators.required)
    });

    this.editPOToStudentsNoticeForm.setValue({
      noticeTitle: this.passedNoticeTitle,
      noticeDescription: this.passedNoticeDescription,
      noticeCategory: this.passedNoticeCategory
    });
    
  }

  publishedSessionStatuses;
  retrievePublishedNoticeCategories = () =>
    this.editPOToStudentsNoticeService.retrievePublishedNoticeCategories().subscribe(response => (this.publishedSessionStatuses = response));

  
  doEditPOToStudentsNotice(value){
    
  }




  closeEditPOStudentsModal(){
    this.modalController.dismiss();
  }


}
