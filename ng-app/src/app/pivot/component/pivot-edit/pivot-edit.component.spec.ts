import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PivotEditComponent } from './pivot-edit.component';

describe('PivotEditComponent', () => {
  let component: PivotEditComponent;
  let fixture: ComponentFixture<PivotEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PivotEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PivotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
