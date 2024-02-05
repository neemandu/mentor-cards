import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-site-rules-dialog',
  templateUrl: './site-rules-dialog.component.html',
  styleUrls: ['./site-rules-dialog.component.css']
})
export class SiteRulesDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SiteRulesDialogComponent> ,  public langDirectionService: LangDirectionService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
