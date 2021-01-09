import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotViewComponent } from './pivot-view.component';

describe('PivotViewComponent', () => {
  let component: PivotViewComponent;
  let fixture: ComponentFixture<PivotViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
