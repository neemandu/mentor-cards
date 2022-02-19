import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { PackContent } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { PackPreviewComponent } from 'src/app/Shared Components/pack/pack-preview/pack-preview.component';

@Component({
  selector: 'app-company-pack-choise',
  templateUrl: './company-pack-choise.component.html',
  styleUrls: ['./company-pack-choise.component.css']
})
export class CompanyPackChoiseComponent implements OnInit {

  allPacks: PackContent[] = [];
  userData: UserData;
  showPackChoise: boolean = false;
  saveDisabled: boolean = true;
  choices: PackContent[] = [];
  amountOfPacksArray: number[] = []; //only for *ngFor
  error: string;

  constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
    public router: Router, private ngZone: NgZone, private api: APIService, private cardsService: CardsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllPacks();
    this.userData = this.userAuthService.userData;
    this.choices = Array.apply(null, Array(this.userData.orgMembership.numberOfallowedCardsPacks)).map(() => undefined);
    this.amountOfPacksArray = Array(this.userData.orgMembership.numberOfallowedCardsPacks).fill(0);
  }

  /**
   * Retrive all packs
   */
  getAllPacks(): void {
    if (this.cardsService.allPacks) {
      this.allPacks = this.cardsService.allPacks.map(pack => pack);
    } else {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      let sub = this.cardsService.allPacksReadyEmmiter.subscribe(() => {
        sub.unsubscribe();
        this.allPacks = this.cardsService.allPacks.map(pack => pack);
        this.overlaySpinnerService.changeOverlaySpinner(false);
      })
      this.cardsService.getAllPacks();
    }
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
  }

  choiseDisabled(pack: PackContent): boolean {
    return this.choices.includes(pack);
  }

  selectionChanged(): void {
    this.saveDisabled = false;
    this.choices.forEach(choise => {
      if (!choise)
        this.saveDisabled = true;
    })
  }

  openPreviewDialog(pack: PackContent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '85vw';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.data = pack;
    this.dialog.open(PackPreviewComponent, dialogConfig);
  }

  saveSelectedchoices(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("שמירת ערכות קלפים", ["לשמור ערכות אלו?", "לאחר לחיצה על אישור לא יהיה ניתן לשנות את ערכות הקלפים הנבחרות"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        const ids: string[] = this.choices.map(choise => choise.id)
        this.api.UpdateSelectedCardPacks({ cardsPacksIds: ids })
          .then(res => {
            this.openRedirectDialog();
            this.overlaySpinnerService.changeOverlaySpinner(false);
          })
          .catch(error => {
            this.handleErrors(error.errors[0].message);
            this.overlaySpinnerService.changeOverlaySpinner(false);
          })
      }
    });
  }

  openRedirectDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ערכות הקלפים הנבחרות עודכנו בהצלחה", ["המשך עבודה נעימה!"], "אישור", "")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
      this.navigate('/all-packs-page');
      window.location.reload();
    });
  }

  handleErrors(errorMsg: string): void {
    if (errorMsg.toLowerCase().startsWith("user does not belong to any organization")) {
      this.error = 'אינכם שייכים לאף ארגון'
      this.saveDisabled = true;
      this.cardsService._snackBar.open('אינכם שייכים לאף ארגון, אתם מועברים לעמוד כל ערכות הקלפים', '', {
        duration: 3000,
      });
      setTimeout(() => { this.navigate('/all-packs-page') }, 3000);
    }
    else if (errorMsg.toLowerCase().startsWith("user already submitted card packs")) {
      this.error = 'בחרתם כבר ערכות קלפים בעבר'
      this.saveDisabled = true;
      this.cardsService._snackBar.open('בחרתם כבר ערכות קלפים בעבר, אתם מועברים לעמוד כל ערכות הקלפים', '', {
        duration: 3000,
      });
      setTimeout(() => { this.navigate('/all-packs-page') }, 3000);
    }
  }

}
