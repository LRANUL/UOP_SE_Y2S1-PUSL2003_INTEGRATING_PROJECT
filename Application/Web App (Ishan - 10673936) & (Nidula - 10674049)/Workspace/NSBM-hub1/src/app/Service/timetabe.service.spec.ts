import { TestBed } from '@angular/core/testing';

import { TimetabeService } from './timetabe.service';

describe('TimetabeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimetabeService = TestBed.get(TimetabeService);
    expect(service).toBeTruthy();
  });
});
