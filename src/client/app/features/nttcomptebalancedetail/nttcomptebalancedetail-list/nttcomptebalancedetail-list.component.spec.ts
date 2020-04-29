import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalancedetailListComponent } from './nttcomptebalancedetail-list.component';

describe('NttcomptebalancedetailListComponent', () => {
  let component: NttcomptebalancedetailListComponent;
  let fixture: ComponentFixture<NttcomptebalancedetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalancedetailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalancedetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
