import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommonAreasComponent } from './admin-common-areas.component';

describe('AdminCommonAreasComponent', () => {
  let component: AdminCommonAreasComponent;
  let fixture: ComponentFixture<AdminCommonAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommonAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommonAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
