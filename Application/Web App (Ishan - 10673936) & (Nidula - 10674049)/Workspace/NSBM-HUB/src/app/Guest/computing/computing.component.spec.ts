import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputingComponent } from './computing.component';

describe('ComputingComponent', () => {
  let component: ComputingComponent;
  let fixture: ComponentFixture<ComputingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
