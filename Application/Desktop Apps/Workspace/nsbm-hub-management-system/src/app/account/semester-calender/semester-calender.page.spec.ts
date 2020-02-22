import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SemesterCalenderPage } from './semester-calender.page';

describe('SemesterCalenderPage', () => {
  let component: SemesterCalenderPage;
  let fixture: ComponentFixture<SemesterCalenderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterCalenderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SemesterCalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
