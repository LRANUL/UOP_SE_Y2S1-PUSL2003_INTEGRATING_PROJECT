import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLectureHallModalPage } from './edit-lecture-hall-modal.page';

describe('EditLectureHallModalPage', () => {
  let component: EditLectureHallModalPage;
  let fixture: ComponentFixture<EditLectureHallModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLectureHallModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLectureHallModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
