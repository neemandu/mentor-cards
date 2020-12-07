import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PackInfo } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';

@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();

  @Input() packInfo: PackInfo;
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();
  fav: boolean = false;
  
  constructor(private cardsService: CardsService) { }
  
  ngOnInit() {
    // console.log("packInfo", this.packInfo)
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: number[]) => {
      this.fav = favorites.includes(this.packInfo.id)
    }));
    this.fav = this.cardsService.isFavorite(this.packInfo.id)
  }

  addRemoveFavorite(): void {
    this.fav = this.cardsService.addRemoveFavorite(this.packInfo.id)
  }

  imgLoaded(): any {
    this.loaded.emit();
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}

// @Component({
//   selector: 'app-pack-back',
//   templateUrl: './pack-back.component.html',
//   styleUrls: ['./pack-back.component.css']
// })
// export class PackBackComponent implements OnInit {


//   @Input() packInfo: PackInfo;

//   constructor() { }

//   ngOnInit() {
//     console.log(this.packInfo)
//   }

// }
