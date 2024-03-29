import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCouponCodesInput, UpdateCouponCodesInput } from 'src/app/API.service';

@Component({
  selector: 'app-new-edit-coupon-dialog',
  templateUrl: './new-edit-coupon-dialog.component.html',
  styleUrls: ['./new-edit-coupon-dialog.component.css', '../mng-style.css']
})
export class NewEditCouponDialogComponent implements OnInit {

  couponForm: FormGroup = this.formBuilder.group({
    days: [0, [Validators.required, Validators.min(0)]],
    code: ['', [Validators.required]],
    discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  selectedPacks: any[];
  selectedOrg: any;


  constructor(public dialogRef: MatDialogRef<NewEditCouponDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const coupon = this.data.coupon;
    if (coupon) {
      this.couponForm.controls.days.setValue(coupon.trialPeriodInDays);
      this.couponForm.controls.code.setValue(coupon.couponCode);
      this.couponForm.controls.discount.setValue(coupon.discount);
      this.selectedPacks = this.data.allPacks.filter(pack => coupon.allowedCardsPacks.includes(pack.id));
      this.selectedOrg = coupon.organization;
    }
  }

  onSubmit(): void {
    if (this.dupCouponError()) {
      this.couponForm.controls.code.setErrors({ 'DupCouponName': true });
      return;
    } 
    const res: CreateCouponCodesInput | UpdateCouponCodesInput = {
      id: this.data.coupon?.id ? this.data.coupon.id : null,
      couponCode: this.couponForm.controls.code.value,
      discount: this.couponForm.controls.discount.value,
      trialPeriodInDays: this.couponForm.controls.days.value,
      allowedCardsPacks: this.selectedPacks?.map(pack => pack.id),
      couponCodesOrganizationId: this.selectedOrg?.membership.id,
    }
    this.dialogRef.close(res);
  }

  dupCouponError(): boolean {
    const sameNameCoupon = this.data.allCoupons.filter(coupon => coupon.couponCode === this.couponForm.controls.code.value)
    return sameNameCoupon.length != 0;
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
