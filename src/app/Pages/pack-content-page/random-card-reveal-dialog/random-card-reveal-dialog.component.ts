import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/Objects/card';

@Component({
  selector: 'app-random-card-reveal-dialog',
  templateUrl: './random-card-reveal-dialog.component.html',
  styleUrls: ['./random-card-reveal-dialog.component.css']
})
export class RandomCardRevealDialogComponent implements OnInit {

  selectedCard: Card;
  index: number = 0;
  cardLoaded: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<RandomCardRevealDialogComponent>) { 
  }

  ngOnInit(): void {
    this.selectedCard = this.data[this.index];
  }

  nextCard(): void {
    if (this.index < this.data.length){
      this.selectedCard = this.data[++this.index];
      this.cardLoaded = false;
    }
  }

  prevCard(): void {
    if (this.index > 0){
      this.selectedCard = this.data[--this.index];
      this.cardLoaded = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
