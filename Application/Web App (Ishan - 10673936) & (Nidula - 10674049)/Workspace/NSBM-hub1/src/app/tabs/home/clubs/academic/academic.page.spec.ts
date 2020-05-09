import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AcademicPage } from './academic.page';

describe('AcademicPage', () => {
  let component: AcademicPage;
  let fixture: ComponentFixture<AcademicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
