import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotificationsPanelPage } from './notifications-panel.page';

describe('NotificationsPanelPage', () => {
  let component: NotificationsPanelPage;
  let fixture: ComponentFixture<NotificationsPanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsPanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
