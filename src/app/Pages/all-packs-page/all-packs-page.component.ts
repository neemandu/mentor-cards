import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { MixpanelService, EventTypes } from 'src/app/Services/mixpanel.service';

interface CategoryPack {
  category: string;
  packs: PackContent[];
}

@Component({
  selector: 'app-all-packs-page',
  templateUrl: './all-packs-page.component.html',
  styleUrls: ['./all-packs-page.component.css'],
})
export class AllPacksPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  Subscription: Subscription = new Subscription();
  // mobile: boolean;

  allPacks: PackContent[] = [];
  allFavPacks: PackContent[] = [];
  allCategoryPacks: CategoryPack[] = [];
  categoriesOrder: string[] = [
    'החמישייה הפותחת',
    'קלפי תמונה',
    'שיתופי פעולה',
    'קלפי שאלות',
    'קלפי חגים',
    'קלפי מילה',
    'קלפי תמונה + מילה',
    'קלפי מסרים',
    'קלפי ערכים',
    'מתנה',
  ];
  userData: UserData;
  allCategories: string[] = [];
  allFavorites: number[] = [];
  loadedPacks: number = 0;
  categoriesToShow: number = 5;

  //Filters
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  showBottomArrow: boolean = true;

  constructor(
    private cardsService: CardsService,
    private overlaySpinnerService: OverlaySpinnerService,
    private api: APIService,
    private userAuthService: UserAuthService,
    public router: Router,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private mixpanelService: MixpanelService

  ) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  ngOnInit() {
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'all-packs-page' });

    this.Subscription.add(
      this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
        userData ? this.getAllPacks() : null;
        this.userData = userData;
        this.allFavorites = this.userAuthService.favorites;
        this.setAllFavPacksToShow();
      })
    );
    this.Subscription.add(
      this.userAuthService.favoritesChangeEmmiter.subscribe(
        (favorites: number[]) => {
          this.allFavorites = favorites;
          this.setAllFavPacksToShow();
        }
      )
    );
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.userData = this.userAuthService.userData;
    this.getAllPacks();
  }

  openEnterCouponCodeModal(): void {
    if (this.userData) {
      this.userAuthService.openEnterCouponCodeModal();
    } else {
      this.userAuthService.showSignInModal();
    }
  }

  /**
   * Retrive all packs
   */
  getAllPacks(): void {
    if (this.cardsService.allPacks) {
      this.setAllPacksData();
      this.setAllCategoryPacksToShow();
      this.setAllFavPacksToShow();
      // this.sortPacks();
    } else {
      let sub = this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        sub.unsubscribe();
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
      });
      this.cardsService.getAllPacks();
    }
  }

  setAllPacksData(): void {
    this.allPacks = this.cardsService.allPacks.map((pack) => pack);
    this.allCategories = this.cardsService.allCategories.map(
      (category) => category
    );
    this.allFavorites = this.userAuthService.favorites;
  }

  setAllCategoryPacksToShow(): void {
    this.allCategoryPacks = this.allCategories
      .filter((category) => {
        return this.selectedCategories.length != 0
          ? this.selectedCategories.includes(category)
          : true;
      })
      .map((category) => {
        let packs = this.allPacks.filter((pack) =>
          pack.categories.includes(category)
        );
        if (packs.length != 0) return { category: category, packs: packs };
      });
  }

  setAllFavPacksToShow(): void {
    this.allFavPacks = this.allPacks.filter((pack) =>
      this.allFavorites.includes(parseInt(pack.id))
    );
  }

  updateUserData(): void {
    this.userAuthService.loggedIn();
  }

  get signedIn() {
    return this.userAuthService.userData;
  }

  get hasProgram() {
    return this.userAuthService.userData.subscription;
  }

  get trialPeriodExpDate() {
    return this.userAuthService.trialPeriodExpDate;
  }

  get codeCouponExpDate() {
    return this.userAuthService.codeCouponExpDate;
  }

  packLoaded(): void {
    this.loadedPacks++;
    if (this.loadedPacks == this.allPacks.length) {
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }
  }

  getAllFavoritesDesc(): string[] {
    if (!this.allFavorites) {
      this.allFavorites = [];
    }
    return this.cardsService.allPacks
      ? this.cardsService.allPacks
          .filter((pack) => this.allFavorites.includes(parseInt(pack.id)))
          .map((pack) => pack.name)
      : this.allPacks
          .filter((pack) => this.allFavorites.includes(parseInt(pack.id)))
          .map((pack) => pack.name);
    // return this.cardsService.allPacks ? (this.cardsService.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name) : (this.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name);
  }

  categoriesSelectedChange(event): void {
    var index = this.selectedCategories.findIndex(
      (el) => el === event.option._value
    );
    index == -1
      ? this.selectedCategories.push(event.option._value)
      : this.selectedCategories.splice(index, 1);
  }

  favoritesSelectedChange(event): void {
    var index = this.selectedFavorites.findIndex(
      (el) => el === event.option._value
    );
    index == -1
      ? this.selectedFavorites.push(event.option._value)
      : this.selectedFavorites.splice(index, 1);
  }

  filterPacks(): void {
    this.loadedPacks = 0;
    this.allPacks = this.cardsService.allPacks?.map((pack) => pack);
    if (this.allPacks) {
      if (this.freeTextFilterSelected !== '') {
        this.freeTextFilter();
      }
      if (this.selectedCategories.length != 0) {
        this.categoryFilter();
      }
      if (this.selectedFavorites.length != 0) {
        this.favoritesFilter();
      }
      // this.sortPacks();
    }
    this.setAllCategoryPacksToShow();
    this.setAllFavPacksToShow();
  }

  freeTextFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackContent) => {
      // let contains: boolean = false;
      if (pack.description.includes(this.freeTextFilterSelected)) return true;
      pack.categories.forEach((category) => {
        if (category.includes(this.freeTextFilterSelected)) return true;
      });
      pack.tags.forEach((tag) => {
        if (tag.includes(this.freeTextFilterSelected)) return true;
      });
      if (pack.name.includes(this.freeTextFilterSelected)) {
        return true;
      }
      // return contains;
      return false;
    });
  }

  categoryFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackContent) => {
      let res = false;
      pack.categories.forEach((category) => {
        if (this.selectedCategories.includes(category)) {
          res = true;
        }
      });
      return res;
    });
  }

  favoritesFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackContent) =>
      this.selectedFavorites.includes(pack.name)
    );
  }

  public navigate(path: string): void {
    // console.log(path)
    this.ngZone.run(() => this.router.navigate([path]));
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
