import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPagePage } from './login-page.page';

describe('LoginPagePage', () => {
  let component: LoginPagePage;
  let fixture: ComponentFixture<LoginPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
