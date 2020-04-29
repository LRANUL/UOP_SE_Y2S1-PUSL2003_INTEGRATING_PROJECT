import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLectureSeriesModalPage } from './edit-lecture-series-modal.page';

describe('EditLectureSeriesModalPage', () => {
  let component: EditLectureSeriesModalPage;
  let fixture: ComponentFixture<EditLectureSeriesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLectureSeriesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLectureSeriesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
