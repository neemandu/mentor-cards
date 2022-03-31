import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditCouponDialogComponent } from './new-edit-coupon-dialog.component';

describe('NewEditCouponDialogComponent', () => {
  let component: NewEditCouponDialogComponent;
  let fixture: ComponentFixture<NewEditCouponDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditCouponDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditCouponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
