import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NstbalanceSearchComponent } from './nstbalance-search.component';

describe('NstbalanceSearchComponent', () => {
  let component: NstbalanceSearchComponent;
  let fixture: ComponentFixture<NstbalanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NstbalanceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NstbalanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
