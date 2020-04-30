import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShuttleSchedulePage } from './shuttle-schedule.page';

describe('ShuttleSchedulePage', () => {
  let component: ShuttleSchedulePage;
  let fixture: ComponentFixture<ShuttleSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuttleSchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShuttleSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
