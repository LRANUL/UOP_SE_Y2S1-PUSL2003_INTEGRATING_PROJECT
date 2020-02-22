import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SideMenuPage } from './side-menu.page';

describe('SideMenuPage', () => {
  let component: SideMenuPage;
  let fixture: ComponentFixture<SideMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
