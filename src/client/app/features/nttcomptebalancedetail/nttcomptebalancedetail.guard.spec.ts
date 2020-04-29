import { TestBed, async, inject } from '@angular/core/testing';

import { NttcomptebalancedetailGuard } from './nttcomptebalancedetail.guard';

describe('NttcomptebalancedetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NttcomptebalancedetailGuard]
    });
  });

  it('should ...', inject([NttcomptebalancedetailGuard], (guard: NttcomptebalancedetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
