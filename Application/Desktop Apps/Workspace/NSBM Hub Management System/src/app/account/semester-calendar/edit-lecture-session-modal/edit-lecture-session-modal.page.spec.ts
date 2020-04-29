import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLectureSessionModalPage } from './edit-lecture-session-modal.page';

describe('EditLectureSessionModalPage', () => {
  let component: EditLectureSessionModalPage;
  let fixture: ComponentFixture<EditLectureSessionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLectureSessionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLectureSessionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
