import { TestBed } from '@angular/core/testing';

import { OdaDropDownListService } from './oda-drop-down-list.service';

describe('OdaDropDownListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OdaDropDownListService = TestBed.get(OdaDropDownListService);
    expect(service).toBeTruthy();
  });
});
