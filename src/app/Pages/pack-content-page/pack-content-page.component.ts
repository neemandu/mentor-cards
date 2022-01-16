import { Component, ComponentFactoryResolver, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { PackContent } from 'src/app/Objects/packs';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { CardComponent } from 'src/app/Shared Components/card/card.component';
// import { CardsRevealDialogComponent } from './cards-reveal-dialog/cards-reveal-dialog.component';
// import { RandomCardRevealDialogComponent } from './random-card-reveal-dialog/random-card-reveal-dialog.component';
import * as exampleCards from '../../../assets/Bundle Configurations/ExmaplePack.json';
import { PopoutData, PopoutService } from 'src/app/Services/popout.service';
import { UserData } from 'src/app/Objects/user-related';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { Subscription } from 'rxjs';
import { AboutAuthorComponent } from 'src/app/Shared Components/pack/about-author/about-author.component';
import { Card } from 'src/app/Objects/card';

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
  showSelectedCards: boolean = false;
  showRandomCards: boolean = false;
  portraitToLandscapeAlertShown: boolean = false;

  randomSelectedCard: Card;
  randomCardIndex: number = 0;

  constructor(public route: ActivatedRoute, private cardsService: CardsService, public dialog: MatDialog,
    private overlaySpinnerService: OverlaySpinnerService, private api: APIService, public popoutService: PopoutService,
    public componentFactoryResolver: ComponentFactoryResolver, private router: Router, private userAuthService: UserAuthService, private ngZone: NgZone) {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.userAuthService.userDataEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
    })
    this.userData = this.userAuthService.userData;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    if (this.id) {//a specific pack
      if (this.cardsService.allPacks) {
        this.pack = this.cardsService.allPacks.find(pack => pack.id === this.id)
      }
      else {
        this.api.GetCardsPack(this.id).then(pack => {
          this.pack = new PackContent().deseralize(pack);
        }, reject => {
          console.log("file: pack-content-page.component.ts ~ line 86 ~ this.api.GetCardsPack ~ reject", reject)
          this.overlaySpinnerService.changeOverlaySpinner(false);
        })
      }
    }
    else {//example pack
      this.pack = new PackContent().deseralize(exampleCards['default'])
    }
  }

  multipileChanged(): void {
    this.selectedCards = [];
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
      this.selectedCards = [card];
      card.index = index;
      this.toggleChosenCardsModal();
    }
  }

  shuffle(): void {
    this.selectedCards = [];
    this.pack.cards.sort(() => Math.random() - 0.5);
  }

  toggleChosenCardsModal(): void {
    if (!this.showSelectedCards) {
      if (!this.portraitToLandscapeAlertShown && this.selectedCards.length > 1 && window.matchMedia("(orientation: portrait)").matches) {
        this.portraitToLandscapeAlertShown = true;
        this.openPortraitToLandscapeAlert();
      }
      this.showSelectedCards = true;
    }
    else {
      this.showSelectedCards = false;
      if (!this.multipileChecked)
        this.selectedCards = [];
    }
  }

  openPortraitToLandscapeAlert(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(PortraitWarningDialogComponent, dialogConfig);
  }

  // openChosenCardsModal(): void {
  //   this.showSelectedCards = true;
  //   // const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.disableClose = true;
  //   // dialogConfig.autoFocus = true;
  //   // dialogConfig.maxHeight = '85vh';
  //   // dialogConfig.minHeight = '40vh';
  //   // dialogConfig.data = this.selectedCards;
  //   // const dialogRef = this.dialog.open(CardsRevealDialogComponent, dialogConfig);
  //   // var dialogSub = dialogRef.afterClosed().subscribe(() => {
  //   //   dialogSub.unsubscribe();
  //   //   if (!this.multipileChecked)
  //   //     this.selectedCards = [];
  //   // });
  //   // var modal = document.getElementById("myModal");
  //   // modal.style.display = "block";

  //   // Get the button that opens the modal
  //   // var btn = document.getElementById("myBtn");

  //   // Get the <span> element that closes the modal
  //   // var span = document.getElementsByClassName("close")[0];

  //   // When the user clicks the button, open the modal 
  //   // btn.onclick = function () {
  //   // }

  //   // When the user clicks on <span> (x), close the modal
  //   // span.onclick = function () {
  //   //   modal.style.display = "none";
  //   // }

  //   // When the user clicks anywhere outside of the modal, close it
  //   // window.onclick = function (event) {
  //   //   if (event.target == modal) {
  //   //     modal.style.display = "none";
  //   //   }
  //   // }
  // }

  // closeChosenCardsModal(): void {
  //   this.showSelectedCards = false;
  //   if (!this.multipileChecked)
  //     this.selectedCards = [];
  // }

  toggleRandomCardsModal(): void {
    if (this.showRandomCards) {
      this.showRandomCards = false;
    }
    else {
      this.shuffle();
      this.sleep(500).then(() => { this.showRandomCards = true; });
    }
  }

  // openRandomCardsModal(): void {
  //   this.shuffle();
  //   this.showRandomCards = true;
  //   // if (this.flipped) {
  //   //   this.flipped = !this.flipped
  //   // }
  //   // this.shuffle();
  //   // const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.disableClose = true;
  //   // dialogConfig.autoFocus = true;
  //   // // dialogConfig.maxHeight = '90vh';
  //   // dialogConfig.data = this.pack.cards;
  //   // this.sleep(800).then(() => {
  //   //   const dialogRef = this.dialog.open(RandomCardRevealDialogComponent, dialogConfig);
  //   //   var dialogSub = dialogRef.afterClosed().subscribe(() => {
  //   //     dialogSub.unsubscribe();
  //   //   });
  //   // });
  // }

  // closeRandomCardsModal(): void {
  //   this.showRandomCards = false;
  // }

  openGuideBook(): void {
    // debugger
    const modalData: PopoutData = {
      modalName: 'guide-book',
      guideBook: this.pack.guideBook,
      packName: this.pack.name,
      packDesc: this.pack.description
    };
    this.popoutService.openPopoutModal(modalData);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // cardLoaded(): void {
  //   // this.loadedCards++;
  //   // if (this.loadedCards == this.pack.cards.length) {
  //   //   this.overlaySpinnerService.changeOverlaySpinner(false);
  //   // }
  //   this.overlaySpinnerService.changeOverlaySpinner(false);
  // }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }

  openAboutDialog(): void {
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

  constructor(
    public dialogRef: MatDialogRef<PortraitWarningDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
