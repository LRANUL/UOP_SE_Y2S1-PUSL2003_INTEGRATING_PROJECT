import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewNoticePage } from './new-notice.page';

describe('NewNoticePage', () => {
  let component: NewNoticePage;
  let fixture: ComponentFixture<NewNoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNoticePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewNoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
