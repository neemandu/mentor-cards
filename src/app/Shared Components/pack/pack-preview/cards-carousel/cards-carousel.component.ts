import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-cards-carousel',
  templateUrl: './cards-carousel.component.html',
  styleUrls: ['./cards-carousel.component.css'],
})
export class CardsCarouselComponent implements OnInit, OnDestroy {
  @Input() cards: string[];
  ids: number[] = [0, 1, 2];
  currId: number = 0;
  @ViewChildren('img') images: QueryList<ElementRef>;
  interval: NodeJS.Timeout;

  constructor() {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.scrollTo(undefined, (this.currId + 1) % 3);
    }, 4000);
  }

  scrollTo(event, index): void {
    event?.preventDefault();
    this.images.toArray()[this.currId].nativeElement.className = 'inactive';
    this.currId = index;
    this.images.toArray()[this.currId].nativeElement.className = 'active';
    // document.getElementById('img_' + index).scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
