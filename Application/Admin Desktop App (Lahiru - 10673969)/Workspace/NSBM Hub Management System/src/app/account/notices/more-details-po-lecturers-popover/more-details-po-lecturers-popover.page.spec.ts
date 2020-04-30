import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoreDetailsPoLecturersPopoverPage } from './more-details-po-lecturers-popover.page';

describe('MoreDetailsPoLecturersPopoverPage', () => {
  let component: MoreDetailsPoLecturersPopoverPage;
  let fixture: ComponentFixture<MoreDetailsPoLecturersPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailsPoLecturersPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoreDetailsPoLecturersPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
