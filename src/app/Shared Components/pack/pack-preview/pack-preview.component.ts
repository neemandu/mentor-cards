import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService, changeCardsPackInput } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { ProgramChoiseDialogComponent } from 'src/app/Pages/no-program-page/program-choise-dialog/program-choise-dialog.component';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from '../../Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog,
    private userAuthService: UserAuthService, private api: APIService, private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit(): void {
    // console.log("🚀 ~ file: pack-preview.component.ts ~ line 21 ~ PackPreviewComponent ~ data", this.data)
  }

  choosePack(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.api.AddCardsPack({ "cardsPackId": this.data.id }).then(value => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.dialogRef.close(value);
      window.location.reload();
      // console.log("🚀 ~ file: cards.service.ts ~ line 60 ~ CardsService ~ returnthis.api.AddCardsPack ~ value", value)
    }, reject => {
      this.overlaySpinnerService.changeOverlaySpinner(false);
      console.log("🚀 ~ file: cards.service.ts ~ line 63 ~ CardsService ~ returnthis.api.AddCardsPack ~ reject", reject)
    })
  }

  exchangePack(): void {

  }

  get choosePackButtonVisible() {
    return this.userAuthService.userData.cardsPacks.items.length < this.userAuthService.userData.subscription.subscriptionPlan.numberOfCardPacks;
  }

  get exchangePackButtonVisible() {
    return this.userAuthService.userData.cardsPacks.items.length != 0 && (!this.userAuthService.userData.lastPackSubstitutionDate ||
      new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime())
  }

  get upgradePackButtonVisible() {
    return !this.userAuthService.userData.lastPlanSubstitutionDate ||
      new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ||
      this.userAuthService.userData.numberOfPlansSubstitutions == 1
  }

  get currentPacksOwned() {
    return this.userAuthService.userData.cardsPacks.items;
  }

  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.closeDialog();
      }
    });
  }

  openExchangePackApprovalModal(pack): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData('החלפת ערכות', 'ערכת `' + pack.pack.description + '` תוחלף בערכת `' + this.data.description + '`', 'אישור', 'ביטול')
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        var packChange: changeCardsPackInput = { "oldCardsPackId": pack.pack.id, "newCardsPackId": this.data.id };
        this.api.ChangeCardsPack(packChange).then(value => {
          this.overlaySpinnerService.changeOverlaySpinner(false);
          this.dialogRef.close(value);
          window.location.reload();
        }, reject => {
          this.overlaySpinnerService.changeOverlaySpinner(false);
          console.log("🚀 ~ file: cards.service.ts ~ line 63 ~ CardsService ~ returnthis.api.AddCardsPack ~ reject", reject)
        })
        this.closeDialog();
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

//TODO change button appirance
