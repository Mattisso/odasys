import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdaDropDownListComponent } from './oda-drop-down-list.component';

describe('OdaDropDownListComponent', () => {
  let component: OdaDropDownListComponent;
  let fixture: ComponentFixture<OdaDropDownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdaDropDownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdaDropDownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
