import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubsPage } from './clubs.page';

describe('ClubsPage', () => {
  let component: ClubsPage;
  let fixture: ComponentFixture<ClubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
