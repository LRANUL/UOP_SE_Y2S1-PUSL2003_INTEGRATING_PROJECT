import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCreditWeightingModalPage } from './edit-credit-weighting-modal.page';

describe('EditCreditWeightingModalPage', () => {
  let component: EditCreditWeightingModalPage;
  let fixture: ComponentFixture<EditCreditWeightingModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCreditWeightingModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCreditWeightingModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
