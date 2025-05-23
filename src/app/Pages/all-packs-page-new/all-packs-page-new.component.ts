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
  ChangeDetectorRef,
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
import { bool } from 'aws-sdk/clients/signer';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { UserLoginDialogComponent } from '../all-packs-page/user-login-dialog/user-login-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { AiChatComponent } from './ai-chat/ai-chat.component';
import { TranslateService } from '@ngx-translate/core';
import { element } from 'protractor';
import { Platform } from '@angular/cdk/platform';

interface CategoryPack {
  category: string;
  packs: PackContent[];
}
@Component({
  selector: 'app-all-packs-page-new',
  templateUrl: './all-packs-page-new.component.html',
  styleUrls: ['./all-packs-page-new.component.css'],
})
export class AllPacksPageNewComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('filterText') filterTextInput: ElementRef;
  @ViewChildren('autocompleteOptions')
  canScrollRight: boolean[] = [];
  canScrollLeft: boolean[] = [];
  canScrollRightBooks: boolean = false;
  canScrollLeftBooks: boolean = true;
  canScrollRightCategoriesFree: boolean = false;
  canScrollLeftCategoriesFree: boolean = false;
  autocompleteOptions: QueryList<MatOption>;
  isMobileScreen: boolean;
  placeholderText: string = 'הייעוץ זמין למנויים בלבד ❤';
  packsAreLoaded: boolean = false;
  userIsLoggedIn: boolean = false;

  Subscription: Subscription = new Subscription();
  filteredOptions = [];
  allOptions = [];
  filterOption = {
    image: false,
    question: false,
    word: false,
    language: 'he',
  };
  // mobile: boolean;

  allPacks: PackContent[] = [];
  allFavPacks: PackContent[] = [];
  allCategoryPacks: CategoryPack[] = [];
  categoryPackTree: CategoryPack = undefined;
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
  isfavSelected: boolean = false;
  readingBookCategoryArray;
  //Filters
  showCategoryLine: boolean = true;
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  showBottomArrow: boolean = true;
  stopGenerateOptions: boolean = true;
  currentFocusIndex: number = -1; // -1 indicates that no option is currently focused
  selectedFilter: string;
  isFilterDialogOpen: boolean = false;
  isLoading: boolean = false;
  private queryParamSubscription: Subscription;

  filterList = [
    {
      filterText: 'הכרות וחיבור',
      buttonText: 'הכרות וחיבור',
      image: '/assets/New/home-page/cards/1.svg',
    },
    {
      filterText: 'מערכות יחסים',
      buttonText: 'מערכות יחסים',
      image: '/assets/New/home-page/cards/2.svg',
    },
    {
      filterText: 'ילדים ונוער',
      buttonText: 'ילדים ונוער',
      image: '/assets/New/home-page/cards/3.svg',
    },
    {
      filterText: 'חיבור לעצמי',
      buttonText: 'חיבור לעצמי',
      image: '/assets/New/home-page/cards/4.svg',
    },
    {
      filterText: 'העצמה',
      buttonText: 'העצמה',
      image: '/assets/New/home-page/cards/7.svg',
    },
    {
      filterText: 'חגים',
      buttonText: 'חגים',
      image: '/assets/New/home-page/cards/8.svg',
    },
    {
      filterText: 'מנהיגות',
      buttonText: 'מנהיגות',
      image: '/assets/New/home-page/cards/5.svg',
    },
    {
      filterText: 'חזון ומטרות',
      buttonText: 'חזון ומטרות',
      image: '/assets/New/home-page/cards/6.svg',
    },
    {
      filterText: 'קריירה',
      buttonText: 'קריירה',
      image: '/assets/New/home-page/cards/9.svg',
    },
    {
      filterText: 'רגשות',
      buttonText: 'רגשות',
      image: '/assets/New/home-page/cards/10.svg',
    },
    {
      filterText: 'משברים',
      buttonText: 'משברים',
      image: '/assets/New/home-page/cards/11.svg',
    },
  ];

  cardsColors = [
    { color: '#E67C73' },
    { color: '#BB7264' },
    { color: '#2B7B5C' },
    { color: '#009FB4' },
    { color: '#2D427B' },
    { color: '#7986CB' },
    { color: '#7973CD' },
    { color: '#7A275F' },
    { color: '#E49200' },
    { color: '#FF9E6B' },
    { color: '#B3980B' },
    { color: '#7A680C' },
  ];
  selectedCardFilter: string = '';
  @ViewChild('settingsMenuTrigger') settingsMenuTrigger: MatMenuTrigger;
  @ViewChildren('widgetsContent', { read: ElementRef })
  public widgetsContent: QueryList<ElementRef>;

  @ViewChild('packScrollContainer1') packScrollContainer1: ElementRef;
  @ViewChild('packScrollContainer2') packScrollContainer2: ElementRef;
  @ViewChild('packScrollContainer3') packScrollContainer3: ElementRef;
  @ViewChild('packScrollContainer4') packScrollContainer4: ElementRef;
  @ViewChild('packScrollContainer5') packScrollContainer5: ElementRef;
  @ViewChild('packScrollContainer6') packScrollContainer6: ElementRef;

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
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(true);

    this.isLoading = true;
    this.checkScreenSize();
  }
  private scrollSpeed = 5;

  // @HostListener('mousemove', ['$event'])
  // onMouseMove(event: MouseEvent, scrollContainer: HTMLElement): void {
  //   if (scrollContainer) {
  //     const { clientX } = event;
  //     const { scrollWidth, clientWidth } = scrollContainer;
  //     const boundary = 0.1 * clientWidth; // 10% from the edges
  //     const maxScrollLeft = scrollWidth - clientWidth;
  //     const mouseX = clientX - scrollContainer.getBoundingClientRect().left;

  //     // Check if the container is in RTL mode
  //     const isRtl = getComputedStyle(scrollContainer).direction === 'rtl';

  //     // Handle different browser behaviors in RTL mode
  //     let scrollLeft = scrollContainer.scrollLeft;
  //     if (isRtl) {
  //       if (scrollLeft < 0) {
  //         // Chrome/Safari case: scrollLeft is negative in RTL
  //         scrollLeft = Math.abs(scrollLeft);
  //       } else {
  //         // Firefox case: scrollLeft starts from 0 and goes positive
  //         scrollLeft = scrollWidth - clientWidth - scrollLeft;
  //       }
  //     }

  //     if (isRtl) {
  //       // Handle RTL scrolling
  //       if (mouseX < boundary && scrollLeft < maxScrollLeft) {
  //         // Scroll right if mouse is within the left boundary (since it's RTL)
  //         const newScrollLeft = scrollLeft + this.scrollSpeed;
  //         scrollContainer.scrollLeft = -Math.min(newScrollLeft, maxScrollLeft);
  //       } else if (mouseX > clientWidth - boundary && scrollLeft > 0) {
  //         // Scroll left if mouse is within the right boundary (since it's RTL)
  //         const newScrollLeft = scrollLeft - this.scrollSpeed;
  //         scrollContainer.scrollLeft = -Math.max(newScrollLeft, 0);
  //       }
  //     } else {
  //       // Handle LTR scrolling
  //       if (mouseX < boundary && scrollLeft > 0) {
  //         // Scroll left if mouse is within the left boundary
  //         const newScrollLeft = scrollLeft - this.scrollSpeed;
  //         scrollContainer.scrollLeft = Math.max(newScrollLeft, 0);
  //       } else if (
  //         mouseX > clientWidth - boundary &&
  //         scrollLeft < maxScrollLeft
  //       ) {
  //         // Scroll right if mouse is within the right boundary
  //         const newScrollLeft = scrollLeft + this.scrollSpeed;
  //         scrollContainer.scrollLeft = Math.min(newScrollLeft, maxScrollLeft);
  //       }
  //     }
  //   }
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobileScreen = window.innerWidth < 640; // Example breakpoint for mobile screens
  }

  openNewTab(): void {
    const url = 'https://mentor-cards.vp4.me/my-courses';
    window.open(url, '_blank');
  }

  initializeFilteredOptions() {
    // Extract names
    console.log(this.allPacks, 'All packs');
    this.readingBookCategoryArray = [];
    this.allPacks.forEach((element) => {
      if (element.isReadingGuidebookAMust == true) {
        this.readingBookCategoryArray.push(element);
      }
    });

    console.log('Is reading book Must', this.readingBookCategoryArray);

    const allTags = this.allPacks.reduce((acc, pack) => {
      return acc.concat(pack.tags);
    }, []);

    // Remove duplicates
    this.allOptions = Array.from(new Set(allTags));
  }

  openFilterDialog() {
    this.isFilterDialogOpen = true;
  }

  closeFilterDialog() {
    this.isFilterDialogOpen = false;
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

  handleResetClick() {
    // Assuming filters are represented as query parameters, check if any are present
    if (Object.keys(this.queryParamSubscription).length > 0) {
      // Navigate without query parameters (removing filters)
      this.routNavigate
        .navigate(['.'], { relativeTo: this.router, queryParams: {} })
        .then(() => {
          // After navigation, reload the page
          window.location.reload();
        });
    } else {
      // If no filters are present, reload the page directly
      window.location.reload();
    }
  }

  async handlePacksLanguageChange(lang: string) {
    //window.location.reload();
    //localStorage.removeItem('packsLanguage');
    localStorage.setItem('packsLanguage', lang);
    this.filterOption.language = lang;
    localStorage.setItem('packsLanguageLocalStorage', lang);

    // Change the language fo the translation
    this.translateService.use(lang);

    this.cardsService.allPacksReadyEmmiter.subscribe(() => {
      this.setAllPacksData();
      this.setAllCategoryPacksToShow();
      this.setAllFavPacksToShow();
      this.initializeFilteredOptions();
      //this.overlaySpinnerService.changeOverlaySpinner(false);
      this.isLoading = false;
    });
    this.cardsService.getAllPacks();

    // console.log(this.allPacks, 'allPacks .........  ...........................');
  }
  // openChatDialog() {
  //   this.dialog.open(AiChatComponent, {
  //     width: '100%',
  //     height: '100%',
  //     maxWidth: '100vw',
  //     maxHeight: '100vh',
  //     panelClass: 'full-screen-dialog'
  //   });
  // }

  openChatDialog(): void {
    const dialogRef = this.dialog.open(AiChatComponent, {
      width: '400px',
      data: {
        /* pass any data if needed */
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
      // handle the result if needed
    });
  }

  get sanitizedUserStatus(): string {
    return this.userData?.status ?? '';
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.filteredOptions.length > 0) {
      const clickedInsideAutocomplete =
        this.filterTextInput.nativeElement.contains(event.target);
      if (!clickedInsideAutocomplete) {
        this.filteredOptions = [];
        this.currentFocusIndex = -1;
      }
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

  handleFilterChange(filter: string) {
    // Reset all filters
    this.isfavSelected = false;
    this.selectedCardFilter = '';

    if (filter === 'fav') {
      this.isfavSelected = true; // Activate favorite filter
    } else {
      this.selectedCardFilter = filter; // Activate the selected filter
    }
  }

  handleCategoryClick(category: string) {
    // Reset the "favorites" selection
    this.isfavSelected = false;

    // Set the selected category as the active filter
    this.selectOption(category);
    this.selectedCardFilter = category;
  }

  ngAfterViewInit() {
    this.widgetsContent.forEach((widget, index) => {
      this.updateScrollState(index, widget.nativeElement);
    });
    this.router.queryParams.subscribe((params) => {
      let filter = params['filter'];
      if (filter) {
        // console.log('filter:..............', filter);
        this.selectedCardFilter = filter;
        this.selectOption(filter);
        // Rest of your code
      }
    });
  }

  updateScrollState(index: number, element: HTMLElement): void {
    if (!element) return;

    const isRTL = getComputedStyle(element).direction === 'rtl';
    const normalizedScrollLeft = isRTL
      ? element.scrollWidth - element.clientWidth + element.scrollLeft
      : element.scrollLeft;
    const buffer = 1;

    this.canScrollLeft[index] = normalizedScrollLeft > buffer;
    this.canScrollRight[index] =
      normalizedScrollLeft < element.scrollWidth - element.clientWidth - buffer;
  }

  updateScrollStateBooks(): void {
    const element = this.packScrollContainer5.nativeElement;

    const isRTL = getComputedStyle(element).direction === 'rtl';
    const normalizedScrollLeft = isRTL
      ? element.scrollWidth - element.clientWidth + element.scrollLeft
      : element.scrollLeft;
    const buffer = 1;

    this.canScrollLeftBooks = normalizedScrollLeft > buffer;
    this.canScrollRightBooks =
      normalizedScrollLeft < element.scrollWidth - element.clientWidth - buffer;
  }

  updateScrollStateCategoryFree(): void {
    const element = this.packScrollContainer6.nativeElement;

    const isRTL = getComputedStyle(element).direction === 'rtl';
    const normalizedScrollLeft = isRTL
      ? element.scrollWidth - element.clientWidth + element.scrollLeft
      : element.scrollLeft;
    const buffer = 1;

    this.canScrollLeftCategoriesFree = normalizedScrollLeft > buffer;
    this.canScrollRightCategoriesFree =
      normalizedScrollLeft < element.scrollWidth - element.clientWidth - buffer;      
  }


  toggleIsFavSelected() {
    if (this.isfavSelected) {
      this.isfavSelected = false;
    } else {
      this.selectedCardFilter = '';
      this.setAllFavPacksToShow();
      this.isfavSelected = true;
    }
  }

  handleAllPacksClick() {
    this.isfavSelected = false;
    this.selectedCardFilter = '';
    this.freeTextFilterSelected = '';
    this.showCategoryLine = true;

    this.getAllPacks(true);
  }

  ngOnInit() {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobileScreen = true;
    }

    // const observer = setInterval(() => {
    //   for (let containerNumber = 1; containerNumber <= 4; containerNumber++) {
    //     // Check if the container is available
    //     if (this[`packScrollContainer${containerNumber}`]?.nativeElement) {
    //       console.log(`Inside the onInit for container ${containerNumber}`);

    //       // Clear the interval after containers are found
    //       clearInterval(observer);

    //       // Update the scroll buttons for all containers
    //       this.updateScrollButtons(containerNumber);
    //     }
    //   }
    // }, 1000);

    const observers = setInterval(() => {
      if (this.widgetsContent && this.widgetsContent.toArray().length > 0) {
        console.log('Inside the onInit');
        clearInterval(observers);
        // Call the scroll button updates for each container dynamically
        this.updateScrollButtonswidgets();
      }
    }, 100);

    this.queryParamSubscription = this.activatedRoute.queryParams.subscribe(
      (params) => {
        // Access queryParams here
        console.log(params); // This will log the current query parameters
      }
    );
    this.initializeLanguage();
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
      this.userIsLoggedIn = true;
      this.userData = this.userAuthService.userData;
      this.allFavorites = this.userAuthService.favorites;
      this.setAllFavPacksToShow();
      this.getAllPacks(true);
    } else {
      this.getAllPacks(true);
      this.Subscription.add(
        this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
          this.userIsLoggedIn = true;
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
    console.log('allpacks page sub 2');
    console.log(
      localStorage.getItem('isTrialPacksDialogOpen'),
      'isTrialPacksDialogOpen href'
    );

    if (!this.userData || this.userData?.status === 'NOPLAN') {
      if (localStorage.getItem('isTrialPacksDialogOpen') === 'false') {
        localStorage.setItem('isTrialPacksDialogOpen', 'true');
        console.log(
          localStorage.getItem('isTrialPacksDialogOpen'),
          'after set isTrialPacksDialogOpen href'
        );
        this.openDialog();
      }
    }
    if (this.userData?.status === 'PLAN') {
      this.placeholderText = 'איך אפשר לעזור?';
    }
    //this.getAllPacks();
    this.translateService.onLangChange.subscribe((event) => {
      this.handleLanguageChange(event.lang);
    });
  }

  initializeLanguage(): void {
    const storedLanguage = localStorage.getItem('packsLanguageLocalStorage');
    if (storedLanguage) {
      this.filterOption.language = storedLanguage;
    } else {
      this.filterOption.language = 'he'; // Set Hebrew as default
      localStorage.setItem('packsLanguageLocalStorage', 'he');
    }
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
    console.log('useCache: ' + useCache);
    this.overlaySpinnerService.changeOverlaySpinner(true, 'packs');
    if (useCache) {
      if (this.cardsService.allPacks) {
        this.overlaySpinnerService.changeOverlaySpinner(true, 'packs');
        if (this.cardsService.isLoggedIn) {
          this.overlaySpinnerService.changeOverlaySpinner(
            true,
            'userDataLogin'
          );
        } else {
          this.overlaySpinnerService.changeOverlaySpinner(
            true,
            'userDataNotLogin'
          );
        }
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
        this.initializeFilteredOptions();
        this.overlaySpinnerService.changeOverlaySpinner(false);
        if (this.cardsService.isLoggedIn) {
          this.overlaySpinnerService.changeOverlaySpinner(
            false,
            'userDataLogin'
          );
        } else {
          this.overlaySpinnerService.changeOverlaySpinner(
            false,
            'userDataNotLogin'
          );
        }
        this.isLoading = false;
        this.packsAreLoaded = true;
        this.overlaySpinnerService.changeOverlaySpinner(false, 'packs');
        // this.sortPacks();
      } else {
        this.cardsService.allPacksReadyEmmiter.subscribe(() => {
          this.overlaySpinnerService.changeOverlaySpinner(true, 'packs');
          if (this.cardsService.isLoggedIn) {
            this.overlaySpinnerService.changeOverlaySpinner(
              true,
              'userDataLogin'
            );
          } else {
            this.overlaySpinnerService.changeOverlaySpinner(
              true,
              'userDataNotLogin'
            );
          }
          this.setAllPacksData();
          this.setAllCategoryPacksToShow();
          this.setAllFavPacksToShow();
          this.initializeFilteredOptions();
          this.overlaySpinnerService.changeOverlaySpinner(false);
          this.isLoading = false;
          this.packsAreLoaded = true;
          this.overlaySpinnerService.changeOverlaySpinner(false, 'packs');
          if (this.cardsService.isLoggedIn) {
            this.overlaySpinnerService.changeOverlaySpinner(
              false,
              'userDataLogin'
            );
          } else {
            this.overlaySpinnerService.changeOverlaySpinner(
              false,
              'userDataNotLogin'
            );
          }
        });
        this.cardsService.getAllPacks();
      }
    } else {
      this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        this.overlaySpinnerService.changeOverlaySpinner(true, 'packs');
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
        this.initializeFilteredOptions();
        const packs = this.allPacks.filter(pack => pack.cards.length);
        if (this.userIsLoggedIn && packs.length) {
          setTimeout(() => {
            this.overlaySpinnerService.changeOverlaySpinner(false, 'packs');
          }, 5000);
        }

        if (!this.userIsLoggedIn) {
          this.overlaySpinnerService.changeOverlaySpinner(false, 'packs');
        }
        this.isLoading = false;
        this.packsAreLoaded = true;
      });
      console.log('cardsService.getAllPacks');
      this.cardsService.getAllPacks();
    }
  }

  setAllPacksData(): void {
    this.allPacks = this.cardsService.allPacks.map((pack) => pack);
    this.allCategories = this.cardsService.allCategories.map(
      (category) => category
    );
    console.log('this.allCategories', this.allCategories);
    this.allFavorites = this.userAuthService.favorites;

    this.isPageLoaded = true;
  }

  setAllCategoryPacksToShow(): void {
    console.log('setAllCategoryPacksToShow', this.allCategoryPacks);
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

    this.categoryPackTree = this.allCategoryPacks.find(categoryPack => categoryPack?.packs.every(pack=> pack.isFree && !pack.isExternalPack));
    this.allCategoryPacks = this.allCategoryPacks.filter(categoryPack => categoryPack?.category !== this.categoryPackTree?.category);
    
    const observer = setInterval(() => {
      for (let containerNumber = 1; containerNumber <= 4; containerNumber++) {
        // Check if the container is available
        if (this[`packScrollContainer${containerNumber}`]?.nativeElement) {
          console.log(`Inside the onInit for container ${containerNumber}`);

          // Clear the interval after containers are found
          clearInterval(observer);

          // Update the scroll buttons for all containers
          this.updateScrollButtons(containerNumber);
        }
      }
    }, 100);
  }

  // @HostListener('document:click', ['$event'])
  // clickOutside(event: Event) {
  //   const clickedInsideAutocomplete =
  //     this.filterTextInput.nativeElement.contains(event.target);
  //   if (!clickedInsideAutocomplete) {
  //     this.filteredOptions = [];
  //     this.currentFocusIndex = -1;
  //   }
  // }

  setAllFavPacksToShow(): void {
    this.allFavPacks = this.allPacks.filter((pack) =>
      this.allFavorites?.includes(parseInt(pack.id))
    );
    console.log('this.allFavPacks', this.allFavPacks);
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
    console.log('categoriesSelectedChange');
    console.log(event);
    var index = this.selectedCategories.findIndex((el) => el === event);
    index == -1
      ? this.selectedCategories.push(event)
      : this.selectedCategories.splice(index, 1);
    this.filterPacks();
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
    console.log('filterPacks');
    this.loadedPacks = 0;
    this.allPacks = this.cardsService.allPacks?.map((pack) => pack);
    if (this.allPacks) {
      if (this.freeTextFilterSelected !== '') {
        console.log('freeTextFilterSelected');
        console.log(this.freeTextFilterSelected);
        this.freeTextFilter();
      }
      if (this.selectedCategories.length != 0) {
        console.log('selectedCategories');
        console.log(this.selectedCategories);
        this.categoryFilter();
      }
      if (this.selectedFavorites.length != 0) {
        console.log('selectedFavorites');
        console.log(this.selectedFavorites);
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

  private handleLanguageChange(lang: string): void {
    localStorage.setItem('packsLanguage', lang);
    this.filterOption.language = lang;
    localStorage.setItem('packsLanguageLocalStorage', lang);
    this.getAllPacks(false); // Update packs to reflect the new language filter
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
    let dialogWidth = '45vw'; // default width

    // Check if the screen size is small (mobile)
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      dialogWidth = '90vw'; // width for mobile screens
    }

    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      width: dialogWidth,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
  }

  isScrollable(element: HTMLElement): boolean {
    return element.scrollWidth > element.clientWidth;
  }

  // @ViewChildren('widgetsContent', { read: ElementRef }) public widgetsContent: QueryList<ElementRef>;

  scrollRight(index: number): void {
    const element = this.widgetsContent.toArray()[index].nativeElement;
    element.scrollBy({ left: 500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollState(index, element), 300); // Re-check state after scrolling
  }

  scrollLeftBooks(): void {
    const element = this.packScrollContainer5.nativeElement;
    element.scrollBy({ left: -500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollStateBooks(), 300); // Re-check state after scrolling
  }

  scrollRightBooks(): void {
    const element = this.packScrollContainer5.nativeElement;
    element.scrollBy({ left: 500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollStateBooks(), 300); // Re-check state after scrolling
  }

  scrollLeftCategoriesFree(): void {
    const element = this.packScrollContainer6.nativeElement;
    element.scrollBy({ left: -500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollStateBooks(), 300); // Re-check state after scrolling
  }

  scrollRightCategoriesFree(): void {
    const element = this.packScrollContainer6.nativeElement;
    element.scrollBy({ left: 500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollStateBooks(), 300); // Re-check state after scrolling
  }

  scrollLeft(index: number): void {
    const element = this.widgetsContent.toArray()[index].nativeElement;
    element.scrollBy({ left: -500, behavior: 'smooth' }); // Adjust scroll amount as needed
    setTimeout(() => this.updateScrollState(index, element), 300); // Re-check state after scrolling
  }

  // Update the scroll buttons visibility for each container
  private updateScrollButtonswidgets(): void {
    this.widgetsContent.toArray().forEach((element, i) => {
      const container = element.nativeElement;
      const isRTL = getComputedStyle(container).direction === 'rtl';
      const normalizedScrollLeft = isRTL
        ? container.scrollWidth - container.clientWidth + container.scrollLeft
        : container.scrollLeft;
      const buffer = 1;

      // Dynamically update the scroll buttons visibility
      this.canScrollLeft[i] = normalizedScrollLeft > buffer;
      this.canScrollRight[i] =
        normalizedScrollLeft <
        container.scrollWidth - container.clientWidth - buffer;
    });
  }

  // scrollLeftWithRef(containerNumber:number) {
  //   switch (containerNumber) {
  //     case 1:
  //       this.packScrollContainer1?.nativeElement.scrollTo({ left: (this.packScrollContainer1?.nativeElement.scrollLeft - 600), behavior: 'smooth' });
  //       break;
  //       case 2:
  //         this.packScrollContainer2?.nativeElement.scrollTo({ left: (this.packScrollContainer2?.nativeElement.scrollLeft - 600), behavior: 'smooth' });
  //         break;
  //         case 3:
  //           this.packScrollContainer3?.nativeElement.scrollTo({ left: (this.packScrollContainer3?.nativeElement.scrollLeft - 300), behavior: 'smooth' });
  //           setTimeout(() => this.updateScrollButtons(), 300);
  //           break;
  //           case 4:
  //             this.packScrollContainer4?.nativeElement.scrollTo({ left: (this.packScrollContainer4?.nativeElement.scrollLeft - 600), behavior: 'smooth' });
  //             break;
  //             case 5:
  //               this.packScrollContainer5?.nativeElement.scrollTo({ left: (this.packScrollContainer5?.nativeElement.scrollLeft - 600), behavior: 'smooth' });
  //               break;

  //     default:
  //       break;
  //   }

  // }

  // scrollRightWithRef(containerNumber:Number) {
  //   switch (containerNumber) {
  //     case 1:
  //       this.packScrollContainer1?.nativeElement.scrollTo({ left: (this.packScrollContainer1?.nativeElement.scrollLeft + 600), behavior: 'smooth' });
  //       break;
  //       case 2:
  //         this.packScrollContainer2?.nativeElement.scrollTo({ left: (this.packScrollContainer2?.nativeElement.scrollLeft + 600), behavior: 'smooth' });
  //         break;
  //         case 3:
  //           this.packScrollContainer3?.nativeElement.scrollTo({ left: (this.packScrollContainer3?.nativeElement.scrollLeft + 300), behavior: 'smooth' });
  //           setTimeout(() => this.updateScrollButtons(), 300);
  //           break;
  //           case 4:
  //             this.packScrollContainer4?.nativeElement.scrollTo({ left: (this.packScrollContainer4?.nativeElement.scrollLeft + 600), behavior: 'smooth' });
  //             break;
  //             case 5:
  //               this.packScrollContainer5?.nativeElement.scrollTo({ left: (this.packScrollContainer5?.nativeElement.scrollLeft - 600), behavior: 'smooth' });
  //               break;

  //     default:
  //       break;
  //   }
  // }

  scrollStates: {
    [key: number]: { canScrollLeft: boolean; canScrollRight: boolean };
  } = {
    1: { canScrollLeft: false, canScrollRight: false },
    2: { canScrollLeft: false, canScrollRight: false },
    3: { canScrollLeft: false, canScrollRight: false },
    4: { canScrollLeft: false, canScrollRight: false },
    5: { canScrollLeft: false, canScrollRight: false },
  };

  scrollLeftWithRef(containerNumber: number) {
    const container =
      this[`packScrollContainer${containerNumber}`]?.nativeElement;
    if (!container) return;
    const isRTL = getComputedStyle(container).direction === 'rtl';
    const scrollAmount = isRTL
      ? container.scrollLeft - 500 // For RTL, reduce scrollLeft
      : container.scrollLeft + 500; // For LTR, increase scrollLeft
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(() => this.updateScrollButtons(containerNumber), 300);
  }
  scrollRightWithRef(containerNumber: number) {
    const container =
      this[`packScrollContainer${containerNumber}`]?.nativeElement;
    if (!container) return;
    const isRTL = getComputedStyle(container).direction === 'rtl';
    const scrollAmount = isRTL
      ? container.scrollLeft + 500 // For RTL, increase scrollLeft
      : container.scrollLeft - 500; // For LTR, decrease scrollLeft
    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(() => this.updateScrollButtons(containerNumber), 300);
  }

  private updateScrollButtons(containerNumber: number): void {
    const element =
      this[`packScrollContainer${containerNumber}`]?.nativeElement;
    if (!element) return;

    const isRTL = getComputedStyle(element).direction === 'rtl';
    const normalizedScrollLeft = isRTL
      ? element.scrollWidth - element.clientWidth + element.scrollLeft
      : element.scrollLeft;
    const buffer = 1;

    this.scrollStates[containerNumber].canScrollLeft =
      normalizedScrollLeft > buffer;
    this.scrollStates[containerNumber].canScrollRight =
      normalizedScrollLeft < element.scrollWidth - element.clientWidth - buffer;
  }

  // private updateScrollButtons(): void {
  //   const element = this.packScrollContainer3?.nativeElement;
  //   this.canScrollRight = (element.scrollLeft * -1) > 0;
  //   const scrollLeft = element.scrollLeft * -1
  //   this.canScrollLeft = scrollLeft < element.scrollWidth + element.clientWidth;
  //   console.log(this.canScrollLeft, 'Left' );
  //   console.log(this.canScrollRight, 'Right' );
  // }
}
