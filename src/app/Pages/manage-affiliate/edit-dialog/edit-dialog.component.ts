// edit-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      description: new FormControl(data.description),
      date: new FormControl(data.date),
    });
  }

  affiliateForm = new FormGroup({
    affiliateUrl: new FormControl(this.data.affiliateUrl, Validators.required),
    contactEmail: new FormControl(this.data.contactEmail, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(this.data.phoneNumber, Validators.required),
    websiteURL: new FormControl(this.data.websiteURL, Validators.required),
    paymentDetails: new FormControl(this.data.paymentDetails, Validators.required),
    commissionPercentage: new FormControl(this.data.commissionPercentage, Validators.required),
    status: new FormControl(this.data.status),
  });
  
  get formControls() { return this.affiliateForm.controls; }


  save() {
    this.dialogRef.close(this.form.value);
  }
}