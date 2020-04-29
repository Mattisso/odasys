import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceListComponent } from './nstbalance-list.component';

describe('NstbalanceListComponent', () => {
  let component: NstbalanceListComponent;
  let fixture: ComponentFixture<NstbalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
