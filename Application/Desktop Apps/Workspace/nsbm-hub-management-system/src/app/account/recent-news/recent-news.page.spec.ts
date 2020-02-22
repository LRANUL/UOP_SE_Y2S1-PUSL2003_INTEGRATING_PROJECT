import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentNewsPage } from './recent-news.page';

describe('RecentNewsPage', () => {
  let component: RecentNewsPage;
  let fixture: ComponentFixture<RecentNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
