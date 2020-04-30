import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LectureSchedulePage } from './lecture-schedule.page';

describe('LectureSchedulePage', () => {
  let component: LectureSchedulePage;
  let fixture: ComponentFixture<LectureSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LectureSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
