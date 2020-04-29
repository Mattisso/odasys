import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderDetailsComponent } from './uploader-details.component';

describe('UploaderDetailsComponent', () => {
  let component: UploaderDetailsComponent;
  let fixture: ComponentFixture<UploaderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
