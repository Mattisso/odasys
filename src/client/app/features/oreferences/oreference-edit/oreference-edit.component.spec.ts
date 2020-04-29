import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OreferenceEditComponent } from './oreference-edit.component';

describe('OreferenceEditComponent', () => {
  let component: OreferenceEditComponent;
  let fixture: ComponentFixture<OreferenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OreferenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OreferenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
