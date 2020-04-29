import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBatchModalPage } from './edit-batch-modal.page';

describe('EditBatchModalPage', () => {
  let component: EditBatchModalPage;
  let fixture: ComponentFixture<EditBatchModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBatchModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBatchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
