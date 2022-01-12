import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { APIService, ListCardsPacksQuery } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { EnterCouponCodeDialogComponent } from 'src/app/Pages/no-program-page/enter-coupon-code-dialog/enter-coupon-code-dialog.component';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';

interface CategoryPack {
  category: string,
  packs: PackContent[]
}

@Component({
  selector: 'app-all-packs-page',
  templateUrl: './all-packs-page.component.html',
  styleUrls: ['./all-packs-page.component.css']
})
export class AllPacksPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  Subscription: Subscription = new Subscription();
  // mobile: boolean;

  allPacks: PackContent[] = [];
  allFavPacks: PackContent[] = [];
  allCategoryPacks: CategoryPack[] = [];
  userData: UserData;
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
  showBottomArrow: boolean = true;
  // selectedTags: string[] = [];

  constructor(private cardsService: CardsService, private overlaySpinnerService: OverlaySpinnerService, private api: APIService,
    private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone, public dialog: MatDialog) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  ngOnInit() {
    // this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
    //   // this.overlaySpinnerService.changeOverlaySpinner(true);
    //   this.getAllPacks();
    // }));
    this.Subscription.add(this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      // this.overlaySpinnerService.changeOverlaySpinner(true);
      this.userData = userData;
      userData ? this.getAllPacks() : null;
    }));
    // window.addEventListener('resize', () => { this.mobile = window.screen.width <= 600 });
    // this.mobile = window.screen.width <= 600;
    this.loadedPacks = 0;
    this.Subscription.add(this.cardsService.favoriteChangeEmmiter.subscribe((favorites: string[]) => {
      this.allFavorites = favorites;
      // this.favoritesFilter();
      this.setAllFavPacksToShow();
      // this.filterPacks();
      // this.sortPacks();
    }));
    // document.onscroll = () => {
    //   if (document.documentElement.scrollTop < document.documentElement.offsetHeight) {
    //     console.log("show")
    //     this.showBottomArrow = true;
    //   } else {
    //     console.log("no show")
    //     this.showBottomArrow = false;
    //   }
    // }

    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.userData = this.userAuthService.userData;
    this.getAllPacks();
  }

  openEnterCouponCodeModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    const dialogRef1 = this.dialog.open(EnterCouponCodeDialogComponent, dialogConfig);
    const dialogSub1 = dialogRef1.afterClosed().subscribe(res => {
      dialogSub1.unsubscribe();
      if (res) {
        // this.videoplayer.nativeElement.play();
        dialogConfig.data = new DynamicDialogData("קוד הטבה הוזן בהצלחה", [], "אישור", "")
        const dialogRef2 = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
        const dialogSub2 = dialogRef2.afterClosed().subscribe(res => {
          dialogSub2.unsubscribe();
          this.router.navigate(['all-packs-page']);
          window.location.reload();
        })
      }
    });
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
      })
      this.cardsService.getAllPacks();
      // let authStatus = localStorage.getItem('signedin');
      // (authStatus === 'true' ? this.api.ListCardsPacks() : this.api.ListCardsPacksForPreview()).then((packs: ListCardsPacksQuery) => {
      //   // console.log("file: all-packs-page.component.ts ~ line 68 ~ packs", packs)
      //   this.cardsService.setAllPacks(packs)
      //   this.allPacks = packs.items.map(pack => {
      //     pack.categories.forEach(category => {
      //       if (!this.allCategories.includes(category))
      //         this.allCategories.push(category);
      //     });
      //     return new PackContent().deseralize(pack)
      //   });
      //   // console.log("file: all-packs-page.component.ts ~ line 75 ~ packs", packs)
      //   this.cardsService.allPacks = this.allPacks.map(pack => pack);
      //   this.cardsService.allCategories = this.allCategories.map(category => category);
      //   this.allFavorites = this.cardsService.favorites;
      //   // console.log("file: all-packs-page.component.ts ~ line 83 ~ this.allPacks", this.allPacks)
      //   this.sortPacks();
      //   this.overlaySpinnerService.changeOverlaySpinner(false);
      // }, reject => {
      //   this.overlaySpinnerService.changeOverlaySpinner(false);
      //   let snackBarRef = this.cardsService._snackBar.open('שגיאה במשיכת ערכות הקלפים, נסו שנית', 'רענן', {
      //     duration: 20000,
      //   });
      //   snackBarRef.onAction().subscribe(() => {
      //     window.location.reload();
      //   });
      // })
    }
  }

  setAllPacksData(): void {
    this.allPacks = this.cardsService.allPacks.map(pack => pack);
    this.allCategories = this.cardsService.allCategories.map(category => category);
    this.allFavorites = this.cardsService.favorites;
  }

  setAllCategoryPacksToShow(): void {
    this.allCategoryPacks = this.allCategories.filter(category => {
      return this.selectedCategories.length != 0 ? this.selectedCategories.includes(category) : true
    }).map(category => {
      let packs = this.allPacks.filter(pack => pack.categories.includes(category));
      if (packs.length != 0)
        return { category: category, packs: packs }
    })
    // console.log(this.allCategoryPacks)
  }

  setAllFavPacksToShow(): void {
    this.allFavPacks = this.allPacks.filter(pack => this.allFavorites.includes(pack.id));
  }

  updateUserData(): void {
    this.userAuthService.loggedIn();
  }

  // allPacksUnderCategory(category: string): PackContent[] {
  //   return this.allPacks.filter(pack => pack.categories.includes(category));
  // }

  // allFavoritePacks(): PackContent[] {
  //   return this.allPacks.filter(pack => this.allFavorites.includes(pack.id));
  // }

  /**
   * Sort all packs so that favorites are first 
   */
  // sortPacks(): void {
  //   this.allPacks?.sort((packA, packB) => {
  //     //free packs
  //     if (packA.freeUntilDate > new Date())
  //       return -1;
  //     if (packB.freeUntilDate > new Date())
  //       return 1;
  //     //favorites
  //     if (this.allFavorites.includes(packA.id) && this.allFavorites.includes(packB.id))
  //       return 0;
  //     if (this.allFavorites.includes(packA.id))
  //       return -1;
  //     if (this.allFavorites.includes(packB.id))
  //       return 1;
  //     else
  //       return packA.categories[0].localeCompare(packB.categories[0]);
  //   })
  // }

  /**
   * Return all packs that user ownes
   */
  // allOwnedPacks(): PackContent[] {
  //   return this.allPacks ? this.allPacks.filter(pack => pack.cards.length != 0) : [];
  //   // return this.allPacks.filter(pack => pack.cards);
  // }

  /**
   * Return all packs that user doesn't own
   */
  // allNotOwnedPacks(): PackContent[] {
  //   return this.allPacks ? this.allPacks.filter(pack => pack.cards.length == 0) : [];
  //   // return this.allPacks.filter(pack => !pack.cards);
  // }

  getCategoryColor(category): string {
    return this.cardsService.getCategoryColor(category);
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

  // get expDate() {
  //   return this.userAuthService.expDate;
  // }

  /**
   * Show more or less categories
   */
  // categoriesToShowChange(): void {
  //   if (this.categoriesToShow < this.allCategories.length) {
  //     this.categoriesToShow = this.allCategories.length;
  //   } else {
  //     this.categoriesToShow = 5;
  //   }
  // }

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
    this.allPacks = this.cardsService.allPacks?.map(pack => pack);
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
      if (pack.name.includes(this.freeTextFilterSelected)) {
        return true;
      }
      // return contains;
      return false;
    })
  }

  categoryFilter(): void {
    this.allPacks = this.allPacks.filter((pack: PackContent) => {
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
    this.allPacks = this.allPacks.filter((pack: PackContent) => this.selectedFavorites.includes(pack.name))
  }

  public navigate(path: string): void {
    // console.log(path)
    this.ngZone.run(() => this.router.navigate([path]));
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
