import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemesterCalendarPage } from './semester-calendar.page';

describe('SemesterCalendarPage', () => {
  let component: SemesterCalendarPage;
  let fixture: ComponentFixture<SemesterCalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterCalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemesterCalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
