import { TestBed } from '@angular/core/testing';

import { NttcomptebalanceResolverService } from './nttcomptebalance-resolver.service';

describe('NttcomptebalanceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttcomptebalanceResolverService = TestBed.get(NttcomptebalanceResolverService);
    expect(service).toBeTruthy();
  });
});
