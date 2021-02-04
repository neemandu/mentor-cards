import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-site-rules-dialog',
  templateUrl: './site-rules-dialog.component.html',
  styleUrls: ['./site-rules-dialog.component.css']
})
export class SiteRulesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SiteRulesDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
