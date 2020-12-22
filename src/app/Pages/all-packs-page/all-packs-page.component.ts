import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { PackContent, PackInfo } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-all-packs-page',
  templateUrl: './all-packs-page.component.html',
  styleUrls: ['./all-packs-page.component.css']
})
export class AllPacksPageComponent implements OnInit {
  Subscription: Subscription = new Subscription();
  mobile: boolean;

  allPacks: PackContent[] = [];
  allCategories: string[] = [];
  allFavorites: string[] = [];
  loadedPacks: number;
  categoriesToShow: number = 5;

  //Filters
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  // selectedTags: string[] = [];

  constructor(private cardsService: CardsService, private overlaySpinnerService: OverlaySpinnerService, private api: APIService) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  ngOnInit() {
    window.addEventListener('resize', () => { this.mobile = window.screen.width <= 600 });
    this.mobile = window.screen.width <= 600;
    this.loadedPacks = 0;
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: string[]) => {
      this.allFavorites = favorites
    }));
    if (!this.cardsService.allPacks) {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      try {
        this.api.ListCardsPacks().then(packs => {
          // console.log("file: all-packs-page.component.ts ~ line 45 ~ this.api.ListCardsPacks ~ packs", packs)
          this.allPacks = packs.items.map(pack => {
            pack.categories.forEach(category => {
              if (!this.allCategories.includes(category))
                this.allCategories.push(category);
            });
            return new PackContent().deseralize(pack)
          });
          this.sortPacks();
          this.cardsService.allPacks = this.allPacks.map(pack => pack);
          // console.log("file: all-packs-page.component.ts ~ line 54 ~ this.api.ListCardsPacks ~ this.cardsService.allPacks", this.cardsService.allPacks)
          this.cardsService.allCategories = this.allCategories.map(category => category);
          this.allFavorites = this.cardsService.favorites;
          this.allPacks.length == 0 ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
        })
      }
      catch (e) {
        // console.log("file: all-packs-page.component.ts ~ line 65 ~ ngOnInit ~ e", e)
        this.overlaySpinnerService.changeOverlaySpinner(false);
        let snackBarRef = this.cardsService._snackBar.open('שגיאה במשיכת חפיסות הקלפים, נסו שנית', 'רענן', {
          duration: 20000,
        });
        snackBarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      };
    } else {
      this.allPacks = this.cardsService.allPacks;
      this.allCategories = this.cardsService.allCategories;
      this.allFavorites = this.cardsService.favorites
      this.allPacks.length == 0 ? this.overlaySpinnerService.changeOverlaySpinner(false) : null;
    }
  }

  /**
   * Sort all packs so that favorites are first 
   */
  sortPacks(): void {
    this.allPacks.sort((packA, packB) => {
      if (this.allFavorites.includes(packA.id) && this.allFavorites.includes(packB.id))
        return 0;
      if (this.allFavorites.includes(packA.id))
        return -1;
      else
        return 1;
    })
  }

  /**
   * Return all packs that user ownes
   */
  allOwnedPacks(): PackContent[] {
    return this.allPacks.filter(pack => pack.cards.length != 0);
  }

  /**
   * Return all packs that user doesn't own
   */
  allNotOwnedPacks(): PackContent[] {
    return this.allPacks.filter(pack => pack.cards.length == 0);
  }

  /**
   * Show more or less categories
   */
  categoriesToShowChange(): void {
    if (this.categoriesToShow < this.allCategories.length) {
      this.categoriesToShow = this.allCategories.length;
    } else {
      this.categoriesToShow = 5;
    }
  }

  packLoaded(): void {
    this.loadedPacks++;
    if (this.loadedPacks == this.allPacks.length) {
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }
  }

  getAllFavoritesDesc(): string[] {
    return this.cardsService.allPacks ? (this.cardsService.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.description) : (this.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.description);
  }

  categoriesSelectedChange(event): void {
    var index = this.selectedCategories.findIndex(el => el === event.option._value)
    index == -1 ? this.selectedCategories.push(event.option._value) : this.selectedCategories.splice(index, 1);
  }

  favoritesSelectedChange(event): void {
    var index = this.selectedFavorites.findIndex(el => el === event.option._value)
    index == -1 ? this.selectedFavorites.push(event.option._value) : this.selectedFavorites.splice(index, 1);
  }

  filterPacks(): void {
    this.loadedPacks = 0;
    this.allPacks = this.cardsService.allPacks.map(pack => pack);
    if (this.freeTextFilterSelected !== '') {
      this.freeTextFilter();
    }
    if (this.selectedCategories.length != 0) {
      this.categoryFilter();
    }
    if (this.selectedFavorites.length != 0) {
      this.favoritesFilter()
    }
  }

  freeTextFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackInfo) => {
      if (pack.description.includes(this.freeTextFilterSelected))
        return true;
      pack.categories.forEach(category => {
        if (category.includes(this.freeTextFilterSelected))
          return true;
      })
      pack.tags.forEach(tag => {
        if (tag.includes(this.freeTextFilterSelected))
          return true;
      })
      return false;
    })
  }

  categoryFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackInfo) => {
      let res = false;
      pack.categories.forEach(category => {
        if (this.selectedCategories.includes(category)) {
          res = true;
        }
      })
      return res;
    })
  }

  favoritesFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackInfo) => {
      return this.selectedFavorites.includes(pack.description);
    })
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
