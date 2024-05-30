import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, NgZone } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { Router } from '@angular/router';
import { bool } from 'aws-sdk/clients/signer';
import { Subscription } from 'rxjs';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

interface CategoryPack {
  category: string;
  packs: PackContent[];
}
@Component({
  selector: 'app-home-page-cards',
  templateUrl: './home-page-cards.component.html',
  styleUrls: ['./home-page-cards.component.css']
})
export class HomePageCardsComponent implements OnInit {

  cardsList = [
    {title: 'Card 1', content: 'הכרות וחיבור', image: '/assets/New/home-page/cards/1.svg'},
    {title: 'Card 2', content: 'מערכות יחסים', image: '/assets/New/home-page/cards/2.svg'},
    {title: 'Card 3', content: 'ילדים ונוער', image: '/assets/New/home-page/cards/3.svg'},
    {title: 'Card 4', content: 'חיבור לעצמי', image: '/assets/New/home-page/cards/4.svg'},
    {title: 'Card 5', content: 'מנהיגות', image: '/assets/New/home-page/cards/5.svg'},
    {title: 'Card 6', content: 'חזון ומטרות', image: '/assets/New/home-page/cards/6.svg'},
    {title: 'Card 7', content: 'העצמה ', image: '/assets/New/home-page/cards/7.svg'},
    {title: 'Card 8', content: 'חגים', image: '/assets/New/home-page/cards/8.svg'},
    {title: 'Card 9', content: 'קריירה', image: '/assets/New/home-page/cards/9.svg'},
    {title: 'Card 10', content: 'רגשות', image: '/assets/New/home-page/cards/10.svg'},
    {title: 'Card 11', content: 'משברים', image: '/assets/New/home-page/cards/11.svg'},
    {title: 'Card 12', content: 'לכל הערכות', image: '/assets/New/home-page/cards/12.svg'},
  ]
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


  constructor(
    private cardsService: CardsService,
    private overlaySpinnerService: OverlaySpinnerService,
    public routNavigate: Router,
    private userAuthService: UserAuthService,
    private ngZone: NgZone,
    private router: Router

  ) { }

  ngOnInit(): void {
    if(this.userAuthService.isLoggedIn){
      this.userData = this.userAuthService.userData;
      this.allFavorites = this.userAuthService.favorites;
      this.setAllFavPacksToShow();
      this.getAllPacks(true);
    }
    else{
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
    console.log('allpacks page sub 2');
    console.log(localStorage.getItem('isTrialPacksDialogOpen'),'isTrialPacksDialogOpen href');
  
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

  handleClick(){
   this.showCategoryLine = !this.showCategoryLine;
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
  //   
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
    console.log('useCache: '  + useCache);
    if(useCache){
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
    else{
      this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        console.log('getAllPacks finished!');
        this.setAllPacksData();
        this.setAllCategoryPacksToShow();
        this.setAllFavPacksToShow();
        this.initializeFilteredOptions();
        this.overlaySpinnerService.changeOverlaySpinner(false);
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
    console.log(this.allCategories);
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

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }


}
