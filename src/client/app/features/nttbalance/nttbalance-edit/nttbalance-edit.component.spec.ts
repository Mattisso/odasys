import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttbalanceEditComponent } from './nttbalance-edit.component';

describe('NttbalanceEditComponent', () => {
  let component: NttbalanceEditComponent;
  let fixture: ComponentFixture<NttbalanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttbalanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttbalanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
