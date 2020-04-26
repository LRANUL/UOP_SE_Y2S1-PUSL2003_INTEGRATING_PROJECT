import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPoToStudentsNoticesModalPage } from './edit-po-to-students-notices-modal.page';

describe('EditPoToStudentsNoticesModalPage', () => {
  let component: EditPoToStudentsNoticesModalPage;
  let fixture: ComponentFixture<EditPoToStudentsNoticesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPoToStudentsNoticesModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPoToStudentsNoticesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
