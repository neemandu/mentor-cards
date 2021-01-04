import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { ProgramChoiseDialogComponent } from 'src/app/Pages/no-program-page/program-choise-dialog/program-choise-dialog.component';
import { CardsService } from 'src/app/Services/cards.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog,
    private userAuthService: UserAuthService, private api: APIService) { }

  ngOnInit(): void {
    console.log("🚀 ~ file: pack-preview.component.ts ~ line 21 ~ PackPreviewComponent ~ data", this.data)
  }

  choosePack(): void {
    this.api.AddCardsPack(this.data.id).then(value => {
      console.log("🚀 ~ file: cards.service.ts ~ line 60 ~ CardsService ~ returnthis.api.AddCardsPack ~ value", value)
    }, reject => {
      console.log("🚀 ~ file: cards.service.ts ~ line 63 ~ CardsService ~ returnthis.api.AddCardsPack ~ reject", reject)
    })
  }

  exchangePack(): void {

  }

  get choosePackButtonVisible() {
    return true;
  }

  get exchangePackButtonVisible() {
    return this.userAuthService.userData.cardsPacks.items.length != 0;
  }

  get upgradePackButtonVisible() {
    return !(this.userAuthService.userData.lastPlanSubstitutionDate &&
      new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth > new Date().getTime() &&
      this.userAuthService.userData.numberOfPlansSubstitutions > 1)
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

  closeDialog(): void {
    this.dialogRef.close();
  }

}

//TODO change button appirance
