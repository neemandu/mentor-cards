import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserData } from 'src/app/Objects/user-related';
import { CardsService } from 'src/app/Services/cards.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { PostPurchaseSummeryDialogComponent } from 'src/app/Shared Components/Dialogs/post-purchase-summery-dialog/post-purchase-summery-dialog.component';
import { ProgramChoiseDialogComponent } from '../no-program-page/program-choise-dialog/program-choise-dialog.component';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  Subscription: Subscription = new Subscription();
  userData: UserData;

  constructor(private overlaySpinnerService: OverlaySpinnerService, private userAuthService: UserAuthService, public dialog: MatDialog,
    private cardsService: CardsService, private api: APIService) {
    this.userData = this.userAuthService.userData;
    console.log("file: user-page.component.ts ~ line 26 ~ constructor ~ this.userData", this.userData)
    this.overlaySpinnerService.changeOverlaySpinner(false)
  }

  ngOnInit(): void {
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }));
  }

  /**
   * When user wants to change his subscription plan (1 per month)
   */
  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    // this.videoplayer.nativeElement.pause();
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      // this.videoplayer.nativeElement.play();
      dialogSub.unsubscribe();
      if (res) {
        this.cardsService.allPacks = undefined;
        // this.router.navigate(['all-packs-page']);
      }
    });
  }

  /**
   * When user wants to cancel his subscription (Anytime)
   */
  openCancelDialogModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ביטול חבילה", ["האם לבטל הרשמה לחבילה זו?"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        this.userAuthService.cancelPayPalSubscription().subscribe(res => {
          // console.log("file: user-page.component.ts ~ line 75 ~ this.userAuthService.cancelPayPalSubscription ~ res", res)
          this.api.Unsubscribe({ 'username': this.userData.username }).then(() => {
            this.overlaySpinnerService.changeOverlaySpinner(false)
            window.location.reload();
            this.userAuthService._snackBar.open('בוטלה התכנית. עצוב לנו לראות אתכם עוזבים, ואנו מקווים לראותכם שוב בעתיד', '', {
              duration: 10000,
              panelClass: ['rtl-snackbar']
            });
          }, reject => {
            console.log("file: user-page.component.ts ~ line 77 ~ this.api.Unsubscribe ~ reject", reject)
            this.overlaySpinnerService.changeOverlaySpinner(false)
            this.userAuthService._snackBar.open('שגיאה בביטול התכנית. נסו שנית בעוד מספר דקות', '', {
              duration: 10000,
              panelClass: ['rtl-snackbar']
            });
          })
        }, error => {
          console.log("file: user-page.component.ts ~ line 91 ~ this.userAuthService.cancelPayPalSubscription ~ error", error)
        })
        /** TODO
         * 1. Cancel button
         * 2. Add myself to group modal (here and in no-program-page)
         * 3. Change what a SIMAPLEUSER can see on this page (amount of packs, change left)
         * 4. Add group managment page with table and adding\changing\deleting\saving users functions
         * 5. Make modal to enter group ID to enter it 
         */
      }
    });
  }

  /**1- if plan wasn't changed this month, else 0 */
  get amountOfPlansToChangeThisMonth() {
    // return this.userAuthService.userData.lastPlanSubstitutionDate && new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ? 1 : 0;
    return (new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth < new Date().getTime()) || this.userAuthService.userData.numberOfPlansSubstitutions == 1 ? 1 : 0;
  }

  /**1- if pack wasn't changed this month, else 0 */
  get amountOfPacksToChangeThisMonth() {
    return !this.userAuthService.userData.lastPackSubstitutionDate && new Date(this.userAuthService.userData.lastPackSubstitutionDate).getTime() + millisecondsInMonth <= new Date().getTime() ? 1 : 0;
  }

  get paymentStartDate() {
    return new Date(this.userData.firstProgramRegistrationDate.getTime() + millisecondsInMonth);
  }

  get trialMonth() {
    // return new Date() <= new Date(this.userData.firstProgramRegistrationDate);
    return this.userAuthService.trialMonth
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
