import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EsignPage } from './esign.page';

describe('EsignPage', () => {
  let component: EsignPage;
  let fixture: ComponentFixture<EsignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EsignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
