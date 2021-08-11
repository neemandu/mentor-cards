import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { APIService, changeCardsPackInput } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { PackInfo } from 'src/app/Objects/packs';
import { ProgramChoiseDialogComponent } from 'src/app/Pages/no-program-page/program-choise-dialog/program-choise-dialog.component';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from '../../Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { AboutAuthorComponent } from '../about-author/about-author.component';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PackInfo, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog,
    private userAuthService: UserAuthService, private api: APIService, private overlaySpinnerService: OverlaySpinnerService, 
    private cardsService: CardsService, public router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    // console.log("🚀 ~ file: pack-preview.component.ts ~ line 21 ~ PackPreviewComponent ~ data", this.data)
  }

  choosePack(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.api.AddCardsPack({ "cardsPackId": this.data.id }).then(value => {
      this.dialogRef.close(value);
      // console.log("🚀 ~ file: cards.service.ts ~ line 60 ~ CardsService ~ returnthis.api.AddCardsPack ~ value", value)
    }, reject => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      console.log("🚀 ~ file: cards.service.ts ~ line 63 ~ CardsService ~ returnthis.api.AddCardsPack ~ reject", reject)
    })
  }

  get choosePackButtonVisible() {
    return this.userAuthService.userData.subscription.subscriptionPlan.numberOfCardPacks == -1 ||
      this.userAuthService.userData.numberOfUsedPacks < this.userAuthService.userData.subscription.subscriptionPlan.numberOfCardPacks;
  }

  get exchangePackButtonVisible() {
    return (!this.userAuthService.userData.lastPackSubstitutionDate ||
      new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime())
  }

  get nextPackSubstitutionDate() {
    return new Date(new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth);
  }

  /**
   * return true if user has 0 packs selected so far
   */
  get exchangePackButtonVisibleNothingToChange() {
    return this.userAuthService.userData.numberOfUsedPacks == 0;
  }

  get noChangingProgramThisMonth() {
    return this.userAuthService.userData && this.userAuthService.userData.status === 'PLAN' && this.userAuthService.planChangedThisMonth;
  }

  get upgradePackButtonVisible() {
    return !this.userAuthService.userData.lastPlanSubstitutionDate ||
      new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ||
      this.userAuthService.userData.numberOfPlansSubstitutions == 1
  }

  get currentPacksOwned() {
    return this.cardsService.allPacks.filter(pack => pack.cards.length !== 0);
    // return this.userAuthService.userData.numberOfUsedPacks;
  }

  get signedIn() {
    return this.userAuthService.userData;
  }
  
  get hasProgram() {
    return this.userAuthService.userData.subscription;
  }

  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

  openExchangePackApprovalModal(pack): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData('החלפת ערכות',[ 'ערכת `' + pack.description + '` תוחלף בערכת `' + this.data.description + '`','שימו לב - ניתן להחליף ערכת קלפים אחת פעם בחודש בהתאם למועד החיוב'], 'אישור', 'ביטול')
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        var packChange: changeCardsPackInput = { "oldCardsPackId": pack.id, "newCardsPackId": this.data.id };
        this.api.ChangeCardsPack(packChange).then(value => {
          this.dialogRef.close(true);
        }, reject => {
          this.overlaySpinnerService.changeOverlaySpinner(false);
          console.log("🚀 ~ file: pack-preview.component.ts ~ line 95 ~ PackPreviewComponent ~ this.api.ChangeCardsPack ~ reject", reject)
        })
      }
    });
  }

  openAboutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '30vw';
    dialogConfig.data = this.data;
    this.dialog.open(AboutAuthorComponent, dialogConfig);
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}