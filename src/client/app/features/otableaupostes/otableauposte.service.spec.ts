import { TestBed } from '@angular/core/testing';

import { OtableauposteService } from './otableauposte.service';

describe('OtableaupostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtableauposteService = TestBed.get(OtableauposteService);
    expect(service).toBeTruthy();
  });
});
