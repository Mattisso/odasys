import { TestBed } from '@angular/core/testing';

import { NttbalanceService } from './nttbalance.service';

describe('NttbalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttbalanceService = TestBed.get(NttbalanceService);
    expect(service).toBeTruthy();
  });
});
