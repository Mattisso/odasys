import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OexerccomptaDetailComponent } from './oexerccompta-detail.component';

describe('OexerccomptaDetailComponent', () => {
  let component: OexerccomptaDetailComponent;
  let fixture: ComponentFixture<OexerccomptaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OexerccomptaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OexerccomptaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
