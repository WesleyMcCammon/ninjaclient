import { TestBed } from '@angular/core/testing';

import { AutoTradeSettingsService } from './auto-trade-settings.service';

describe('AutoTradeSettingsService', () => {
  let service: AutoTradeSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoTradeSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
