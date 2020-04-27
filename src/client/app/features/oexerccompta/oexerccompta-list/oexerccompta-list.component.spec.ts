import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OexerccomptaListComponent } from './oexerccompta-list.component';

describe('OexerccomptaListComponent', () => {
  let component: OexerccomptaListComponent;
  let fixture: ComponentFixture<OexerccomptaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OexerccomptaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OexerccomptaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
