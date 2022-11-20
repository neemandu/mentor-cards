import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.css']
})
export class CardsCarouselComponent implements OnInit {

  @Input() cards: string[];
  ids: number[] = [0, 1, 2];
  currId: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => { 
      this.currId = (this.currId + 1) % 3 
      document.getElementById('img_' + this.currId).scrollIntoView(); 
    }, 4000)
  }

  scrollTo(event, index): void {
    event.preventDefault();
    document.getElementById('img_' + index).scrollIntoView(); 
    this.currId = index;
  }

}
