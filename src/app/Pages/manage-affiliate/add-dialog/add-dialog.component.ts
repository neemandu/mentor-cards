// add-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
})
export class addDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<addDialogComponent>,
  ) {}

  affiliateForm = new FormGroup({
    affiliateUrl: new FormControl('', Validators.required),
    contactEmail: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', Validators.required),
    websiteURL: new FormControl('', Validators.required),
    paymentDetails: new FormControl('', Validators.required),
    commissionPercentage: new FormControl('', Validators.required),
    status: new FormControl(false), // Changed this line
  });
  
  get formControls() { return this.affiliateForm.controls; }

  save() {
    this.dialogRef.close(this.affiliateForm.value);
  }
}