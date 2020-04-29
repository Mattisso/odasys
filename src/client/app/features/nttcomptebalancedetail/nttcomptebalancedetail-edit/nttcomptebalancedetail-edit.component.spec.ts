import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NttcomptebalancedetailEditComponent } from './nttcomptebalancedetail-edit.component';

describe('NttcomptebalancedetailEditComponent', () => {
  let component: NttcomptebalancedetailEditComponent;
  let fixture: ComponentFixture<NttcomptebalancedetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NttcomptebalancedetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NttcomptebalancedetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
