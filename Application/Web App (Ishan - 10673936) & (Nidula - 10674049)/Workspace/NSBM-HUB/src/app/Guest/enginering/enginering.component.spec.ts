import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineringComponent } from './enginering.component';

describe('EngineringComponent', () => {
  let component: EngineringComponent;
  let fixture: ComponentFixture<EngineringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
