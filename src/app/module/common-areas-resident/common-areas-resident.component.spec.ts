import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAreasResidentComponent } from './common-areas-resident.component';

describe('CommonAreasResidentComponent', () => {
  let component: CommonAreasResidentComponent;
  let fixture: ComponentFixture<CommonAreasResidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonAreasResidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAreasResidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
