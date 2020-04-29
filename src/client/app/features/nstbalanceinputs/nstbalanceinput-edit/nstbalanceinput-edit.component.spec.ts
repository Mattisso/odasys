import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceinputEditComponent } from './nstbalanceinput-edit.component';

describe('NstbalanceinputEditComponent', () => {
  let component: NstbalanceinputEditComponent;
  let fixture: ComponentFixture<NstbalanceinputEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceinputEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceinputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
