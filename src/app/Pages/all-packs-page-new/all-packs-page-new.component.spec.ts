import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPacksPageNewComponent } from './all-packs-page-new.component';

describe('AllPacksPageNewComponent', () => {
  let component: AllPacksPageNewComponent;
  let fixture: ComponentFixture<AllPacksPageNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPacksPageNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPacksPageNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
