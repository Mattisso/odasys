import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtableauposteDetailComponent } from './otableauposte-detail.component';

describe('OtableaupostDetailComponent', () => {
  let component: OtableauposteDetailComponent;
  let fixture: ComponentFixture<OtableauposteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtableauposteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtableauposteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
