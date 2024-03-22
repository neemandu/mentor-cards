import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog-withdraws',
  templateUrl: './edit-dialog-withdraws.component.html',
  styleUrls: ['./edit-dialog-withdraws.component.css']
})
export class EditDialogWithdrawsComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogWithdrawsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  affiliateWithdrawsForm = new FormGroup({
    id: new FormControl(this.data.id),
    date: new FormControl(this.data.date, [Validators.required]),
    amount: new FormControl(this.data.amount, [Validators.required]),
    currency: new FormControl( this.data.currency , [Validators.required]),
    paymentWay: new FormControl(this.data.paymentWay, [Validators.required]),
  });
  
  get formControls() { return this.affiliateWithdrawsForm.controls; }

  save() {
    this.dialogRef.close(this.affiliateWithdrawsForm.value);
  }
}