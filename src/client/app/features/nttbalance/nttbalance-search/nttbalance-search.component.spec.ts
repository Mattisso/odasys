import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttbalanceSearchComponent } from './nttbalance-search.component';

describe('NttbalanceSearchComponent', () => {
  let component: NttbalanceSearchComponent;
  let fixture: ComponentFixture<NttbalanceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttbalanceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttbalanceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
