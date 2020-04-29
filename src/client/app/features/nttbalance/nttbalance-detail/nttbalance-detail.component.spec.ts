import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttbalanceDetailComponent } from './nttbalance-detail.component';

describe('NttbalanceDetailComponent', () => {
  let component: NttbalanceDetailComponent;
  let fixture: ComponentFixture<NttbalanceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttbalanceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttbalanceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
