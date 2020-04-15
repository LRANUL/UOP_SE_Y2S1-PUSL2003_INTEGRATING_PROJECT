import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsNoticePopoverPage } from './more-details-notice-popover.page';

describe('MoreDetailsNoticePopoverPage', () => {
  let component: MoreDetailsNoticePopoverPage;
  let fixture: ComponentFixture<MoreDetailsNoticePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsNoticePopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsNoticePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
