import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { PackContent, PackInfo } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
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
  // allPacksOwned: PackContent[] = [];
  // allPacksNotOwned: PackContent[] = [];
  allCategories: string[] = [];
  allFavorites: string[] = [];
  loadedPacks: number;
  categoriesToShow: number = 5;

  //Filters
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  // selectedTags: string[] = [];

  constructor(private cardsService: CardsService, private overlaySpinnerService: OverlaySpinnerService, private api: APIService,
     private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone,) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  ngOnInit() {
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      // this.overlaySpinnerService.changeOverlaySpinner(true);
      this.getAllPacks();
    }));
    window.addEventListener('resize', () => { this.mobile = window.screen.width <= 600 });
    this.mobile = window.screen.width <= 600;
    this.loadedPacks = 0;
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: string[]) => {
      this.allFavorites = favorites;
      this.filterPacks()
      this.sortPacks();
    }));
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.getAllPacks();
  }

  /**
   * Retrive all packs
   */
  getAllPacks(): void {
    if (this.cardsService.allPacks) {
      this.allPacks = this.cardsService.allPacks.map(pack => pack);
      this.allCategories = this.cardsService.allCategories.map(category => category);
      this.allFavorites = this.cardsService.favorites;
      this.sortPacks();
    } else {
      let authStatus = localStorage.getItem('signedin');
      (authStatus === 'true' ? this.api.ListCardsPacks() : this.api.ListCardsPacksForPreview()).then(packs => {
        // console.log("file: all-packs-page.component.ts ~ line 62 ~ packs", packs)
        this.allPacks = packs.items.map(pack => {
          pack.categories.forEach(category => {
            if (!this.allCategories.includes(category))
              this.allCategories.push(category);
          });
          return new PackContent().deseralize(pack)
        });
        this.cardsService.allPacks = this.allPacks.map(pack => pack);

        // console.log("file: all-packs-page.component.ts ~ line 82 ~ this.allPacks", this.allPacks)
        this.cardsService.allCategories = this.allCategories.map(category => category);
        this.allFavorites = this.cardsService.favorites;
        this.sortPacks();
        // this.allPacksOwned = this.allPacks.filter(pack => pack.cards.length != 0);
        // this.allPacksNotOwned = this.allPacks.filter(pack => pack.cards.length == 0);
        this.overlaySpinnerService.changeOverlaySpinner(false);
      }, reject => {
        // console.log("file: all-packs-page.component.ts ~ line 77 ~ this.api.ListCardsPacks ~ reject", reject)
        this.overlaySpinnerService.changeOverlaySpinner(false);
        let snackBarRef = this.cardsService._snackBar.open('שגיאה במשיכת ערכות הקלפים, נסו שנית', 'רענן', {
          duration: 20000,
        });
        snackBarRef.onAction().subscribe(() => {
          window.location.reload();
        });
      })
    }
  }

  updateUserData(): void {
    this.userAuthService.updateUserData();
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
    // this.cardsService.allPacks = this.allPacks.map(pack => pack);
  }

  /**
   * Return all packs that user ownes
   */
  allOwnedPacks(): PackContent[] {
    return this.allPacks.filter(pack => pack.cards.length != 0);
    // return this.allPacks.filter(pack => pack.cards);
  }

  /**
   * Return all packs that user doesn't own
   */
  allNotOwnedPacks(): PackContent[] {
    return this.allPacks.filter(pack => pack.cards.length == 0);
    // return this.allPacks.filter(pack => !pack.cards);
  }

  get signedIn() {
    return this.userAuthService.userData;
  }

  get hasProgram() {
    return this.userAuthService.userData.subscription;
  }

  get trialMonthExpDate() {
    return this.userAuthService.trialMonthExpDate;
  }

  get codeCouponExpDate() {
    return this.userAuthService.codeCouponExpDate;
  }

  get expDate() {
    return this.userAuthService.expDate;
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
    return this.cardsService.allPacks ? (this.cardsService.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name) : (this.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name);
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
    this.sortPacks();
  }

  freeTextFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackInfo) => {
      let contains: boolean = false;
      if (pack.description.includes(this.freeTextFilterSelected))
        contains = true;
      pack.categories.forEach(category => {
        if (category.includes(this.freeTextFilterSelected))
          contains = true;
      })
      pack.tags.forEach(tag => {
        if (tag.includes(this.freeTextFilterSelected))
          contains = true;
      })
      return contains;
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
      return this.selectedFavorites.includes(pack.name);
    })
  }

  public navigate(path: string): void {
    // console.log(path)
    this.ngZone.run(() => this.router.navigate([path]));
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
