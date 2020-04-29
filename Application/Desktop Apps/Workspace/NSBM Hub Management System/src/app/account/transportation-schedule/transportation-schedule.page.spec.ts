import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportationSchedulePage } from './transportation-schedule.page';

describe('TransportationSchedulePage', () => {
  let component: TransportationSchedulePage;
  let fixture: ComponentFixture<TransportationSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportationSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportationSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
