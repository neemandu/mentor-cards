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
import { Platform } from '@angular/cdk/platform';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { HttpClient } from '@angular/common/http';
import { PackContent } from 'src/app/Objects/packs';

@Component({
  selector: 'app-pack-content-page-new',
  templateUrl: './pack-content-page-new.component.html',
  styleUrls: ['./pack-content-page-new.component.css'],
})
export class PackContentPageNewComponent implements OnInit {
  id: string;
  Subscription: Subscription = new Subscription();
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
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadPack();
    });

    console.log('id', this.id);

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
    if (this.cardsService.allPacks) {
      this.pack = this.cardsService.allPacks.find(
        (pack) => pack.id === this.id
      );

      console.log('pack:', this.pack);
      this.cards = [...this.pack.cards];

      this.cardImages = this.pack.cards[0].cardsImages;

      // this.cards.forEach((card) => {
      //   this.checkCardOrientation(card);
      // });
      console.log('cards in packs conent:', this.cards);
      if (!this.pack.cards[0].cardsImages[0].backImgUrl) {
        this.isDoubleSided = false;
      } else if (
        this.pack.cards[0].cardsImages[0].backImgUrl ==
        this.pack.cards[1].cardsImages[0].backImgUrl
      ) {
        this.isDoubleSided = false;
      } else {
        this.isDoubleSided = true;
      }
      // console.log('hi111');
      this.mixpanelService.track('PageViewed', {
        'Page Title': 'pack-content-page',
        'Pack id': this.id,
        'Pack name': this.pack?.name,
      });
    } else {
      console.log('this.commonLink', this.commonLink);
      this.api.GetCardsPack(this.id, this.commonLink).then(
        (pack) => {
          console.log('this.api.GetCardsPac');
          // console.log('hi');
          this.pack = new PackContent().deseralize(pack);
          this.isDoubleSided = pack.cards[0].cardsImages[0].backImgUrl
            ? true
            : false;
          if (this.pack.cards.length == 0) {
            this.unauthorized = true;
          }
          this.cards = [...this.pack.cards];
          this.isLoaded = true;

          this.overlaySpinnerService.changeOverlaySpinner(false);
          this.mixpanelService.track('PageViewed', {
            'Page Title': 'pack-content-page',
            'Pack id': this.id,
            'Pack name': this.pack?.name,
          });
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

  private loadPack() {
    this.api.GetCardsPack(this.id, this.commonLink).then(
      (pack) => {
        console.log('this.api.GetCardsPac 2');
        // console.log('hi');
        this.pack = new PackContent().deseralize(pack);
        this.isDoubleSided = pack.cards[0].cardsImages[0].backImgUrl
          ? true
          : false;
        if (this.pack.cards.length == 0) {
          this.unauthorized = true;
        }
        this.cards = [...this.pack.cards];
        this.isLoaded = true;

        this.overlaySpinnerService.changeOverlaySpinner(false);
        this.mixpanelService.track('PageViewed', {
          'Page Title': 'pack-content-page',
          'Pack id': this.id,
          'Pack name': this.pack?.name,
        });
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
}
