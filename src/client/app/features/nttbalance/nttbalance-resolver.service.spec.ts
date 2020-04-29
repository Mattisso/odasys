import { TestBed } from '@angular/core/testing';

import { NttbalanceResolverService } from './nttbalance-resolver.service';

describe('NttbalanceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttbalanceResolverService = TestBed.get(NttbalanceResolverService);
    expect(service).toBeTruthy();
  });
});
