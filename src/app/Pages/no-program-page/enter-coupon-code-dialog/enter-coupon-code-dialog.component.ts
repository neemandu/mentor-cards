import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-enter-coupon-code-dialog',
  templateUrl: './enter-coupon-code-dialog.component.html',
  styleUrls: ['./enter-coupon-code-dialog.component.css']
})
export class EnterCouponCodeDialogComponent implements OnInit {

  userForm: FormGroup;
  inGroup: boolean = true;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EnterCouponCodeDialogComponent>, private api: APIService,
    private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      couponCode: ['', [Validators.required]],
    });
  }

  get formControls() { return this.userForm.controls; }

  enterGroup(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.api.AddCouponCode({ 'couponCode': this.formControls.couponCode.value }).then(res => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      if (res)
        this.dialogRef.close(true);
      else {
        this.formControls.couponCode.setErrors({ 'noSuchCoupon': true });
      }
    }, reject => {
      // console.log("file: enter-group-id-dialog.component.ts ~ line 33 ~ this.api.IsInGroup ~ reject", reject)
      if ((reject.errors[0].message).toLowerCase().startsWith("no such coupon"))
        this.formControls.couponCode.setErrors({ 'noSuchCoupon': true });
      else if ((reject.errors[0].message).toLowerCase().startsWith("coupon code already in use"))
        this.formControls.couponCode.setErrors({ 'userHasCoupon': true });
      this.overlaySpinnerService.changeOverlaySpinner(false);
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
