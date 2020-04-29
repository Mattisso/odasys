import { TestBed } from '@angular/core/testing';

import { NttcomptebalanceService } from './nttcomptebalance.service';

describe('NttcomptebalanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttcomptebalanceService = TestBed.get(NttcomptebalanceService);
    expect(service).toBeTruthy();
  });
});
