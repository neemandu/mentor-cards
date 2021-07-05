import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCouponCodeDialogComponent } from './enter-coupon-code-dialog.component';

describe('EnterCouponCodeDialogComponent', () => {
  let component: EnterCouponCodeDialogComponent;
  let fixture: ComponentFixture<EnterCouponCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterCouponCodeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterCouponCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
