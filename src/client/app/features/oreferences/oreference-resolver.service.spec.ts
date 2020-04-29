import { TestBed } from '@angular/core/testing';

import { OreferenceResolverService } from './oreference-resolver.service';

describe('OreferenceResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OreferenceResolverService = TestBed.get(OreferenceResolverService);
    expect(service).toBeTruthy();
  });
});
