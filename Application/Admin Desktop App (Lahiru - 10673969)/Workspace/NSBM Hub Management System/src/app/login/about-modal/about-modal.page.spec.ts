import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AboutModalPage } from './about-modal.page';

describe('AboutModalPage', () => {
  let component: AboutModalPage;
  let fixture: ComponentFixture<AboutModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
