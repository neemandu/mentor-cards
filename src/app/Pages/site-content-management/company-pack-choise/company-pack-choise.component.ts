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
  choises: PackContent[] = [];
  error: string;

  constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService,
    public router: Router, private ngZone: NgZone, private api: APIService, private cardsService: CardsService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.allPacks = this.cardsService.allPacks.map(pack => pack);
    this.userData = this.userAuthService.userData;
    !this.userData ? this.navigate('/all-packs-page') : null;
    // this.choises = new Array(this.userData.orgMembership.numberOfallowedCardsPacks).map(el => 0);
    this.choises = Array.apply(null, Array(this.userData.orgMembership.numberOfallowedCardsPacks)).map(() => { })
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
  }

  choiseDisabled(pack: PackContent): boolean {
    return this.choises.includes(pack);
  }

  selectionChanged(): void {
    this.saveDisabled = false;
    this.choises.forEach(choise => {
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

  saveSelectedChoises(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("שמירת ערכות", ["לשמור ערכות אלו?", "לאחר שמירה לא ניתן יהיה לשנות בחירה זו"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
        const ids: string[] = this.choises.map(choise => choise.id)
        this.api.UpdateSelectedCardPacks({ cardsPacksIds: ids })
          .then(res => {
            this.openRedirectDialog();
            console.log("🚀 ~ file: company-pack-choise.component.ts ~ line 77 ~ dialogSub ~ res", res)
            this.overlaySpinnerService.changeOverlaySpinner(false);
          })
          .catch(error => {
            if ((error.errors[0].message).toLowerCase().startsWith("user does not belong to any organization")) {
              this.error = 'אינכם שייכים לאף ארגון'
              this.saveDisabled = true;
              this.cardsService._snackBar.open('אינכם שייכים לאף ארגון, אתם מועברים לעמוד כל ערכות הקלפים', '', {
                duration: 3000,
              });
              setTimeout(() => { this.navigate('/all-packs-page') }, 3000);
            }
            else if ((error.errors[0].message).toLowerCase().startsWith("user already submitted card packs")) {
              this.error = 'בחרתם כבר ערכות קלפים בעבר'
              this.saveDisabled = true;
              this.cardsService._snackBar.open('בחרתם כבר ערכות קלפים בעבר, אתם מועברים לעמוד כל ערכות הקלפים', '', {
                duration: 3000,
              });
              setTimeout(() => { this.navigate('/all-packs-page') }, 3000);
            }
            // console.log("🚀 ~ file: company-pack-choise.component.ts ~ line 84 ~ dialogSub ~ error", error)
            this.overlaySpinnerService.changeOverlaySpinner(false);
          })
      }
    });
  }

  openRedirectDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ערכות הקלפים הוזנו בהצלחה", ["אתם מועברים לעמוד כל ערכות הקלפים"], "אישור", "")
    this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
  }

}
