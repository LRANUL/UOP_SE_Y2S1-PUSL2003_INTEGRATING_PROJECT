import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNoticeCategoryModalPage } from './edit-notice-category-modal.page';

describe('EditNoticeCategoryModalPage', () => {
  let component: EditNoticeCategoryModalPage;
  let fixture: ComponentFixture<EditNoticeCategoryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoticeCategoryModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoticeCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
