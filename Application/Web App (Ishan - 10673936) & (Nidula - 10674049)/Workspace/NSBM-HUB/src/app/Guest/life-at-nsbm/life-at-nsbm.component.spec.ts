import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtNsbmComponent } from './life-at-nsbm.component';

describe('LifeAtNsbmComponent', () => {
  let component: LifeAtNsbmComponent;
  let fixture: ComponentFixture<LifeAtNsbmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeAtNsbmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeAtNsbmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
