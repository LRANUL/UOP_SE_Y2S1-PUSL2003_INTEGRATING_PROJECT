import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEventSessionModalPage } from './edit-event-session-modal.page';

describe('EditEventSessionModalPage', () => {
  let component: EditEventSessionModalPage;
  let fixture: ComponentFixture<EditEventSessionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventSessionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEventSessionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
