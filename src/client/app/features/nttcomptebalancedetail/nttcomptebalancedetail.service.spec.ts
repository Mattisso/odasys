import { TestBed } from '@angular/core/testing';

import { NttcomptebalancedetailService } from './nttcomptebalancedetail.service';

describe('NttcomptebalancedetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NttcomptebalancedetailService = TestBed.get(NttcomptebalancedetailService);
    expect(service).toBeTruthy();
  });
});
