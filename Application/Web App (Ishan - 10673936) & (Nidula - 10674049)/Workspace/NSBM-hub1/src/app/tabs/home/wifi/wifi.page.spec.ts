import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WifiPage } from './wifi.page';

describe('WifiPage', () => {
  let component: WifiPage;
  let fixture: ComponentFixture<WifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
