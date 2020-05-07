import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturerPage } from './lecturer.page';

describe('LecturerPage', () => {
  let component: LecturerPage;
  let fixture: ComponentFixture<LecturerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
