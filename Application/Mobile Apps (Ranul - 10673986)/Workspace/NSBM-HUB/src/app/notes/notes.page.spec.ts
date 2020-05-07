import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { notesPage } from './notes.page';

describe('notesPage', () => {
  let component: notesPage;
  let fixture: ComponentFixture<notesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [notesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(notesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
