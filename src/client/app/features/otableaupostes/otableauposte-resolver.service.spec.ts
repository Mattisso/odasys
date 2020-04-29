import { TestBed } from '@angular/core/testing';

import { OtableauposteResolverService as OtableauposteResolverService } from './otableauposte-resolver.service';

describe('OtableaupostResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtableauposteResolverService = TestBed.get(OtableauposteResolverService);
    expect(service).toBeTruthy();
  });
});
