import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticeDetailPage } from './notice-detail.page';

describe('NoticeDetailPage', () => {
  let component: NoticeDetailPage;
  let fixture: ComponentFixture<NoticeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
