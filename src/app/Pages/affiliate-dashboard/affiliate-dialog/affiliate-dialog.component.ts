import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../affiliate-dashboard.component';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-affiliate-dialog',
  templateUrl: './affiliate-dialog.component.html',
  styleUrls: ['./affiliate-dialog.component.css']
})
export class AffiliateDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AffiliateDialogComponent>,
    public langDirectionService: LangDirectionService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
