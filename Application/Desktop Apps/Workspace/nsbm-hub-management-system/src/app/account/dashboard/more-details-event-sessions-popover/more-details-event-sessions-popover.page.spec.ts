import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsEventSessionsPopoverPage } from './more-details-event-sessions-popover.page';

describe('MoreDetailsEventSessionsPopoverPage', () => {
  let component: MoreDetailsEventSessionsPopoverPage;
  let fixture: ComponentFixture<MoreDetailsEventSessionsPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsEventSessionsPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsEventSessionsPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
