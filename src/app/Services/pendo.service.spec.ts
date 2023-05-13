import { TestBed } from '@angular/core/testing';

import { PendoService } from './pendo.service';

describe('PendoService', () => {
  let service: PendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
