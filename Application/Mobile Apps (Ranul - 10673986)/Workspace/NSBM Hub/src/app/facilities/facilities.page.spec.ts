import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesPage } from './facilities.page';

describe('FacilitiesPage', () => {
  let component: FacilitiesPage;
  let fixture: ComponentFixture<FacilitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
