import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceDetailComponent } from './nstbalance-detail.component';

describe('NstbalanceDetailComponent', () => {
  let component: NstbalanceDetailComponent;
  let fixture: ComponentFixture<NstbalanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
