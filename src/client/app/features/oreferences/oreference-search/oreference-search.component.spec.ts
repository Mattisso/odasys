import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OreferenceSearchComponent } from './oreference-search.component';

describe('OreferenceSearchComponent', () => {
  let component: OreferenceSearchComponent;
  let fixture: ComponentFixture<OreferenceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OreferenceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OreferenceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
