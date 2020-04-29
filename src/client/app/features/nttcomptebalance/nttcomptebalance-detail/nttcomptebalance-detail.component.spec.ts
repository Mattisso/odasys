import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalanceDetailComponent } from './nttcomptebalance-detail.component';

describe('NttcomptebalanceDetailComponent', () => {
  let component: NttcomptebalanceDetailComponent;
  let fixture: ComponentFixture<NttcomptebalanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
