import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalComponent } from './international.component';

describe('InternationalComponent', () => {
  let component: InternationalComponent;
  let fixture: ComponentFixture<InternationalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
