import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OreferenceDetailComponent } from './oreference-detail.component';

describe('OreferenceDetailComponent', () => {
  let component: OreferenceDetailComponent;
  let fixture: ComponentFixture<OreferenceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OreferenceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OreferenceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
