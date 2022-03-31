import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodesManagementComponent } from './coupon-codes-management.component';

describe('CouponCodesManagementComponent', () => {
  let component: CouponCodesManagementComponent;
  let fixture: ComponentFixture<CouponCodesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponCodesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCodesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
