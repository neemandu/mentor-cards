import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateInvoicesInput, InvoiceItemsInput, UpdateInvoicesInput } from 'src/app/API.service';

@Component({
  selector: 'app-new-edit-receipt-dialog',
  templateUrl: './new-edit-receipt-dialog.component.html',
  styleUrls: ['./new-edit-receipt-dialog.component.css', '../mng-style.css']
})
export class NewEditReceiptDialogComponent implements OnInit {
  receiptForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    customerAddress: ['', [Validators.required]],
    date: ['', [Validators.required]],
    itemName: ['', [Validators.required]],
    pricePerItem: ['', [Validators.required]],
    numberOfItems: ['', [Validators.required]],
    items: [[], []],
    invoiceType: ['', [Validators.required]],
  });

  allItems: InvoiceItemsInput[] = [
    {
      itemName: "מנוי חודשי רגיל",
      pricePerItem: 45,
      numberOfItems: 1
    },
    {
      itemName: "מנוי חצי שנתי רגיל",
      pricePerItem: 150,
      numberOfItems: 1
    },
    {
      itemName: "מנוי שנתי רגיל",
      pricePerItem: 250,
      numberOfItems: 1
    }
  ]

  allTypes: string[] = [
    "קבלה", "חשבונית", "חשבון עסקה"
  ]

  constructor(public dialogRef: MatDialogRef<NewEditReceiptDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const receipt = this.data.receipt;
    if (receipt) {
      this.receiptForm.controls.fullName.setValue(receipt.fullName);
      this.receiptForm.controls.email.setValue(receipt.email);
      this.receiptForm.controls.customerAddress.setValue(receipt.customerAddress);
      this.receiptForm.controls.date.setValue(new Date(receipt.date));
      this.receiptForm.controls.itemName.setValue(receipt.itemName);
      this.receiptForm.controls.pricePerItem.setValue(receipt.pricePerItem);
      this.receiptForm.controls.numberOfItems.setValue(receipt.numberOfItems);
      this.receiptForm.controls.invoiceType.setValue(receipt.invoiceType);
    }
  }

  onSubmit(): void {
    console.log(this.data.coupon)
    const res: CreateInvoicesInput | UpdateInvoicesInput = {
      id: this.data.receipt?.id ? this.data.receipt.id : null,
      email: this.receiptForm.controls.email.value,
      fullName: this.receiptForm.controls.fullName.value,
      customerAddress: this.receiptForm.controls.customerAddress.value,
      date: new Date(this.receiptForm.controls.date.value).toISOString(),
      items: [{
        itemName: this.receiptForm.controls.itemName.value,
        pricePerItem: this.receiptForm.controls.pricePerItem.value,
        numberOfItems: this.receiptForm.controls.numberOfItems.value
      }],
      invoiceType: this.receiptForm.controls.invoiceType.value,
    }
    this.dialogRef.close(res);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
