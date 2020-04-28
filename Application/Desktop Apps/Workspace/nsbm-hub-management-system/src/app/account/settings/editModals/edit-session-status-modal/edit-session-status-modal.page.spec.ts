import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSessionStatusModalPage } from './edit-session-status-modal.page';

describe('EditSessionStatusModalPage', () => {
  let component: EditSessionStatusModalPage;
  let fixture: ComponentFixture<EditSessionStatusModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSessionStatusModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSessionStatusModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
