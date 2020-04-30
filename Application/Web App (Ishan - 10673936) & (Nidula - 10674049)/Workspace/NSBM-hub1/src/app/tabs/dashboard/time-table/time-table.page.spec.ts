import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeTablePage } from './time-table.page';

describe('TimeTablePage', () => {
  let component: TimeTablePage;
  let fixture: ComponentFixture<TimeTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTablePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
