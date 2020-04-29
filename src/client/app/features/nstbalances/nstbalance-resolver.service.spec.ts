import { TestBed } from '@angular/core/testing';

import { NstbalanceResolverService } from './nstbalance-resolver.service';

describe('NstbalanceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NstbalanceResolverService = TestBed.get(NstbalanceResolverService);
    expect(service).toBeTruthy();
  });
});
