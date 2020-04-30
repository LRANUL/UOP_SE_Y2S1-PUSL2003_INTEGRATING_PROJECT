import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsEventPopoverPage } from './more-details-event-popover.page';

describe('MoreDetailsEventPopoverPage', () => {
  let component: MoreDetailsEventPopoverPage;
  let fixture: ComponentFixture<MoreDetailsEventPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsEventPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsEventPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
