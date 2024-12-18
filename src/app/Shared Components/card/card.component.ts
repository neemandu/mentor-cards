import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Card, cardsImages } from 'src/app/Objects/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() cardContent: cardsImages;
  @Input() selected: boolean = false;
  @Input() mobileView: boolean = false;
  @Input() index: number;
  @Input() flipped: boolean = true;
  @Output() cardSelectedEmmiter: EventEmitter<any> = new EventEmitter();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  @Input() imageWidth: number = 160;
  @Input() imageHeight: number = 219;
  @Input() flipBoxInnerInCat: boolean = false;
  @Input() flippedCardwidth: number;

  isMobileScreen : boolean;
  constructor() {}

  newHeight: number = 300;
  originalDimensions: { width: number; height: number } = {
    width: 0,
    height: 0,
  };

  ngOnInit() {
    // console.log('_______',this.cardContent);
    this.calculateNewDimensions();
  }

  calculateNewDimensions() {
    if (
      this.cardContent &&
      this.cardContent.frontImgUrl &&
      !this.flipBoxInnerInCat
    ) {
      const img = new Image();
      img.src = this.cardContent.frontImgUrl;
      img.onload = () => {

        if ( this.isMobileScreen ) {
          console.log( 'Inside the mobile' );
          this.originalDimensions.width = img.width;
          this.originalDimensions.height = img.height;
  
          const aspectRatio =
            this.originalDimensions.width / this.originalDimensions.height;
          const newWidth = this.newHeight * aspectRatio
          // You can adjust or use the newWidth and newHeight as needed
          this.cardContent.frontNewDimensions = {
            width: 160,
            height: 219,
          };
        } else { 
        this.originalDimensions.width = img.width;
        this.originalDimensions.height = img.height;

        const aspectRatio =
          this.originalDimensions.width / this.originalDimensions.height;
        const newWidth = this.newHeight * aspectRatio;
        // You can adjust or use the newWidth and newHeight as needed
        this.cardContent.frontNewDimensions = {
          width: newWidth,
          height: this.newHeight,
        };
      }
      };
      console.log('height', this.cardContent.frontNewDimensions);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobileScreen = window.innerWidth < 640; // Example breakpoint for mobile screens
    this.calculateNewDimensions();
  }

  onRightClick(): boolean {
    return false;
  }
}
