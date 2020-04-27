import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OexerccomptaSearchComponent } from './oexerccompta-search.component';

describe('OexerccomptaSearchComponent', () => {
  let component: OexerccomptaSearchComponent;
  let fixture: ComponentFixture<OexerccomptaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OexerccomptaSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OexerccomptaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
