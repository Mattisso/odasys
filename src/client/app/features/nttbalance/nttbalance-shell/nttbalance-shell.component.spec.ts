import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttbalanceShellComponent } from './nttbalance-shell.component';

describe('NttbalanceShellComponent', () => {
  let component: NttbalanceShellComponent;
  let fixture: ComponentFixture<NttbalanceShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttbalanceShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttbalanceShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
