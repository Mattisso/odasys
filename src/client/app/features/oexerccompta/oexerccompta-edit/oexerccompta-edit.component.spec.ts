import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OexerccomptaEditComponent } from './oexerccompta-edit.component';

describe('OexerccomptaEditComponent', () => {
  let component: OexerccomptaEditComponent;
  let fixture: ComponentFixture<OexerccomptaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OexerccomptaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OexerccomptaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
