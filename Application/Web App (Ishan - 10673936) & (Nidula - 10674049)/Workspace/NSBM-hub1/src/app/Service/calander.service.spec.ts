import { TestBed } from '@angular/core/testing';

import { CalanderService } from './calander.service';

describe('CalanderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalanderService = TestBed.get(CalanderService);
    expect(service).toBeTruthy();
  });
});
