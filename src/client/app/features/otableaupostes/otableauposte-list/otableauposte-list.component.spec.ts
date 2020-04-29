import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtableauposteListComponent as OtableauposteListComponent } from './otableauposte-list.component';

describe('OtableaupostListComponent', () => {
  let component: OtableauposteListComponent;
  let fixture: ComponentFixture<OtableauposteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtableauposteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtableauposteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
