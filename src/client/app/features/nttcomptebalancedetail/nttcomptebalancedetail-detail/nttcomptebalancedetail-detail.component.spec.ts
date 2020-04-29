import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalancedetailDetailComponent } from './nttcomptebalancedetail-detail.component';

describe('NttcomptebalancedetailDetailComponent', () => {
  let component: NttcomptebalancedetailDetailComponent;
  let fixture: ComponentFixture<NttcomptebalancedetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalancedetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalancedetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
