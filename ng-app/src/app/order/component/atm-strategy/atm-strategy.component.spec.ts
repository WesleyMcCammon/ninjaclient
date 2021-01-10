import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmStrategyComponent } from './atm-strategy.component';

describe('AtmStrategyComponent', () => {
  let component: AtmStrategyComponent;
  let fixture: ComponentFixture<AtmStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmStrategyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
