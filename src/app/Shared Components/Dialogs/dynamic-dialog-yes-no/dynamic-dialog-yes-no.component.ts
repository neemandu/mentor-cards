import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';

@Component({
  selector: 'app-dynamic-dialog-yes-no',
  templateUrl: './dynamic-dialog-yes-no.component.html',
  styleUrls: ['./dynamic-dialog-yes-no.component.css']
})
export class DynamicDialogYesNoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DynamicDialogYesNoComponent>, @Inject(MAT_DIALOG_DATA) public data: DynamicDialogData) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
