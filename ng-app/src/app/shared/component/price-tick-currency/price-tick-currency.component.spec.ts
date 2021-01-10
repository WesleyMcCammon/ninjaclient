import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTickCurrencyComponent } from './price-tick-currency.component';

describe('PriceTickCurrencyComponent', () => {
  let component: PriceTickCurrencyComponent;
  let fixture: ComponentFixture<PriceTickCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceTickCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceTickCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
