import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtableauposteEditComponent } from './otableauposte-edit.component';

describe('OtableaupostEditComponent', () => {
  let component: OtableauposteEditComponent;
  let fixture: ComponentFixture<OtableauposteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtableauposteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtableauposteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
