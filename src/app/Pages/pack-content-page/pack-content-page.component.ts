import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
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

@Component({
  selector: 'app-pack-content-page',
  templateUrl: './pack-content-page.component.html',
  styleUrls: ['./pack-content-page.component.css'],
})
export class PackContentPageComponent implements OnInit, OnDestroy {
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
  removedCards: Card[] = [];
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
  panelCards: Array<any> = [];


  // For DropDown
  isDropdownOpen = false;
  selectedOption: string | null = null;
  isEditing = false;
  isEditingOption: number | null = null;
  selectedIndex: number ;

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
      { text: 'בחר קלף המהווה עבורך רגע בחיים שהיית רוצה לחזור אליו. מה ההרגשה המיוחדת שהייתה ברגע הזה? מה למדת ממנו?' },
      { text: 'תיחת מפגש: התבונן בתמונות מהטבע ובחר אתמזג האוויר איתו אתה מגיע למפגש היום' },
      { text: 'סיג האוויר איתו אתה יוצא מהפגישה שלנו.' },
      { text: 'אין צורך בשאלה, אני אקח את זה מכאן' },
      { text: 'אני רוצה לכתוב שאלה משלי!' },
      { 
        text: 'אשמח לראות את ספר ההדרכה לעוד רעיונות לשאלות', 
        icon: '/assets/New/pack-view/book-icon.svg' 
      }
    ];
    
    // Method For Trigger
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

  // Update selectOption method
  selectOption(option: { text: string; icon?: string }, index: number) {

    const lastOption = this.options[this.options.length - 1];
    if (option === lastOption) {
      this.openGuideBook();
    }

    if (index === this.options.length - 2) {

      // Make only the second-to-last option editable
      this.isEditing = true;
      this.isEditingOption = index;

      // Set the selected option for display and editing
      this.selectedOption = option.text;
    } else {
      this.selectedOption = option.text;
      this.isDropdownOpen = false;
      this.isEditing = false;
      this.isEditingOption = null;
    }
  }


  // Method to save the edited option
  saveEdit(option: { text: string }, index: number) {
    if (this.isEditing && this.isEditingOption === index) {
      // Get the editable content
      const editedText = (document.querySelector('.dropdown-option[contentEditable="true"]') as HTMLElement)?.textContent?.trim();

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

  downloadImage(imageUrl: string ) {
    const filename = 'mentor-cards';
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    
    // Trigger a click event on the link element
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Simulate a click event to trigger the download
    document.body.removeChild(link); // Remove the link from the document
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
  }


  loadPack(): void {
    this.isLoading = true;
    this.error = null;

    if (this.cardsService.allPacks) {
      this.setPack(
        this.cardsService.allPacks.find((pack) => pack.id === this.id)
      );
      console.log('loading pack from service');
    } else {
      console.log('fetching pack');
      console.log('this.id', this.id);
      console.log('this.commonLink', this.commonLink);
      this.setPack(
        this.cardsService.allPacks.find((pack) => pack.id === this.id)
      );
    }
  }


  setPack(pack: PackContent | undefined): void {
    if (pack) {
      this.pack = pack;
      this.cards = [...this.pack.cards];
      this.cardImages = this.pack.cards[0]?.cardsImages || [];
      this.isDoubleSided = this.cardImages[0]?.backImgUrl ? true : false;
      this.unauthorized = this.pack.cards.length === 0;
      console.log(this.cardImages)
    } else {
      this.error = 'Pack not found';
    }
    this.isLoading = false;
    this.overlaySpinnerService.changeOverlaySpinner(false);
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
    // card.isPortrait = isPortrait;
    // console.log(card,'card')
    // console.log(`Card at ${card.frontImgUrl} is ${isPortrait ? 'portrait' : 'landscape'}`);
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

  cardSelected(card: CardComponent, index: number): void {
    if (this.multipileChecked) {
      if (this.selectedCards.includes(card)) {
        this.selectedCards.splice(
          this.selectedCards.findIndex((existingCard) => existingCard == card),
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
    if (this.selectedCards.length > 0) {
      this.selectedCards.forEach(element => {
        if (!this.panelCards.includes(element)) {
          this.panelCards.push(element);
        }
      });
      console.log(this.panelCards);
    }
  }
  removeCardFromPanel(card: CardComponent): void {
    this.panelCards.splice(this.panelCards.findIndex((cardToRemove) => cardToRemove == card), 1);

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

  toggleFlipped(card): void {
    // console.log('flipped card:', card);
    card.flipped = !card.flipped;
    this.flipCard = this.flipCard == 'inactive' ? 'active' : 'inactive';
  }

  rotateCard(card: Card) {
    // card.rotation = (card.rotation + 90) % 360; // This will rotate the card 90 degrees clockwise on each click
    // console.log('rotation:', card.rotation);
    // console.log('card:', card);
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
    } else {
      this.showSelectedCards = false;
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
      this.flipped = true;
      this.selectedCards = [];
    } else {
      this.showEditPack = false;
      this.flipped = true;
    }
  }

  /**
   * Return all removed cards to the pack
   */
  resetEditPack(): void {
    this.cards = [...this.cards, ...this.removedCards];
    this.removedCards = [];
    this.editPack();
  }

  removeCard(index: number): void {
    const removed = this.cards.splice(index, 1);
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
