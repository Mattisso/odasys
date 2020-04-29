import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNstbalanceinputsComponent } from './manage-nstbalanceinputs.component';

describe('ManageNstbalanceinputsComponent', () => {
  let component: ManageNstbalanceinputsComponent;
  let fixture: ComponentFixture<ManageNstbalanceinputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNstbalanceinputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNstbalanceinputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
