import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  searchRegisteredModuleForm: FormGroup;

  constructor(
    private modulesService: FirestoreService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.searchRegisteredModuleForm = this.formBuilder.group({
      moduleCode: new FormControl('', Validators.required),
      moduleTitle: new FormControl('', Validators.required),
      degreeProgram: new FormControl('', Validators.required)
    });






  }

  // Function for the process of searching modules
  doSearchRegisteredModule(){

  }

}
