import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalanceListComponent } from './nttcomptebalance-list.component';

describe('NttcomptebalanceListComponent', () => {
  let component: NttcomptebalanceListComponent;
  let fixture: ComponentFixture<NttcomptebalanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
