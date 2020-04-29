import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OreferenceListComponent } from './oreference-list.component';

describe('OreferenceListComponent', () => {
  let component: OreferenceListComponent;
  let fixture: ComponentFixture<OreferenceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OreferenceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OreferenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
