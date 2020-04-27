import { TestBed } from '@angular/core/testing';

import { OexerccomptaResolverService } from './oexerccompta-resolver.service';

describe('OexerccomptaResolverService', () => {
  let service: OexerccomptaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OexerccomptaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
