import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReligionPage } from './religion.page';

describe('ReligionPage', () => {
  let component: ReligionPage;
  let fixture: ComponentFixture<ReligionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReligionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
