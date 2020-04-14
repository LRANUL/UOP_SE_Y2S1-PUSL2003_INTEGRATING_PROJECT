import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditModuleModalPage } from './edit-module-modal.page';

describe('EditModuleModalPage', () => {
  let component: EditModuleModalPage;
  let fixture: ComponentFixture<EditModuleModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditModuleModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditModuleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
