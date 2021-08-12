import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PackInfo } from 'src/app/Objects/packs';

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.css']
})
export class AboutAuthorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public packInfo: PackInfo, public dialogRef: MatDialogRef<AboutAuthorComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
