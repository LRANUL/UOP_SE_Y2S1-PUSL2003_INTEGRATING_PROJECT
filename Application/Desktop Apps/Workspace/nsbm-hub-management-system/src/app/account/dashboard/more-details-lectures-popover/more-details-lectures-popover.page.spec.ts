import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsLecturesPopoverPage } from './more-details-lectures-popover.page';

describe('MoreDetailsLecturesPopoverPage', () => {
  let component: MoreDetailsLecturesPopoverPage;
  let fixture: ComponentFixture<MoreDetailsLecturesPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsLecturesPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsLecturesPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
