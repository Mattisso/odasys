import { TestBed, async, inject } from '@angular/core/testing';

import { OtableauposteGuardService } from './otableauposte-guard.service';

describe('OtableauposteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtableauposteGuardService]
    });
  });

  it('should ...', inject([OtableauposteGuardService], (guard: OtableauposteGuardService) => {
    expect(guard).toBeTruthy();
  }));
});
