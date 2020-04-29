import { TestBed, async, inject } from '@angular/core/testing';

import { OreferenceGuardService } from './oreference-guard.service';

describe('OreferenceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OreferenceGuardService]
    });
  });

  it('should ...', inject([OreferenceGuardService], (guard: OreferenceGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
