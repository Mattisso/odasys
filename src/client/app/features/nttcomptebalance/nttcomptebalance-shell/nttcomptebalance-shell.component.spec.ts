import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalanceShellComponent } from './nttcomptebalance-shell.component';

describe('NttcomptebalanceShellComponent', () => {
  let component: NttcomptebalanceShellComponent;
  let fixture: ComponentFixture<NttcomptebalanceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalanceShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalanceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
