import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardComponent } from 'src/app/Shared Components/card/card.component';

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PackPreviewComponent>) { }

  ngOnInit(): void {
  }

}
