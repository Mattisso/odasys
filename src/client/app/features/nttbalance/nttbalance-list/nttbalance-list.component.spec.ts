import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttbalanceListComponent } from './nttbalance-list.component';

describe('NttbalanceListComponent', () => {
  let component: NttbalanceListComponent;
  let fixture: ComponentFixture<NttbalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttbalanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttbalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
