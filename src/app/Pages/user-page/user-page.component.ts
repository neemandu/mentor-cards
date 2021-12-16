import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
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
    private ngZone: NgZone, private api: APIService, public router: Router) {
    this.userData = this.userAuthService.userData;
    // console.log("file: user-page.component.ts ~ line 26 ~ constructor ~ this.userData", this.userData)
    this.overlaySpinnerService.changeOverlaySpinner(false)
  }

  ngOnInit(): void {
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }));
  }
  /**
   * When user wants to cancel his subscription (Anytime)
   */
  openCancelDialogModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ביטול החיוב האוטומטי", ["האם לבטל את החיוב האוטומטי לתכנית זו?"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        this.api.Unsubscribe({ 'username': this.userData.username }).then(() => {
          this.overlaySpinnerService.changeOverlaySpinner(false)
          window.location.reload();
          this.userAuthService._snackBar.open('החיוב האוטומטי בוטל בהצלחה', '', {
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

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  get nextPaymentDate() {
    var cycles = this.userData.subscription.subscriptionPlan.billingCycleInMonths;
    var now = new Date();
    var createdAt = new Date(this.userData.subscription.subscriptionPlan.createdAt);
    var monthsDiff = this.monthDiff(createdAt, now);
    var numOfCycles = (monthsDiff / cycles) + 1;
    var numberOfMonthsToAdd = numOfCycles * cycles * millisecondsInMonth;
    return new Date(createdAt.getTime() + numberOfMonthsToAdd);
  }

  get trialMonthExpDate() {
    // return new Date() <= new Date(this.userData.firstProgramRegistrationDate);
    return this.userAuthService.trialPeriodExpDate
  }

  public navigate(): void {
    this.ngZone.run(() => this.router.navigate(['price-page']));
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
