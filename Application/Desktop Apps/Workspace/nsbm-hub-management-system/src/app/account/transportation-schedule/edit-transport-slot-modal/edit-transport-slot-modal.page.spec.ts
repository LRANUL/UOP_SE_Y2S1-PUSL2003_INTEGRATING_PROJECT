import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTransportSlotModalPage } from './edit-transport-slot-modal.page';

describe('EditTransportSlotModalPage', () => {
  let component: EditTransportSlotModalPage;
  let fixture: ComponentFixture<EditTransportSlotModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransportSlotModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTransportSlotModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
