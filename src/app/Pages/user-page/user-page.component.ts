import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { ProgramChoiseDialogComponent } from '../no-program-page/program-choise-dialog/program-choise-dialog.component';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  userData: any;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private userAuthService: UserAuthService, public dialog: MatDialog) {
    this.userData = this.userAuthService.userData;
    this.userData ? this.overlaySpinnerService.changeOverlaySpinner(false) : undefined;
  }

  ngOnInit(): void {//TODO doesn't work!
    var sub = this.userAuthService.loggedInEmmiter.subscribe((userData) => {
      sub.unsubscribe();
      console.log("🚀 ~ file: user-page.component.ts ~ line 21 ~ UserPageComponent ~ this.userAuthService.loggedInEmmiter.subscribe ~ userData", userData)
      this.userData = userData;
      // setTimeout(() => { this.overlaySpinnerService.changeOverlaySpinner(false); }, 1000);//TODO fix this weird bug 
      this.overlaySpinnerService.changeOverlaySpinner(false);
    })
  }

  /**
   * When user wants to change his subscription plan (1 per month)
   */
  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        // this.router.navigate(['all-packs-page']);
      }
    });
  }

  /**
   * When user wants to cancel his subscription (Anytime)
   */
  openCancelDialogModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ביטול חבילה", "האם לבטל הרשמה לחבילה זו?", "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        console.log("🚀 ~ file: user-page.component.ts ~ line 54 ~ UserPageComponent ~ dialogSub ~ res", res)
        //TODO
      }
    });
  }

  /**1- if plan wasn't changed this month, else 0 */
  get amountOfPlansToChangeThisMonth() {
    return this.userAuthService.userData.lastPlanSubstitutionDate && new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ? 1 : 0;
  }

  /**1- if pack wasn't changed this month, else 0 */
  get amountOfPacksToChangeThisMonth() {
    return this.userAuthService.userData.lastPackSubstitutionDate && new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ? 1 : 0;
  }

}
