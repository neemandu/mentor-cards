import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { CardComponent } from 'src/app/Shared Components/card/card.component';
import * as exampleCards from '../../../assets/Bundle Configurations/ExmaplePack.json';
import { PopoutData, PopoutService } from 'src/app/Services/popout.service';
import { UserData } from 'src/app/Objects/user-related';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Subscription } from 'rxjs';
import { AboutAuthorComponent } from 'src/app/Shared Components/pack/about-author/about-author.component';
import { Card, cardsImages } from 'src/app/Objects/card';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { CopyCommonLinkDialogComponent } from 'src/app/Pages/pack-content-page/copy-common-link-dialog-component/copy-common-link-dialog-component.component';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { bool } from 'aws-sdk/clients/signer';
import { confirmationDialogueComponent } from './confirmation-dialog';

@Component({
  selector: 'app-pack-content-page',
  templateUrl: './pack-content-page.component.html',
  styleUrls: ['./pack-content-page.component.css'],
})
export class PackContentPageComponent implements OnInit, OnDestroy {

  @ViewChild('dropdownInput') dropdownInput    : ElementRef;

  Subscription: Subscription = new Subscription();
  id: any;
  pack: PackContent;
  selectedCards: any[] = [];
  loadedCards: number = 0;
  flipped: boolean = false;
  multipileChecked: boolean = false;
  showGuideBook: boolean = false;
  userData: UserData;
  showSelectedCards: boolean = false;
  showRandomCards: boolean = false;
  portraitToLandscapeAlertShown: boolean = false;
  showEditPack: boolean = false;
  removedCards: cardsImages[] = [];
  cards: Card[] = [];
  cardImages: cardsImages[] = [];
  unauthorized: boolean = false;
  isDoubleSided: boolean = false;
  isLoaded: boolean = false;
  randomSelectedCard: Card;
  randomCardIndex: number = 0;
  commonLink: any = undefined;
  flipCard: string = 'inactive';
  rotation: number = 0;
  isMobile: boolean = false;
  isDialogOpen = false;
  isLoading: boolean = false;
  error: string = null;

  // For DropDown
  isDropdownOpen = false;
  defaultOption: string = 'כתבו או בחרו שאלה להתבוננות והעמקה';
  selectedOption: string;

  isEditing = false;
  isEditingOption: number | null = null;
  selectedIndex: number;

  showInputFieldInDropDown : boolean = false;

  // Category
  categoriesCard: any;
  toggleRow: boolean = true;
  selectedRowIndex: number = -1;

  categoryOpenStates: { [key: number]: boolean } = {};
  selectedCategory: any;

  // TODO
  multiSelectCard: Array<any> = [];
  displayedCategories: Set<string> = new Set<string>(); // To track displayed categories
  cardWidth: number = 10; // in rem
  cardHeight: number = 15; // in rem
  imageWidth: number = 160; // in px
  imageHeight: number = 219; // in px
  aspectRatio: number = this.imageWidth / this.imageHeight;
  containerPadding: number = 2;
  overFlowCardContainerHeight: number = 340;
  showFooterContainer: boolean = true;

  categoryFlipped : boolean = false;
  categoryBaseArray = [];
  categoryScreen: boolean = false;

  isScrolled = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check the vertical scroll position
    this.isScrolled = window.scrollY ;
  }


  constructor(
    public route: ActivatedRoute,
    private cardsService: CardsService,
    public dialog: MatDialog,
    private overlaySpinnerService: OverlaySpinnerService,
    private api: APIService,
    public popoutService: PopoutService,
    public componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private userAuthService: UserAuthService,
    private ngZone: NgZone,
    private mixpanelService: MixpanelService,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    private http: HttpClient,
    public langDirectionService: LangDirectionService,
    private mixpanel: MixpanelService
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
    });
    this.userData = this.userAuthService.userData;
  }

  // Option Array List
  options = [
    
    { text: 'אין צורך בשאלה, אני אקח את זה מכאן' },
    { text: 'אני רוצה לכתוב שאלה משלי (לחצו כאן כדי לכתוב שאלה משלכם)' },
    {
      text: 'אשמח לראות את ספר ההדרכה לעוד רעיונות לשאלות',
      icon: '/assets/New/pack-view/book-icon.svg',
    },
  ];

  // Method For Trigger
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option: { text: string; icon?: string }, index: number): void {
    const lastOption = this.options[this.options.length - 1];
    if (option === lastOption) {
      this.openGuideBook();
    } else if (index === this.options.length - 2) {
      this.isEditing = true;
      this.isEditingOption = index;
      this.selectedOption = option.text;
      this.showInputFieldInDropDown = true;
      setTimeout(() => {
        this.dropdownInput.nativeElement.focus();
      });
    } else {
      this.selectedOption = option.text;
      this.defaultOption = this.selectedOption;
      this.isDropdownOpen = false;
      this.isEditing = false;
      this.isEditingOption = null;
      this.showInputFieldInDropDown = false;
    }
  }


  updateOptionArray(): void {
    const newText = this.dropdownInput.nativeElement.value.trim();
    if (newText) {
      this.options[this.options.length - 2] = {
        text: newText,
      };
      this.defaultOption = newText; // Set the edited option as the selected option
      this.selectedOption = newText; // Reflect the change in the displayed selected option
    }
    this.isEditing = false;
    this.dropdownInput.nativeElement.value = "";
    this.isDropdownOpen = false;
    this.showInputFieldInDropDown = false;
  }

  
  // Method to save the edited option
  saveEdit(option: { text: string }, index: number) {
    if (this.isEditing && this.isEditingOption === index) {
      // Get the editable content
      const editedText = (
        document.querySelector(
          '.dropdown-option[contentEditable="true"]'
        ) as HTMLElement
      )?.textContent?.trim();

      if (editedText) {
        // Update the option with the edited text
        this.options[index].text = editedText;

        // Update the selectedOption to reflect the change
        this.selectedOption = editedText;
      }

      // Close the edit mode
      this.isEditing = false;
      this.isEditingOption = null;
      this.isDropdownOpen = false;
    }
  }

  // Add a method to handle clicks outside the dropdown to close it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    const dropdown = document.querySelector('.dropdown') as HTMLElement;
    if (dropdown && !dropdown.contains(clickedElement)) {
      this.isDropdownOpen = false;
      this.isEditing = false;
      this.isEditingOption = null;
    }
  }

  onRightClick(): boolean {
    return false;
  }

  ngOnInit(): void {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobile = true;
    }
    this.route.queryParams.subscribe((params) => {
      this.commonLink = params['link'];
      // console.log('link:', this.commonLink);
    });
    this.userData = this.userAuthService.userData;

    this.api.IncrementPackEntries({ cardsPackId: parseInt(this.id) }).then(
      () => {},
      (reject) => {
        console.log(
          '🚀 ~ file: pack-content-page.component.ts ~ line 82 ~ this.api.IncrementPackEntries ~ reject',
          reject
        );
      }
    );
    //a specific pack
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadPack();
    });
    // track events
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 300);

    this.getFilteredCategories()?.forEach((_, index) => {
      this.categoryOpenStates[index] = true;
    });
  }

  loadPack(): void {
    this.isLoading = true;
    this.error = null;

    if (this.cardsService.allPacks) {
      this.setPack(
        this.cardsService.allPacks.find((pack) => pack.id === this.id)
      );
      console.log('this.pack', this.pack);
      let topQuestions = this.pack?.topQuestions;
      if (topQuestions) {
        const formattedQuestions = topQuestions.map((q) =>
          typeof q === 'string' ? { text: q } : q
        );
        this.options = [...formattedQuestions, ...this.options];
      }
      console.log('this.options', this.options);
      console.log('loading pack from service');
    } else {
      console.log('fetching pack');
      console.log('this.id', this.id);
      console.log('this.commonLink', this.commonLink);
      this.setPack(
        this.cardsService.allPacks.find((pack) => pack.id === this.id)
      );
      let topQuestions = this.pack?.topQuestions;

      if (topQuestions) {
        const formattedQuestions = topQuestions.map((q) =>
          typeof q === 'string' ? { text: q } : q
        );
        this.options = [...formattedQuestions, ...this.options];
      }

      console.log('this.options', this.options);
    }
  }

  setPack(pack: PackContent | undefined): void {
    if (pack) {
      this.pack = pack;
      this.cards = [...this.pack.cards];
      this.cardImages = this.pack.cards[0]?.cardsImages || [];
      this.isDoubleSided = this.cardImages[0]?.backImgUrl ? true : false;
      this.unauthorized = this.pack.cards.length === 0;
      if (this.pack.cards.length > 1) {
        this.categoriesCard = this.pack.cards;
        console.log(this.categoriesCard, 'cards here');
      }
      console.log(this.cardImages);
    } else {
      this.error = 'Pack not found';
    }
    this.isLoading = false;
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  downloadAllImages() {
    if (!Array.isArray(this.selectedCards) || this.selectedCards.length === 0) {
      console.error('No images to download.');
      return;
    }
    this.selectedCards.forEach((item, index) => {
      let imageUrl: string | undefined;
      let filename: string;
      // Handle different data formats
      if (item?.card?.frontImgUrl) {
        imageUrl = item.card.frontImgUrl;
        filename = `image_${item.card.index ?? index}.jpg`;
      } else if (item?.frontImgUrl) {
        imageUrl = item.frontImgUrl;
        filename = `image_${item.index ?? index}.jpg`;
      } else {
        console.error('Invalid image data:', item);
        return;
      }
      // Ensure filename is valid
      if (!filename) {
        console.error('Filename is missing or invalid.');
        return;
      }
      this.downloadImage(imageUrl, filename);
    });
  }

  downloadImage(imageUrl: string, filename: string) {
    if (!imageUrl || !filename) {
      console.error('Invalid imageUrl or filename.');
      return;
    }
    try {
      new URL(imageUrl); // Check if the URL is valid
    } catch {
      console.error('Invalid URL:', imageUrl);
      return;
    }
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // selectCategory(category: any) {
  //   console.log(category, 'CATEGORY')
  //   this.categoriesCard.forEach((element) => {
  //     if (element.categoryStepNumber === category.categoryStepNumber) {
  //       this.categoriesCard = [element]; // Reassign the array to only include the found category
  //     }
  //   });
  // }

  // showAll() {
  //   this.categoriesCard = this.pack.cards;
  // }

  // toggle(index: number): void {
  //   if (this.selectedRowIndex === index) {
  //     this.selectedRowIndex = -1; // Collapse if the same row is clicked
  //   } else {
  //     this.selectedRowIndex = index; // Expand the clicked row
  //   }
  // }

  selectCategory(category: any) {
    console.log(category, 'CATEGORY');
    this.selectedCategory = category;
  }

  getFilteredCategories() {
    if (this.selectedCategory) {
      return this.categoriesCard.filter(
        (element) =>
          element.categoryStepNumber ===
          this.selectedCategory.categoryStepNumber
      );
    }
    return this.categoriesCard;
  }

  showAll() {
    this.selectedCategory = null; // Reset the selected category to show all cards
  }

  toggle(index: number): void {
    this.categoryOpenStates[index] = !this.categoryOpenStates[index];
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  checkIfImageIsPortrait(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img.height > img.width);
      img.onerror = reject;
    });
  }

  async checkCardOrientation(card: Card) {
    const isPortrait = await this.checkIfImageIsPortrait(
      card.cardsImages[0].frontImgUrl
    );
  }

  changeRandomCard(b) {
    this.randomCardIndex = this.randomCardIndex + b;
  }

  multipileChanged(): void {
    this.selectedCards = [];
    this.multipileChecked = !this.multipileChecked;
    if (this.multipileChecked) {
      this.mixpanelService.track('ActionButtonClicked', {
        Action: 'Show multiple cards',
        'Pack id': this.id,
        'Pack name': this.pack?.name,
      });
    } else {
      this.mixpanelService.track('ActionButtonClicked', {
        Action: 'Show one card',
        'Pack id': this.id,
        'Pack name': this.pack?.name,
      });
    }
  }
  flippedCardwidth: number = 0;

  zoomIn() {
    if (!this.flipped) {
      this.cardWidth += 1;
      this.cardHeight += 1.5; // Adjust proportionally
      this.imageWidth += 16; // Scale by 16px, consistent with 1rem = 16px
      this.imageHeight = this.imageWidth / this.aspectRatio;
      this.containerPadding += 10;
    } else if (this.flipped) {
      this.flippedCardwidth += 30;
    }
  }
  zoomOut() {
    if (!this.flipped) {
      this.cardWidth -= 1;
          this.cardHeight -= 1.5;
          this.imageWidth -= 16;
          this.imageHeight = this.imageWidth / this.aspectRatio;
          this.containerPadding += -10;
    } else if (this.flipped) {
      this.flippedCardwidth -= 30;
    }
  }

  singleCardCheck: boolean = false;
  singleCategoryBaseCard: boolean = false;

  // TODO
  cardSelected(
    card: CardComponent,
    index: number,
    flag: boolean = false,
    category?
  ): void {
    console.log(card, index);
    this.singleCategoryBaseCard = false;
    if (flag) {
      // debugger;
      this.singleCardCheck = true;
      if (this.multipileChecked) {
        if (this.selectedCards.includes(card)) {
          this.selectedCards.splice(
            this.selectedCards.findIndex(
              (existingCard) => existingCard == card
            ),
            1
          );
          card.index = undefined;
        } else {
          if (this.selectedCards.length < 5) this.selectedCards.push(card);
          else {
            this.cardsService._snackBar.open('ניתן לבחור עד 5 קלפים', '', {
              duration: 3000,
              panelClass: ['rtl-snackbar'],
            });
          }
          card.index = index;
          this.selectedIndex = card.index;
        }
      } else {
        this.selectedCards = [card];
        card.index = index;
        this.selectedIndex = card.index;
        this.toggleChosenCardsModal();
      }
    } else {
      this.singleCardCheck = false;
      const obj = {
        card: card,
        index: index,
        category: category || null,
      };

      const exists = this.multiSelectCard.some((item) => {
        if (obj.category !== null) {
          return item.index === obj.index && item.category === obj.category;
        } else {
          return item.index === obj.index && item.category === null;
        }
      });
      if (!exists) {
        this.multiSelectCard.push(obj);
      }
    }
    
      this.categoryScreen = true;
      this.categoryBaseArray = [];

      this.multiSelectCard.forEach((element) => {
        // Check if the category already exists in the categoryBaseArray
        let categoryObj = this.categoryBaseArray.find(
          (category) => category.categoryName === element.category
        );

        if (!categoryObj) {
          // If the category does not exist, create a new one
          categoryObj = {
            categoryName: element.category,
            cards: [],
          };
          this.categoryBaseArray.push(categoryObj);
        }

        // Push the card details into the cards array of the respective category
        categoryObj.cards.push({
          index: element.index,
          backImgUrl: element.card.backImgUrl,
          frontImgUrl: element.card.frontImgUrl,
        });
      });

      console.log(this.categoryBaseArray, 'Category Base Array');
      // Do whatever you need with categoryBaseArray here
    
  }

  categoryBaseCardSelected(
    card: CardComponent,
    index: number,
    flag: boolean = false,
    category?
  ) {
    this.singleCategoryBaseCard = true;
    if (flag) {
      this.categoryScreen = false;
      if (this.multipileChecked) {
        if (this.selectedCards.includes(card)) {
          this.selectedCards.splice(
            this.selectedCards.findIndex(
              (existingCard) => existingCard == card
            ),
            1
          );
          card.index = undefined;
        } else {
          if (this.selectedCards.length < 5) this.selectedCards.push(card);
          else {
            this.cardsService._snackBar.open('ניתן לבחור עד 5 קלפים', '', {
              duration: 3000,
              panelClass: ['rtl-snackbar'],
            });
          }
          card.index = index;
          this.selectedIndex = card.index;
        }
      } else {
        this.selectedCards = [card];
        card.index = index;
        this.selectedIndex = card.index;
        this.toggleChosenCardsModal();
      }
    }
  }

  resetCategoryFooter() {
    console.log(this.categoryBaseArray);

    this.categoryBaseArray = [];
    this.multiSelectCard = [];
    console.log(this.categoryBaseArray);
  }

  // TODO
  removeImage(item: { index: number; category: string | null }): void {
    this.multiSelectCard = this.multiSelectCard.filter((card) => {
      if (item.category !== null) {
        return card.index !== item.index || card.category !== item.category;
      } else {
        return card.index !== item.index;
      }
    });
  }

  removeCategoryBaseImage(index: number, category: string): void {
    this.categoryBaseArray = this.categoryBaseArray.map((cat) => {
      if (cat.categoryName === category) {
        return {
          ...cat,
          cards: cat.cards.filter((card) => card.index !== index),
        };
      }
      return cat;
    });

    this.multiSelectCard = this.multiSelectCard.filter((card) => {
      if (category !== null) {
        return card.index !== index || card.category !== category;
      } else {
        return card.index !== index;
      }
    });
  }

  showAllInDialog() {
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.singleCategoryBaseCard = true;
    if (this.cards.length > 1) {
      this.categoryScreen = true;
      this.categoryBaseArray = [];

      this.multiSelectCard.forEach((element) => {
        // Check if the category already exists in the categoryBaseArray
        let categoryObj = this.categoryBaseArray.find(
          (category) => category.categoryName === element.category
        );

        if (!categoryObj) {
          // If the category does not exist, create a new one
          categoryObj = {
            categoryName: element.category,
            cards: [],
          };
          this.categoryBaseArray.push(categoryObj);
        }

        // Push the card details into the cards array of the respective category
        categoryObj.cards.push({
          index: element.index,
          backImgUrl: element.card.backImgUrl,
          frontImgUrl: element.card.frontImgUrl,
        });
      });

      console.log(this.categoryBaseArray, 'Category Base Array');

      // Do whatever you need with categoryBaseArray here
    } else {
      this.categoryScreen = false;
      this.singleCardCheck = false;
      this.selectedCards = this.multiSelectCard;
    }
    this.toggleChosenCardsModal();
  }

  setAspectRatio(event: Event, card: any) {
    const imgElement = event.target as HTMLImageElement;
    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;

    card.aspectRatio = naturalWidth / naturalHeight;
  }

  shuffle(): void {
    console.log('shuffling');
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Shuffle',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });
    this.selectedCards = [];
    this.cardImages.sort(() => Math.random() - 0.5);
  }

  flip(): void {
    this.flipped = !this.flipped;
    this.selectedCards = [];
    if (this.flipped) {
      this.mixpanelService.track('ActionButtonClicked', {
        Action: 'Flip Back',
        'Pack id': this.id,
        'Pack name': this.pack?.name,
      });
    } else {
      this.mixpanelService.track('ActionButtonClicked', {
        Action: 'Flip Front',
        'Pack id': this.id,
        'Pack name': this.pack?.name,
      });
    }
  }

  sortCardsByCategory(cards: any[]): any[] {
    return cards.sort((a, b) => {
      if (a.category === b.category) {
        return a.index - b.index; // or another property to sort within category
      }
      return a.category.localeCompare(b.category);
    });
  }

  get sortedCards() {

    return this.sortCardsByCategory(this.multiSelectCard);
  }

  // Method to update displayed categories based on multiSelectCard
  updateDisplayedCategories(): void {
    this.displayedCategories.clear();
    this.multiSelectCard.forEach((card) => {
      if (card.category) {
        this.displayedCategories.add(card.category);
      }
    });
  }

  // Check if the category is the first in its list
  isFirstCardOfCategory(item: any, index: number): boolean {
    if (!item.category) return false;

    // Find the first card in the same category
    const firstCardIndex = this.sortedCards.findIndex(
      (card) => card.category === item.category
    );
    console.log('cards', this.multiSelectCard)

    return index === firstCardIndex;
  }

  toggleFlipped(card): void {
    // console.log('flipped card:', card);
    card.flipped = !card.flipped;
    this.flipCard = this.flipCard == 'inactive' ? 'active' : 'inactive';
  }

  rotateCard(card: Card) {
    if (isNaN(card.rotation)) {
      card.rotation = 0;
    }
    card.rotation += 90;
    console.log('card:', card);
  }

  toggleChosenCardsModal(): void {
    if (!this.showSelectedCards) {
      if (
        !this.portraitToLandscapeAlertShown &&
        this.selectedCards.length > 1 &&
        window.matchMedia('(orientation: portrait)').matches
      ) {
        this.portraitToLandscapeAlertShown = true;
        this.openPortraitToLandscapeAlert();
      }
      this.showSelectedCards = true;
      document.body.style.overflow = 'hidden';
    } else {
      this.showSelectedCards = false;
      document.body.style.overflow = '';
      if (!this.multipileChecked) this.selectedCards = [];
    }
  }

  imgClick(event, card: Card): void {
    this.flipCard = this.flipCard == 'inactive' ? 'active' : 'inactive';
    // card.flipped = !card.flipped;
    event.stopPropagation();
    this.cdr.detectChanges(); // manually trigger change detection
  }

  openPortraitToLandscapeAlert(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(PortraitWarningDialogComponent, dialogConfig);
  }

  toggleRandomCardsModal(): void {
    console.log('toggleRandomCardsModal');
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Show random card',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });
    if (this.showRandomCards) {
      this.showRandomCards = false;
    } else {
      this.shuffle();
      this.sleep(500).then(() => {
        this.showRandomCards = true;
      });
    }
  }

  /**
   * Toggle edit pack
   */
  editPack(): void {
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Edit pack',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });
    if (!this.showEditPack) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = new DynamicDialogData(
        'עריכת ערכת קלפים',
        [
          'להסתרת קלף, לחצו על אייקון העין מעליו.',
          'להצגת הקלפים המוסתרים לחצו על איפוס ערכה בתחתית העמוד.',
        ],
        'אישור',
        ''
      );
      this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
      this.showEditPack = true;
      this.showFooterContainer = false; // Hide footer-container
      this.flipped = true;
      this.selectedCards = [];
      console.log('edit pack', this.showEditPack);
    } else {
      this.showEditPack = false;
      this.showFooterContainer = true; // Show footer-container again
      this.flipped = true;
    }
  }

  /**
   * Return all removed cards to the pack
   */

  // cardImages
  resetEditPack(): void {
    this.cardImages = [...this.cardImages, ...this.removedCards];
    this.removedCards = [];
    this.editPack();
  }

  removeCard(index: number): void {
    const removed = this.cardImages.splice(index, 1);
    this.removedCards = [...this.removedCards, ...removed];
  }

  openGuideBook(): void {
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Guide Book',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });
    // debugger
    // console.log('this.pack.guidebookUrl');
    // console.log(this.pack.guidebookUrl);
    if (this.pack.guidebookUrl && this.pack.guidebookUrl != '') {
      window.open(this.pack.guidebookUrl, '_blank');
    } else {
      const modalData: PopoutData = {
        modalName: 'guide-book',
        guideBook: this.pack.guideBook,
        packName: this.pack?.name,
        packDesc: this.pack.description,
        imgUrl: this.pack.imgUrl,
      };
      this.popoutService.openPopoutModal(modalData);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }

  openAboutDialog(): void {
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Show creator info',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '40vw';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = this.pack;
    this.dialog.open(AboutAuthorComponent, dialogConfig);
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
  }

  createCommomLink(): void {
    this.mixpanelService.track('ActionButtonClicked', {
      Action: 'Create Common Link',
      'Pack id': this.id,
      'Pack name': this.pack?.name,
    });

    this.api.MakeCommonLink({ packId: this.id }).then((data) => {
      const url = window.location.href + '?link=' + data;
      this.dialog.open(CopyCommonLinkDialogComponent, {
        data: { linkUrl: url },
      });
    });
  }

  redirect(): void {
    this.mixpanel.track('RedirectToExternalCreator', {
      'Pack ID': this.pack?.id,
      'Pack name': this.pack?.name,
      Link: this.pack?.about.link,
    });
    window.open(this.pack?.about.link, '_blank');
  }

  confirmationDialogue() : void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '50%';
    dialogConfig.data = { redirect: () => this.redirect() }; // Pass the redirect method
    this.dialog.open(confirmationDialogueComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this.popoutService.closePopoutModal();
    this.Subscription.unsubscribe();
  }
}

@Component({
  selector: 'portrait-warning-dialog',
  templateUrl: './portrait-warning-dialog.html',
})
export class PortraitWarningDialogComponent {
  constructor(public dialogRef: MatDialogRef<PortraitWarningDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
