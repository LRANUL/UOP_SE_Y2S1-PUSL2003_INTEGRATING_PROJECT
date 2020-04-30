import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsPoStudentsPopoverPage } from './more-details-po-students-popover.page';

describe('MoreDetailsPoStudentsPopoverPage', () => {
  let component: MoreDetailsPoStudentsPopoverPage;
  let fixture: ComponentFixture<MoreDetailsPoStudentsPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsPoStudentsPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsPoStudentsPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
