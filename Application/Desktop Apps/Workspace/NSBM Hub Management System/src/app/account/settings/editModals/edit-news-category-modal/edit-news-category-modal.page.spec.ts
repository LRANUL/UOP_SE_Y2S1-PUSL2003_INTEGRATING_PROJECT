import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNewsCategoryModalPage } from './edit-news-category-modal.page';

describe('EditNewsCategoryModalPage', () => {
  let component: EditNewsCategoryModalPage;
  let fixture: ComponentFixture<EditNewsCategoryModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewsCategoryModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNewsCategoryModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
