import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalanceEditComponent } from './nttcomptebalance-edit.component';

describe('NttcomptebalanceEditComponent', () => {
  let component: NttcomptebalanceEditComponent;
  let fixture: ComponentFixture<NttcomptebalanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
