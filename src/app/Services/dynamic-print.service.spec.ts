import { TestBed } from '@angular/core/testing';

import { DynamicPrintService } from './dynamic-print.service';

describe('DynamicPrintService', () => {
  let service: DynamicPrintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicPrintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
