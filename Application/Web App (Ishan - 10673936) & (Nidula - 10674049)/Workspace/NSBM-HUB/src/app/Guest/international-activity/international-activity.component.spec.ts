import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalActivityComponent } from './international-activity.component';

describe('InternationalActivityComponent', () => {
  let component: InternationalActivityComponent;
  let fixture: ComponentFixture<InternationalActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
