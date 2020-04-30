import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDegreeProgramModalPage } from './edit-degree-program-modal.page';

describe('EditDegreeProgramModalPage', () => {
  let component: EditDegreeProgramModalPage;
  let fixture: ComponentFixture<EditDegreeProgramModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDegreeProgramModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDegreeProgramModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
