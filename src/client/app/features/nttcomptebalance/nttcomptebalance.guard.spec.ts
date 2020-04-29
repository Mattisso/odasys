import { TestBed, async, inject } from '@angular/core/testing';

import { NttcomptebalanceGuard } from './nttcomptebalance.guard';

describe('NttcomptebalanceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NttcomptebalanceGuard]
    });
  });

  it('should ...', inject([NttcomptebalanceGuard], (guard: NttcomptebalanceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
