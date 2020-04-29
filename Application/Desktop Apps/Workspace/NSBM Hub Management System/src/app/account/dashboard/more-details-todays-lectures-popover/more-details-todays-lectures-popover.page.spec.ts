import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsTodaysLecturesPopoverPage } from './more-details-todays-lectures-popover.page';

describe('MoreDetailsTodaysLecturesPopoverPage', () => {
  let component: MoreDetailsTodaysLecturesPopoverPage;
  let fixture: ComponentFixture<MoreDetailsTodaysLecturesPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsTodaysLecturesPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsTodaysLecturesPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
