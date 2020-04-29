import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditUserAccountStatusModalPage } from './edit-user-account-status-modal.page';

describe('EditUserAccountStatusModalPage', () => {
  let component: EditUserAccountStatusModalPage;
  let fixture: ComponentFixture<EditUserAccountStatusModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserAccountStatusModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserAccountStatusModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
