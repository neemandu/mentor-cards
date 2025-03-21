import {
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { MixpanelService, EventTypes } from 'src/app/Services/mixpanel.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { UserLoginDialogComponent } from './user-login-dialog/user-login-dialog.component';
import { bool } from 'aws-sdk/clients/signer';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  @ViewChild('filterText') filterTextInput: ElementRef;
  @ViewChildren('autocompleteOptions')
  autocompleteOptions: QueryList<MatOption>;

  Subscription: Subscription = new Subscription();
  filteredOptions = [];
  allOptions = [];
  // mobile: boolean;

  allPacks: PackContent[] = [];
  allFavPacks: PackContent[] = [];
  allCategoryPacks: CategoryPack[] = [];
  categoriesOrder: string[] = [
    'ערכות להתנסות חופשית',
    'קלפי תמונה',
    'שיתופי פעולה',
    'קלפי שאלות',
    'קלפי חגים',
    'קלפי מילה',
    'קלפי תמונה + מילה',
    'קלפי מסרים',
    'קלפי ערכים',
    'הייטק',
    'מתנה',
  ];
  userData: UserData;
  allCategories: string[] = [];
  allFavorites: number[] = [];
  loadedPacks: number = 0;
  categoriesToShow: number = 5;
  isPageLoaded: boolean = false;

  //Filters
  showCategoryLine: boolean = true;
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  showBottomArrow: boolean = true;
  stopGenerateOptions: boolean = true;
  currentFocusIndex: number = -1; // -1 indicates that no option is currently focused

  constructor(
    private cardsService: CardsService,
    private overlaySpinnerService: OverlaySpinnerService,
    private api: APIService,
    private userAuthService: UserAuthService,
    public router: ActivatedRoute,
    public routNavigate: Router,
    private ngZone: NgZone,
    public dialog: MatDialog,
    private mixpanelService: MixpanelService,
    public langDirectionService: LangDirectionService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  openNewTab(): void {
    const url = 'https://mentor-cards.vp4.me/my-courses';
    window.open(url, '_blank');
  }

  initializeFilteredOptions() {
    // Extract names
    const allTags = this.allPacks.reduce((acc, pack) => {
      return acc.concat(pack.tags);
    }, []);

    // Remove duplicates
    this.allOptions = Array.from(new Set(allTags));
  }

  handleKeyDown(event: KeyboardEvent) {
    this.stopGenerateOptions = false;
    if (this.freeTextFilterSelected === '') {
      this.showCategoryLine = true;
    }
    if (event.key === 'Escape') {
      this.clickOutside(event);
    } else if (event.key === 'Enter') {
      let option = this.filteredOptions[this.currentFocusIndex];
      if (!option) {
        option = this.freeTextFilterSelected;
      }
      this.selectOption(option);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.changeFocus(1); // Move focus down
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.changeFocus(-1); // Move focus up
    }
  }

  changeFocus(direction: number) {
    this.currentFocusIndex += direction;
    // Loop back to the start or end if necessary
    if (this.currentFocusIndex >= this.filteredOptions.length) {
      this.currentFocusIndex = 0;
    } else if (this.currentFocusIndex < 0) {
      this.currentFocusIndex = this.filteredOptions.length - 1;
    }

    const optionsArray = this.autocompleteOptions.toArray();
    const optionToFocus = optionsArray[this.currentFocusIndex];
    if (optionToFocus) {
      optionToFocus.focus();
    }
  }

  ngAfterViewInit() {
    this.router.queryParams.subscribe((params) => {
      let filter = params['filter'];
      if (filter) {
        // console.log('filter:..............', filter);
        this.selectOption(filter);
        // Rest of your code
      }
    });
  }
  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      const refId = params['ref'];

      if (refId) {
        localStorage.setItem('refId', refId);
        // console.log('refId ID stored:', refId);
      }
    });

    // track events
    this.mixpanelService.track('PageViewed', {
      'Page Title': 'all-packs-page',
    });

    if (this.userAuthService.isLoggedIn) {
      this.userData = this.userAuthService.userData;
      this.allFavorites = this.userAuthService.favorites;
      this.setAllFavPacksToShow();
      this.getAllPacks(true);
    }
    else {
      this.getAllPacks(true);
      this.Subscription.add(
        this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
          this.getAllPacks(false);
          this.userData = userData;
          this.allFavorites = this.userAuthService.favorites;
          this.setAllFavPacksToShow();
        })
      );
    }

    this.Subscription.add(
      this.userAuthService.favoritesChangeEmmiter.subscribe(
        (favorites: number[]) => {
          this.allFavorites = favorites;
          this.setAllFavPacksToShow();
        }
      )
    );
    // console.log('allpacks page sub 2');
    // console.log(localStorage.getItem('isTrialPacksDialogOpen'), 'isTrialPacksDialogOpen href');
    if (!this.userData || this.userData.status === 'NOPLAN') {
      if (localStorage.getItem('isTrialPacksDialogOpen') === 'false') {
        localStorage.setItem('isTrialPacksDialogOpen', 'true');
        // console.log(localStorage.getItem('isTrialPacksDialogOpen'), 'after set isTrialPacksDialogOpen href');
        this.openDialog();
      }
    }
    //this.getAllPacks();
  }

  filterOptions() {
    const filterValue = this.freeTextFilterSelected.toLowerCase();

    if (filterValue) {
      this.filteredOptions = this.allOptions.filter((tag) =>
        tag.toLowerCase().includes(filterValue)
      );
    } else {
      this.getAllPacks(true);
    }
  }

  openEnterCouponCodeModal(): void {
    this.mixpanelService.track('ButtonClicked', { Name: 'Enter Coupon code' });
    if (this.userData) {
      this.userAuthService.openEnterCouponCodeModal();
    } else {
      this.userAuthService.showSignInModal();
    }
  }

  /**
   * Retrive all packs
   */
  getAllPacks(useCache: bool): void {
    // console.log('useCache: ' + useCache);
    if (useCache) {
      if (this.cardsService.allPacks) {
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
        this.initializeFilteredOptions();
        this.overlaySpinnerService.changeOverlaySpinner(false);
        // this.sortPacks();
      } else {
        this.cardsService.allPacksReadyEmmiter.subscribe(() => {
          this.setAllPacksData();
          this.setAllCategoryPacksToShow();
          this.setAllFavPacksToShow();
          this.initializeFilteredOptions();
          this.overlaySpinnerService.changeOverlaySpinner(false);
        });
        this.cardsService.getAllPacks();
      }
    }
    else {
      this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        // console.log('getAllPacks finished!');
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
        this.initializeFilteredOptions();
        this.overlaySpinnerService.changeOverlaySpinner(false);
      });
      // console.log('cardsService.getAllPacks');
      this.cardsService.getAllPacks();
    }

  }

  setAllPacksData(): void {
    this.allPacks = this.cardsService.allPacks.map((pack) => pack);
    this.allCategories = this.cardsService.allCategories.map(
      (category) => category
    );
    this.allFavorites = this.userAuthService.favorites;

    this.isPageLoaded = true;
  }

  setAllCategoryPacksToShow(): void {
    this.allCategoryPacks = this.allCategories
      .filter((category) => {
        if (
          this.userData?.status === 'PLAN' &&
          category === 'ערכות להתנסות חופשית'
        ) {
          return false;
        }
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

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInsideAutocomplete =
      this.filterTextInput.nativeElement.contains(event.target);
    if (!clickedInsideAutocomplete) {
      this.filteredOptions = [];
      this.currentFocusIndex = -1;
    }
  }

  setAllFavPacksToShow(): void {
    this.allFavPacks = this.allPacks.filter((pack) =>
      this.allFavorites?.includes(parseInt(pack.id))
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
      //this.overlaySpinnerService.changeOverlaySpinner(false);
    }
  }

  getAllFavoritesDesc(): string[] {
    if (!this.allFavorites) {
      this.allFavorites = [];
    }
    return this.cardsService.allPacks
      ? this.cardsService.allPacks
        .filter((pack) => this.allFavorites?.includes(parseInt(pack.id)))
        .map((pack) => pack.name)
      : this.allPacks
        .filter((pack) => this.allFavorites?.includes(parseInt(pack.id)))
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
    const filterValue = this.freeTextFilterSelected.toLowerCase();
    this.allPacks = this.allPacks.filter((packContent) =>
      packContent.tags.some((tag) => tag.toLowerCase() === filterValue)
    );
  }

  selectOption(option: string) {
    this.currentFocusIndex = -1;
    this.showCategoryLine = false;
    this.freeTextFilterSelected = option;
    this.stopGenerateOptions = true;
    this.filteredOptions = [];
    this.filterPacks();
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
    this.ngZone.run(() => this.routNavigate.navigate([path]));
  }

  openDialog(): void {
    let dialogWidth = '40vw'; // default width

    // Check if the screen size is small (mobile)
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      dialogWidth = '80vw'; // width for mobile screens
    }

    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      width: dialogWidth,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
