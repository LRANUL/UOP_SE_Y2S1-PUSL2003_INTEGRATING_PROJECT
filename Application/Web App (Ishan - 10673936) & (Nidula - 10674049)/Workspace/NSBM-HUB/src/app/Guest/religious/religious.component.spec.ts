import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligiousComponent } from './religious.component';

describe('ReligiousComponent', () => {
  let component: ReligiousComponent;
  let fixture: ComponentFixture<ReligiousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligiousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligiousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
