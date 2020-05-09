import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InternationalPage } from './international.page';

describe('InternationalPage', () => {
  let component: InternationalPage;
  let fixture: ComponentFixture<InternationalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InternationalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
