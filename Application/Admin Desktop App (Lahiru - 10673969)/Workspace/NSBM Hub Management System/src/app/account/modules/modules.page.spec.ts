import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModulesPage } from './modules.page';

describe('ModulesPage', () => {
  let component: ModulesPage;
  let fixture: ComponentFixture<ModulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
