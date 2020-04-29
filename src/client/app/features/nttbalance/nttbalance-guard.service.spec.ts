import { TestBed } from '@angular/core/testing';

import { NttbalanceGuardService } from './nttbalance-guard.service';

describe('NttbalanceGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttbalanceGuardService = TestBed.get(NttbalanceGuardService);
    expect(service).toBeTruthy();
  });
});
