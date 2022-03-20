import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-edit-coupon-dialog',
  templateUrl: './new-edit-coupon-dialog.component.html',
  styleUrls: ['./new-edit-coupon-dialog.component.css', '../mng-style.css']
})
export class NewEditCouponDialogComponent implements OnInit {

  couponForm: FormGroup = this.formBuilder.group({
    days: ['', [Validators.required, Validators.min(0)]],
    code: ['', [Validators.required]],
    discount: ['', [Validators.required]],
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
    console.log(this.data.coupon)
    const res = {
      ...this.data.coupon, allowedCardsPacks: this.selectedPacks.map(pack => pack.id),
      couponCode: this.couponForm.controls.code.value, discount: this.couponForm.controls.discount.value,
      trialPeriodInDays: this.couponForm.controls.days.value, organization: this.selectedOrg
    }
    res.__typename ? delete res.__typename : null;
    this.dialogRef.close(res);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
