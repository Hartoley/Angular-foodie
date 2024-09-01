import { TestBed } from '@angular/core/testing';

import { CounterserviceService } from './counterservice.service';

describe('CounterserviceService', () => {
  let service: CounterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
