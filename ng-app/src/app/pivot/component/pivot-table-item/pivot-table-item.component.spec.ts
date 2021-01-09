import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotTableItemComponent } from './pivot-table-item.component';

describe('PivotTableItemComponent', () => {
  let component: PivotTableItemComponent;
  let fixture: ComponentFixture<PivotTableItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotTableItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
