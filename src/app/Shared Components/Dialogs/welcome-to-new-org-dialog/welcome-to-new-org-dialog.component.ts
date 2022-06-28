import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { About } from 'src/app/API.service';

@Component({
  selector: 'app-welcome-to-new-org-dialog',
  templateUrl: './welcome-to-new-org-dialog.component.html',
  styleUrls: ['./welcome-to-new-org-dialog.component.css']
})
export class WelcomeToNewOrgDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public about: About, public dialogRef: MatDialogRef<WelcomeToNewOrgDialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
