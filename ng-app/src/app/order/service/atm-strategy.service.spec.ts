import { TestBed } from '@angular/core/testing';

import { AtmStrategyService } from './atm-strategy.service';

describe('AtmStrategyService', () => {
  let service: AtmStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtmStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
