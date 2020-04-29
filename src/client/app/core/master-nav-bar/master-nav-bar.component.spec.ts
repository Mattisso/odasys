import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNavBarComponent } from './master-nav-bar.component';

describe('MasterNavBarComponent ', () => {
  let component: MasterNavBarComponent;
  let fixture: ComponentFixture<MasterNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterNavBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
