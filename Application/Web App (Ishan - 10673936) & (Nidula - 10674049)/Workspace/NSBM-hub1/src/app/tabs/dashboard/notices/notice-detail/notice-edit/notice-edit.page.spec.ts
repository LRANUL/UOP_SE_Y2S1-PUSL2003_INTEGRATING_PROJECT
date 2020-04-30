import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticeEditPage } from './notice-edit.page';

describe('NoticeEditPage', () => {
  let component: NoticeEditPage;
  let fixture: ComponentFixture<NoticeEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
