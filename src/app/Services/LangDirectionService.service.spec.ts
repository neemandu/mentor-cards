import { TestBed } from '@angular/core/testing';
import { LangDirectionService } from './LangDirectionService.service';


describe('CardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangDirectionService = TestBed.get(LangDirectionService);
    expect(service).toBeTruthy();
  });
});
