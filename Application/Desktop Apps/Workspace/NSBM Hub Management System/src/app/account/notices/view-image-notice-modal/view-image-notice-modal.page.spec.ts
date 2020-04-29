import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewImageNoticeModalPage } from './view-image-notice-modal.page';

describe('ViewImageNoticeModalPage', () => {
  let component: ViewImageNoticeModalPage;
  let fixture: ComponentFixture<ViewImageNoticeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImageNoticeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewImageNoticeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
