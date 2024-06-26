import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
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
import { Card } from 'src/app/Objects/card';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { CopyCommonLinkDialogComponent } from 'src/app/Pages/pack-content-page/copy-common-link-dialog-component/copy-common-link-dialog-component.component';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pack-content-page',
  templateUrl: './pack-content-page.component.html',
  styleUrls: ['./pack-content-page.component.css']
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
  unauthorized: boolean = false;
  isDoubleSided: boolean = false;
  isLoaded: boolean = false;
  randomSelectedCard: Card;
  randomCardIndex: number = 0;
  commonLink: any = undefined;
  flipCard: string = 'inactive';
  rotation:number = 0;
  isMobile: boolean = false;

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
    private http: HttpClient
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
    });
    this.userData = this.userAuthService.userData;
  }
  onRightClick(): boolean {
    return false;
  }
  ngOnInit(): void {

    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobile = true;
    }
    this.route.queryParams.subscribe(params => {
      this.commonLink = params['link'];
      console.log('link:', this.commonLink);
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
    if (this.cardsService.allPacks) {
      this.pack = this.cardsService.allPacks.find(
        (pack) => pack.id === this.id
      );
      this.cards = [...this.pack.cards];

      this.cards.forEach((card) => {
        this.checkCardOrientation(card);
      })
      console.log('cards in packs conent:', this.cards);
      if(!this.pack.cards[0].backImgUrl){
        this.isDoubleSided = false;
      }
      else if(this.pack.cards[0].backImgUrl == this.pack.cards[1].backImgUrl){
        this.isDoubleSided = false;
      }
      else{
        this.isDoubleSided = true;
      }
      console.log('hi111');
      this.mixpanelService.track("PageViewed", { 'Page Title': 'pack-content-page', 'Pack id': this.id, 'Pack name': this.pack?.name });
    } else {
      this.api.GetCardsPack(this.id, this.commonLink).then(
        (pack) => {
          console.log('hi');
          this.pack = new PackContent().deseralize(pack);
          this.isDoubleSided = pack.cards[0].backImgUrl ? true : false;
          if(this.pack.cards.length == 0){
            this.unauthorized = true;
          }
          this.cards = [...this.pack.cards];
          this.isLoaded = true;
          
          this.overlaySpinnerService.changeOverlaySpinner(false);
          this.mixpanelService.track("PageViewed", { 'Page Title': 'pack-content-page', 'Pack id': this.id, 'Pack name': this.pack?.name });
        },
        (reject) => {
          this.isLoaded = true;
          
          console.log('errrror');
          console.log(
            'file: pack-content-page.component.ts ~ line 96 ~ this.api.GetCardsPack ~ reject',
            reject
          );
          this.overlaySpinnerService.changeOverlaySpinner(false);
        }
      );
    }
    // track events
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }, 300);

    
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
    const isPortrait = await this.checkIfImageIsPortrait(card.frontImgUrl);
    card.isPortrait = isPortrait;
    console.log(card,'card')
    // console.log(`Card at ${card.frontImgUrl} is ${isPortrait ? 'portrait' : 'landscape'}`);
  }

  changeRandomCard(b){
    this.randomCardIndex = this.randomCardIndex + b;
  }
  multipileChanged(): void {
    this.selectedCards = [];
    this.multipileChecked = !this.multipileChecked;
    if(this.multipileChecked){
      this.mixpanelService.track("ActionButtonClicked", {"Action" : "Show multiple cards", 'Pack id': this.id, 'Pack name': this.pack?.name });
    }
    else{
      this.mixpanelService.track("ActionButtonClicked", {"Action" : "Show one card", 'Pack id': this.id, 'Pack name': this.pack?.name });
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
      }
    } else {
      this.selectedCards = [card];
      card.index = index;
      this.toggleChosenCardsModal();
    }
  }

  shuffle(): void {
    this.mixpanelService.track("ActionButtonClicked", { "Action": "Shuffle", 'Pack id': this.id, 'Pack name': this.pack?.name });
    this.selectedCards = [];
    this.cards.sort(() => Math.random() - 0.5);
  }

  flip(): void{
    this.flipped = !this.flipped; this.selectedCards = [];
    if(this.flipped){
      this.mixpanelService.track("ActionButtonClicked", {"Action" : "Flip Back", 'Pack id': this.id, 'Pack name': this.pack?.name });
    }
    else{
      this.mixpanelService.track("ActionButtonClicked", {"Action" : "Flip Front", 'Pack id': this.id, 'Pack name': this.pack?.name });
    }
  }

  toggleFlipped(card): void {
    console.log('flipped card:', card);
    card.flipped = !card.flipped;
    this.flipCard = (this.flipCard == 'inactive') ? 'active' : 'inactive';
  }


  rotateCard(card: Card) {
    card.rotation = (card.rotation + 90) % 360; // This will rotate the card 90 degrees clockwise on each click
    console.log('rotation:', card.rotation);
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
    } else {
      this.showSelectedCards = false;
      if (!this.multipileChecked) this.selectedCards = [];
    }
  }

  imgClick(event, card: Card): void {
    this.flipCard = (this.flipCard == 'inactive') ? 'active' : 'inactive';
    card.flipped = !card.flipped;
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
    this.mixpanelService.track("ActionButtonClicked", { "Action": "Show random card", 'Pack id': this.id, 'Pack name': this.pack?.name });
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
    this.mixpanelService.track("ActionButtonClicked", { "Action": "Edit pack", 'Pack id': this.id, 'Pack name': this.pack?.name });
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
    this.mixpanelService.track("ActionButtonClicked", { "Action" : "Guide Book", 'Pack id': this.id, 'Pack name': this.pack?.name });
    // debugger
    console.log('this.pack.guidebookUrl');
    console.log(this.pack.guidebookUrl);
    if(this.pack.guidebookUrl && this.pack.guidebookUrl != ""){
      
      window.open(this.pack.guidebookUrl, '_blank');
    }
    else{
      const modalData: PopoutData = {
        modalName: 'guide-book',
        guideBook: this.pack.guideBook,
        packName: this.pack?.name,
        packDesc: this.pack.description,
        imgUrl: this.pack.imgUrl
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
    
    this.mixpanelService.track("ActionButtonClicked", { "Action": "Show creator info", 'Pack id': this.id, 'Pack name': this.pack?.name });
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
    this.mixpanelService.track("ActionButtonClicked", { "Action": "Create Common Link", 'Pack id': this.id, 'Pack name': this.pack?.name });
    
    this.api.MakeCommonLink({packId:this.id}).then(data => {
      const url = window.location.href + "?link=" + data;
      this.dialog.open(CopyCommonLinkDialogComponent, {
        data: { linkUrl: url }
      });
    })
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