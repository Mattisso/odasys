import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtableauposteSearchComponent} from './otableauposte-search.component';

describe('OtableaupostSearchComponent', () => {
  let component: OtableauposteSearchComponent;
  let fixture: ComponentFixture<OtableauposteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtableauposteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtableauposteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
