import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceEditComponent } from './nstbalance-edit.component';

describe('NstbalanceEditComponent', () => {
  let component: NstbalanceEditComponent;
  let fixture: ComponentFixture<NstbalanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
