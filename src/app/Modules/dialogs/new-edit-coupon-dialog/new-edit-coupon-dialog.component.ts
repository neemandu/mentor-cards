import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-edit-coupon-dialog',
  templateUrl: './new-edit-coupon-dialog.component.html',
  styleUrls: ['./new-edit-coupon-dialog.component.css']
})
export class NewEditCouponDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewEditCouponDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
