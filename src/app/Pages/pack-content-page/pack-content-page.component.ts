import { ApplicationRef, Component, ComponentFactoryResolver, Injector, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { CardComponent } from 'src/app/Shared Components/card/card.component';
import { CardsRevealDialogComponent } from './cards-reveal-dialog/cards-reveal-dialog.component';
import { RandomCardRevealDialogComponent } from './random-card-reveal-dialog/random-card-reveal-dialog.component';
import * as exampleCards from '../../../assets/Bundle Configurations/ExmaplePack.json';
import { PopoutService } from 'src/app/Services/popout.service';
import { UserData } from 'src/app/Objects/user-related';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pack-content-page',
  templateUrl: './pack-content-page.component.html',
  styleUrls: ['./pack-content-page.component.css']
})
export class PackContentPageComponent implements OnInit, OnDestroy {

  Subscription: Subscription = new Subscription();
  id: any;
  pack: PackContent;
  selectedCards: any[] = []
  loadedCards: number = 0;
  flipped: boolean = false;
  multipileChecked: boolean = false;
  showGuideBook: boolean = false;
  userData: UserData;

  constructor(public route: ActivatedRoute, private cardsService: CardsService, public dialog: MatDialog,
    private overlaySpinnerService: OverlaySpinnerService, private api: APIService, public popoutService: PopoutService,
    public componentFactoryResolver: ComponentFactoryResolver, private router: Router, private userAuthService: UserAuthService, private ngZone: NgZone) {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.Subscription.add(this.userAuthService.signedOutEmmiter.subscribe(() => {
      this.userData = undefined;
    }));
    this.userData = this.userAuthService.userData;
    this.overlaySpinnerService.changeOverlaySpinner(true);
  }

  ngOnInit(): void {
    if (this.id) {//a specific pack
      // console.log("cardsService.allPacks:  " + this.cardsService.allPacks);
      if (this.cardsService.allPacks) {
        this.pack = this.cardsService.allPacks.find(pack => pack.id === this.id)
        // console.log("file: pack-content-page.component.ts ~ line 36 ~ ngOnInit ~ this.pack", this.pack)
      }
      else {
        // console.log("GetCardsPack:  " + this.id);
        this.api.GetCardsPack(this.id).then(pack => {
          this.pack = new PackContent().deseralize(pack);
          // console.log("ngOnInit -> this.pack", this.pack)
        }, reject => {
          console.log("file: pack-content-page.component.ts ~ line 86 ~ this.api.GetCardsPack ~ reject", reject)
          this.overlaySpinnerService.changeOverlaySpinner(false);
        })
      }
    }
    else {//example pack
      // console.log(exampleCards['default'])
      this.pack = new PackContent().deseralize(exampleCards['default'])
    }
  }

  multipileChanged(): void {
    this.selectedCards = [];
    // this.flipped = false;
  }

  cardSelected(card: CardComponent, index: number): void {
    if (this.multipileChecked) {
      if (this.selectedCards.includes(card)) {
        this.selectedCards.splice(this.selectedCards.findIndex(existingCard => existingCard == card), 1)
        card.index = undefined;
      }
      else {
        if (this.selectedCards.length < 5)
          this.selectedCards.push(card)
        else {
          this.cardsService._snackBar.open('ניתן לבחור עד 5 קלפים', '', {
            duration: 3000,
            panelClass: ['rtl-snackbar']
          });
        }
        card.index = index;
      }
    }
    else {
      this.selectedCards.push(card);
      card.index = index;
      this.openChosenCardsModal();
    }
  }

  shuffle(): void {
    this.selectedCards = [];
    this.pack.cards.sort(() => Math.random() - 0.5);
  }

  openChosenCardsModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.data = this.selectedCards;
    const dialogRef = this.dialog.open(CardsRevealDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
      if (!this.multipileChecked)
        this.selectedCards = [];
    });
  }

  openRandomCardsModal(): void {
    if (this.flipped) {
      this.flipped = !this.flipped
    }
    this.shuffle();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.data = this.pack.cards;
    this.sleep(800).then(() => {
      const dialogRef = this.dialog.open(RandomCardRevealDialogComponent, dialogConfig);
      var dialogSub = dialogRef.afterClosed().subscribe(() => {
        dialogSub.unsubscribe();
      });
    });
  }

  openGuideBook(): void {
    // debugger
    const modalData = {
      modalName: 'guide-book',
      guideBook: this.pack.guideBook,
      packName: this.pack.name
    };
    this.popoutService.openPopoutModal(modalData);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cardLoaded(): void {
    this.loadedCards++;
    if (this.loadedCards == this.pack.cards.length) {
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
  }

  ngOnDestroy(): void {
    this.popoutService.closePopoutModal();
    this.Subscription.unsubscribe();
  }
}
