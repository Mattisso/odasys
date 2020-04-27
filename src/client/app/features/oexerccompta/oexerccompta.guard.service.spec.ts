import { TestBed } from '@angular/core/testing';

import { OexerccomptaGuard } from './oexerccompta.guard.service';

describe('OexerccomptaGuard', () => {
  let guard: OexerccomptaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OexerccomptaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
