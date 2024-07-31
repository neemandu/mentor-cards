// import { Component, OnInit, Output } from '@angular/core';
// import { EventEmitter } from 'stream';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  HostListener,
  QueryList,
  ViewChildren,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { bool } from 'aws-sdk/clients/signer';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { AuthService } from 'src/app/Services/auth.service';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

interface CategoryPack {
  category: string;
  packs: PackContent[];
}

@Component({
  selector: 'app-nav-bar-new',
  templateUrl: './nav-bar-new.component.html',
  styleUrls: ['./nav-bar-new.component.css'],
})
export class NavBarNewComponent implements OnInit {
  matRippleColor: 'red';
  navBarItems = [
    {
      name: 'pages.nav.navbar.all-card-packs',
      route: '/all-packs-page',
      placeholder: 'All Card Packs',
    },
    {
      name: 'pages.nav.navbar.digital-courses',
      placeholder: 'Digital Courses',
    },
    {
      name: 'pages.nav.navbar.our-plans',
      route: '/price-page',
      placeholder: 'Our Plans',
    },
    { name: 'pages.nav.navbar.faq', route: '/guide-page', placeholder: 'FAQ' },
    {
      name: 'pages.nav.navbar.additional-services',
      route: '/services',
      placeholder: 'Additional Services',
    },
    {
      name: 'pages.nav.navbar.about-us',
      route: '/about-page',
      placeholder: 'About Us',
    },
    {
      name: 'pages.nav.navbar.affiliates',
      route: '/affiliates-page',
      placeholder: 'Affiliates',
    },
    {
      name: 'pages.nav.navbar.contact-us',
      route: '/home-page#contact-us-section',
      placeholder: 'Contact Us',
    },
  ].map((item) => ({ ...item, hovering: false }));

  isActive(item) {
    return this.router.url === item.route;
  }

  // @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('filterText') filterTextInput: ElementRef;
  // @ViewChildren('autocompleteOptions')
  autocompleteOptions: QueryList<MatOption>;

  Subscription: Subscription = new Subscription();
  filteredOptions = [];
  allOptions = [];
  // mobile: boolean;

  allPacks: PackContent[] = [];
  allFavPacks: PackContent[] = [];
  allCategoryPacks: CategoryPack[] = [];
  // categoriesOrder: string[] = [
  //   'ערכות להתנסות חופשית',
  //   'קלפי תמונה',
  //   'שיתופי פעולה',
  //   'קלפי שאלות',
  //   'קלפי חגים',
  //   'קלפי מילה',
  //   'קלפי תמונה + מילה',
  //   'קלפי מסרים',
  //   'קלפי ערכים',
  //   'הייטק',
  //   'מתנה',
  // ];
  userData: UserData;
  allCategories: string[] = [];
  allFavorites: number[] = [];
  loadedPacks: number = 0;
  // categoriesToShow: number = 5;
  isPageLoaded: boolean = false;

  //Filters
  showCategoryLine: boolean = true;
  freeTextFilterSelected: string = '';
  selectedCategories: string[] = [];
  selectedFavorites: string[] = [];
  showBottomArrow: boolean = true;
  stopGenerateOptions: boolean = true;
  currentFocusIndex: number = -1; // -1 indicates that no option is currently focused

  hover(item) {
    item.hovering = true;
  }

  leave(item) {
    item.hovering = false;
  }

  @Output() showSignInModalEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.showTour = window.innerWidth >= 1024; // Adjust the breakpoint as needed
  }

  userAttributes: any;
  loggedIn: boolean = false;
  news: any[];
  newsNotification: boolean = false;
  showBanner: boolean = true;
  countdown = '';

  localesList = [
    { code: 'en', label: 'English' },
    { code: 'he', label: 'עברית' },
  ];

  constructor(
    private userAuthService: UserAuthService,
    public router: Router,
    private ngZone: NgZone,
    private api: APIService,
    private amplifyAuthService: AuthService,
    private cardsService: CardsService,
    private overlaySpinnerService: OverlaySpinnerService,
    public routNavigate: Router,
    public langDirectionService: LangDirectionService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    // this.startCountdown();
    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.userAttributes = userData;
      this.loggedIn = userData ? true : false;
      this.showBanner =
        this.loggedIn &&
        this.userAttributes?.subscription?.subscriptionPlan?.id !==
          'MCLIFETIME';
    });
    this.api.ListNewss().then(
      (news) => {
        this.news = news.items.sort((a, b) => a.order - b.order);
        let oldNews = localStorage.getItem('news');
        // if (oldNews !== this.getNewsList()) {
        //   this.newsNotification = true;
        // }
      },
      (error) => {
        // console.log("file: site-content-management.component.ts ~ line 42 ~ this.api.ListNewss ~ error", error)
      }
    );
    if (this.userAuthService.isLoggedIn) {
      this.userData = this.userAuthService.userData;
      this.allFavorites = this.userAuthService.favorites;
      this.setAllFavPacksToShow();
      this.getAllPacks(true);
    } else {
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
    // console.log(localStorage.getItem('isTrialPacksDialogOpen'),'isTrialPacksDialogOpen href');

    // this.getAllPacks();
  }

  // viewNotifications(): void {
  //   if (this.newsNotification) {
  //     localStorage.setItem("news", this.getNewsList());
  //     this.newsNotification = false;
  //   }
  // }

  // openEnterCouponCodeModal(): void {
  //   this.userAuthService.openEnterCouponCodeModal();
  // }

  // /**
  //  * @returns a string with all news to save\compare
  //  */
  // private getNewsList(): string {
  //   let res = this.news.map(n => n.message).toString();
  //   return res;
  // }

  logout(): void {
    this.userAuthService.logOut();
    this.navigate('/home-page');
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
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

  // ngOnInit() {
  //   this.router.queryParams.subscribe((params) => {
  //     const refId = params['ref'];
  //     if (refId) {
  //       localStorage.setItem('refId', refId);
  //       console.log('refId ID stored:', refId);
  //     }
  //   });

  //   // track events
  //   this.mixpanelService.track('PageViewed', {
  //     'Page Title': 'all-packs-page',
  //   });

  //   if(this.userAuthService.isLoggedIn){
  //     this.userData = this.userAuthService.userData;
  //     this.allFavorites = this.userAuthService.favorites;
  //     this.setAllFavPacksToShow();
  //     this.getAllPacks(true);
  //   }
  //   else{
  //     this.getAllPacks(true);
  //     this.Subscription.add(
  //       this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
  //         this.getAllPacks(false);
  //         this.userData = userData;
  //         this.allFavorites = this.userAuthService.favorites;
  //         this.setAllFavPacksToShow();
  //       })
  //     );
  //   }

  //   this.Subscription.add(
  //     this.userAuthService.favoritesChangeEmmiter.subscribe(
  //       (favorites: number[]) => {
  //         this.allFavorites = favorites;
  //         this.setAllFavPacksToShow();
  //       }
  //     )
  //   );
  //   console.log('allpacks page sub 2');
  //   console.log(localStorage.getItem('isTrialPacksDialogOpen'),'isTrialPacksDialogOpen href');
  //   if (!this.userData || this.userData.status === 'NOPLAN') {
  //     if (localStorage.getItem('isTrialPacksDialogOpen') === 'false') {
  //       localStorage.setItem('isTrialPacksDialogOpen', 'true');
  //       console.log(localStorage.getItem('isTrialPacksDialogOpen'),'after set isTrialPacksDialogOpen href');
  //       this.openDialog();
  //     }
  //   }
  //   //this.getAllPacks();
  // }

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

  /**
   * Retrive all packs
   */
  getAllPacks(useCache: bool): void {
    // console.log('useCache: '  + useCache);
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
    } else {
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
    // console.log(this.allCategories);
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

  // getAllFavoritesDesc(): string[] {
  //   if (!this.allFavorites) {
  //     this.allFavorites = [];
  //   }
  //   return this.cardsService.allPacks
  //     ? this.cardsService.allPacks
  //         .filter((pack) => this.allFavorites?.includes(parseInt(pack.id)))
  //         .map((pack) => pack.name)
  //     : this.allPacks
  //         .filter((pack) => this.allFavorites?.includes(parseInt(pack.id)))
  //         .map((pack) => pack.name);
  //   // return this.cardsService.allPacks ? (this.cardsService.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name) : (this.allPacks.filter(pack => this.allFavorites.includes(pack.id))).map(pack => pack.name);
  // }

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
    this.router.navigate(['all-packs-page'], {
      queryParams: { filter: option },
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
    this.ngZone.run(() => this.routNavigate.navigate([path]));
  }
  navigateTo(route: string): void {
    if (route.includes('#')) {
      const [path, fragment] = route.split('#');
      this.router.navigate([path]).then(() => {
        // Wait for navigation to complete
        setTimeout(() => {
          const element = this.document.querySelector(`#${fragment}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100); // Adjust timeout as needed
      });
    } else {
      this.router.navigate([route]);
    }
  }
}
