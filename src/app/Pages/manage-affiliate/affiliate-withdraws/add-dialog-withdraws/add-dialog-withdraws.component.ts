// add-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog-withdraws',
  templateUrl: './add-dialog-withdraws.component.html',
})
export class addDialogWithdrawsComponent {
  constructor(
    public dialogRef: MatDialogRef<addDialogWithdrawsComponent>,
  ) {}

  affiliateWithdrawsForm = new FormGroup({
    id: new FormControl(1),
    date: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
    paymentWay: new FormControl('', [Validators.required]),
  });
  
  get formControls() { return this.affiliateWithdrawsForm.controls; }

  save() {
    this.dialogRef.close(this.affiliateWithdrawsForm.value);
  }
}