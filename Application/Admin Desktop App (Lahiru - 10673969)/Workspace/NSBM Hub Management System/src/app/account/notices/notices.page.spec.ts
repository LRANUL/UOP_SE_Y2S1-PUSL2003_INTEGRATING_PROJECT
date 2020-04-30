import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NoticesPage } from './notices.page';

describe('NoticesPage', () => {
  let component: NoticesPage;
  let fixture: ComponentFixture<NoticesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NoticesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
