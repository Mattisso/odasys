import { TestBed } from '@angular/core/testing';

import { OexerccomptaService } from './oexerccompta.service';

describe('OexerccomptaService', () => {
  let service: OexerccomptaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OexerccomptaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
