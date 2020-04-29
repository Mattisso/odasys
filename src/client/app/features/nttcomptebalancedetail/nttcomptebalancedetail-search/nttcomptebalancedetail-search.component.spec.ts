import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalancedetailSearchComponent } from './nttcomptebalancedetail-search.component';

describe('NttcomptebalancedetailSearchComponent', () => {
  let component: NttcomptebalancedetailSearchComponent;
  let fixture: ComponentFixture<NttcomptebalancedetailSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalancedetailSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalancedetailSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
