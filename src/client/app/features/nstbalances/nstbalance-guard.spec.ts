import { TestBed, async, inject } from '@angular/core/testing';

import { NstbalanceGuardService } from './nstbalance-guard.service';

describe('NstbalanceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NstbalanceGuardService]
    });
  });

  it('should ...', inject([NstbalanceGuardService], (guard: NstbalanceGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
