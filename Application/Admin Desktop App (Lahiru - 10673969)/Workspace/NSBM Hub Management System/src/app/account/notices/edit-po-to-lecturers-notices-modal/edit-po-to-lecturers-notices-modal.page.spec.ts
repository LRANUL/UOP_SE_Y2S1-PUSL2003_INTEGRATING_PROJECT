import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPoToLecturersNoticesModalPage } from './edit-po-to-lecturers-notices-modal.page';

describe('EditPoToLecturersNoticesModalPage', () => {
  let component: EditPoToLecturersNoticesModalPage;
  let fixture: ComponentFixture<EditPoToLecturersNoticesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPoToLecturersNoticesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPoToLecturersNoticesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
