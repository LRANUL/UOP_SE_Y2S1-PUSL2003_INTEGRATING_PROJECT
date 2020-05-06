import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNewsItemModalPage } from './edit-news-item-modal.page';

describe('EditNewsItemModalPage', () => {
  let component: EditNewsItemModalPage;
  let fixture: ComponentFixture<EditNewsItemModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNewsItemModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNewsItemModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
