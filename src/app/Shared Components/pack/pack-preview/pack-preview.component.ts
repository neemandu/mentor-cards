import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PackContent, PackInfo } from 'src/app/Objects/packs';
import { UserData } from 'src/app/Objects/user-related';
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
  trialPeriodDate: Date | null;
  userData: UserData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog,
    private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.trialPeriodDate = this.userAuthService.getTrialPeriodExpDate();
    this.userData = this.userAuthService.userData;
    // console.log("🚀 ~ file: pack-preview.component.ts ~ line 21 ~ PackPreviewComponent ~ data", this.data)
  }

  // choosePack(): void {
  //   this.overlaySpinnerService.changeOverlaySpinner(true);
  //   this.api.AddCardsPack({ "cardsPackId": this.data.id }).then(value => {
  //     this.dialogRef.close(value);
  //     // console.log("🚀 ~ file: cards.service.ts ~ line 60 ~ CardsService ~ returnthis.api.AddCardsPack ~ value", value)
  //   }, reject => {
  //     this.overlaySpinnerService.changeOverlaySpinner(false);
  //     console.log("🚀 ~ file: cards.service.ts ~ line 63 ~ CardsService ~ returnthis.api.AddCardsPack ~ reject", reject)
  //   })
  // }

  // get choosePackButtonVisible() {
  //   return this.userAuthService.userData.subscription.subscriptionPlan.numberOfCardPacks == -1 ||
  //     this.userAuthService.userData.numberOfUsedPacks < this.userAuthService.userData.subscription.subscriptionPlan.numberOfCardPacks;
  // }

  // get exchangePackButtonVisible() {
  //   return (!this.userAuthService.userData.lastPackSubstitutionDate ||
  //     new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime())
  // }

  // get nextPackSubstitutionDate() {
  //   return new Date(new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth);
  // }

  // get exchangePackButtonVisibleNothingToChange() {
  //   return this.userAuthService.userData.numberOfUsedPacks == 0;
  // }

  // get noChangingProgramThisMonth() {
  //   return this.userAuthService.userData && this.userAuthService.userData.status === 'PLAN' && this.userAuthService.planChangedThisMonth;
  // }

  // get upgradePackButtonVisible() {
  //   return !this.userAuthService.userData.lastPlanSubstitutionDate ||
  //     new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ||
  //     this.userAuthService.userData.numberOfPlansSubstitutions == 1
  // }

  // get currentPacksOwned() {
  //   return this.cardsService.allPacks.filter(pack => pack.cards.length !== 0);
  //   // return this.userAuthService.userData.numberOfUsedPacks;
  // }

  // get signedIn() {
  //   return this.userAuthService.userData;
  // }

  // get hasProgram() {
  //   return this.userAuthService.userData.subscription;
  // }


  // openChooseProgramModal(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
  //   var dialogSub = dialogRef.afterClosed().subscribe(res => {
  //     dialogSub.unsubscribe();
  //     if (res) {
  //       this.dialogRef.close(true);
  //     }
  //   });
  // }

  // openExchangePackApprovalModal(pack): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = new DynamicDialogData('החלפת ערכות', ['ערכת `' + pack.description + '` תוחלף בערכת `' + this.data.description + '`', 'שימו לב - ניתן להחליף ערכת קלפים אחת פעם בחודש בהתאם למועד החיוב'], 'אישור', 'ביטול')
  //   const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
  //   var dialogSub = dialogRef.afterClosed().subscribe(res => {
  //     dialogSub.unsubscribe();
  //     if (res) {
  //       this.overlaySpinnerService.changeOverlaySpinner(true);
  //       var packChange: changeCardsPackInput = { "oldCardsPackId": pack.id, "newCardsPackId": this.data.id };
  //       this.api.ChangeCardsPack(packChange).then(value => {
  //         this.dialogRef.close(true);
  //       }, reject => {
  //         this.overlaySpinnerService.changeOverlaySpinner(false);
  //         console.log("🚀 ~ file: pack-preview.component.ts ~ line 95 ~ PackPreviewComponent ~ this.api.ChangeCardsPack ~ reject", reject)
  //       })
  //     }
  //   });
  // }

  // get trialPeriodExpDate() {
  //   return this.userAuthService.trialPeriodExpDate;
  // }

  openAboutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxWidth = '40vw';
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

export interface previewData {
  pack: PackContent | PackInfo;
  showButtons: boolean;
}