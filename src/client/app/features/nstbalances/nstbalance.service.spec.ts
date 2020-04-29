import { TestBed } from '@angular/core/testing';

import { NstbalanceService } from './nstbalance.service';

describe('NstbalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NstbalanceService = TestBed.get(NstbalanceService);
    expect(service).toBeTruthy();
  });
});
