import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsLecturersPoPopoverPage } from './more-details-lecturers-po-popover.page';

describe('MoreDetailsLecturersPoPopoverPage', () => {
  let component: MoreDetailsLecturersPoPopoverPage;
  let fixture: ComponentFixture<MoreDetailsLecturersPoPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsLecturersPoPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsLecturersPoPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
