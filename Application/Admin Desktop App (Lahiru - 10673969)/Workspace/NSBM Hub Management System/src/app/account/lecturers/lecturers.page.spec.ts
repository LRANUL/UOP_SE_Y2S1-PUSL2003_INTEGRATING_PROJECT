import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LecturersPage } from './lecturers.page';

describe('LecturersPage', () => {
  let component: LecturersPage;
  let fixture: ComponentFixture<LecturersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecturersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LecturersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
