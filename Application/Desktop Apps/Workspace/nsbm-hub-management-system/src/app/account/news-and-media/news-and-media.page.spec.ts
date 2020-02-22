import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsAndMediaPage } from './news-and-media.page';

describe('NewsAndMediaPage', () => {
  let component: NewsAndMediaPage;
  let fixture: ComponentFixture<NewsAndMediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsAndMediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsAndMediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
