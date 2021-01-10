import { TestBed } from '@angular/core/testing';

import { FuturesValueService } from './futures-value.service';

describe('FuturesValueService', () => {
  let service: FuturesValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuturesValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
