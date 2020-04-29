import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterModalPage } from './register-modal.page';

describe('RegisterModalPage', () => {
  let component: RegisterModalPage;
  let fixture: ComponentFixture<RegisterModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
