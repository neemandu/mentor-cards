import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateDialogComponent } from './affiliate-dialog.component';

describe('AffiliateDialogComponent', () => {
  let component: AffiliateDialogComponent;
  let fixture: ComponentFixture<AffiliateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffiliateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
