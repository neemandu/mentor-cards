import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css'],
})
export class confirmationDialogueComponent {
  // @Input() isOpen: boolean = false;
  // @Output() closeDialog = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<confirmationDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { redirect: () => void } // Define the shape of the data

  ) {}

  onClose(): void {
    this.dialogRef.close(); 
  }

 
  onRedirect(): void {
    if (this.data?.redirect) {
      this.data.redirect(); // Call the redirect method
    }
    this.dialogRef.close(); // Optionally close the dialog after redirection
  }
}
