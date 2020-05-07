import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNotesPage } from './edit-notes.page';

describe('EditNotesPage', () => {
  let component: EditNotesPage;
  let fixture: ComponentFixture<EditNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
