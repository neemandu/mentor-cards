import { TestBed } from '@angular/core/testing';

import { SharedDialogsService } from './shared-dialogs.service';

describe('SharedDialogsService', () => {
  let service: SharedDialogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDialogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
