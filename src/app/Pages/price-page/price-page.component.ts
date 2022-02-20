import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService } from '../../API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
// import * as programData from '../../../assets/Bundle Configurations/BundleConfigs.json'
import { ApprovePurchaseDialogComponent } from './approve-purchase-dialog/approve-purchase-dialog.component';
const millisecondsInMonth: number = 2505600000;
const millisecondsInTwoWeeks: number = 1209600000;


@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.css']
})
export class PricePageComponent implements OnInit {

  // configAmountsOfUsers: number[] = [];
  // numOfUsersSelected: number;
  packSelected: SubscriptionPlan;
  changedPlansThisMonth: boolean = false;
  ownsCurrentPlanLabel: boolean = false;
  userData: UserData;
  Subscription: Subscription = new Subscription();

  subPlans: SubscriptionPlan[];
  monthlySubscription: SubscriptionPlan;
  halfYearlySubscription: SubscriptionPlan;
  yearlySubscription: SubscriptionPlan;

  constructor(public _snackBar: MatSnackBar, private api: APIService,
    private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog) {
    // this.Subscription.add(this.userAuthService.subPlansEmmiter.subscribe(() => {
    //   this.userAuthService.subPlans.forEach(plan => {
    //     this.configAmountsOfUsers.push(plan.numberOfUsers);
    //   })
    //   this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
    //   this.overlaySpinnerService.changeOverlaySpinner(false);
    //   if (!this.userAuthService.userData) {
    //     this.packSelected = this.userAuthService.subPlans[5];
    //     this.numOfUsersSelected = this.configAmountsOfUsers[1];
    //   }
    // }));
    // if (this.userAuthService.userData || this.userAuthService.subPlans) {
    //   this.userAuthService.subPlans.forEach(plan => {
    //     this.configAmountsOfUsers.push(plan.numberOfUsers);
    //   })
    //   this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
    //   if (this.userAuthService.userData && this.userAuthService.userData.status === "PLAN") {//Plan already exists
    //     this.packSelected = this.userAuthService.subPlans.find(plan => plan.id === this.userAuthService.userData.subscription.subscriptionPlan.id);
    //     this.numOfUsersSelected = this.userAuthService.userData.subscription.subscriptionPlan.numberOfUsers;
    //     this.overlaySpinnerService.changeOverlaySpinner(false);
    //   }
    //   else {//No plan for current user
    //     // debugger
    //     this.packSelected = this.userAuthService.subPlans[5];
    //     this.numOfUsersSelected = this.configAmountsOfUsers[1];
    //     this.overlaySpinnerService.changeOverlaySpinner(false);
    //   }
    // }
  }

  ngOnInit(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.Subscription.add(this.userAuthService.subPlansEmmiter.subscribe(() => {
      this.getSubscriptionPlans();
    }));
    if (this.userAuthService.subPlans) {
      this.getSubscriptionPlans();
    }
    this.userData = this.userAuthService.userData;
    console.log("file: price-page.component.ts ~ line 80 ~ ngOnInit ~ this.userData", this.userData)
  }

  getSubscriptionPlans(): void {
    this.subPlans = this.userAuthService.subPlans;
    this.monthlySubscription = this.subPlans.find(plan => plan.billingCycleInMonths == 1);
    // console.log("file: price-page.component.ts ~ line 93 ~ getSubscriptionPlans ~ this.monthlySubscrition", this.monthlySubscription)
    this.halfYearlySubscription = this.subPlans.find(plan => plan.billingCycleInMonths == 6);
    // console.log("file: price-page.component.ts ~ line 95 ~ getSubscriptionPlans ~ this.halfYearlySubscrition", this.halfYearlySubscription)
    this.yearlySubscription = this.subPlans.find(plan => plan.billingCycleInMonths == 12);
    // console.log("file: price-page.component.ts ~ line 97 ~ getSubscriptionPlans ~ this.yearlySubscrition", this.yearlySubscription)
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }


  get paymentStartDate() {
    if (this.userData) {
      return new Date(this.userData.firstProgramRegistrationDate.getTime() + millisecondsInTwoWeeks);
    }
    return new Date(new Date().getTime() + millisecondsInTwoWeeks);
  }

  get userSingedIn() {
    return this.userAuthService.userData;
  }

  /**
   * Before prompting the purchase dialog, check if user has free period\code coupon on hand
   */
  checkFreePeriod(packId): void {
    if (!this.userSingedIn) {
      this.signInSignUp();
    }
    else {
      this.packSelected = this.subPlans.find(pack => pack.id == packId)
      // if (this.userAuthService.trialPeriodExpDate || this.userAuthService.codeCouponExpDate != null) {
      if (this.userAuthService.trialPeriodExpDate) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxHeight = '85vh';
        dialogConfig.maxWidth = '85vw';
        let textInModal = "כל ערכות הקלפים פתוחות לשימושכם בחינם עד ל-"
        textInModal += this.userAuthService.trialPeriodExpDate.toLocaleDateString('he-IL');
        dialogConfig.data = new DynamicDialogData("תקופת ניסיון חינמית באתר", ["שימו לב!", textInModal, "תהנו מזה!"], "המשך בכל זאת", "בטל")
        const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
        var dialogSub = dialogRef.afterClosed().subscribe(res => {
          dialogSub.unsubscribe();
          if (res) {
            this.openApprovePurchaseDialog();
          }
        });
      }
      else if (this.userData?.status === 'PLAN') {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxHeight = '85vh';
        dialogConfig.maxWidth = '85vw';
        const title = "הנכם רשומים לתכנית אחרת"
        const content = ["שימו לב!", `התכנית החדשה תעודכן החל מהתאריך ${this.nextPaymentDate}`]
        dialogConfig.data = new DynamicDialogData(title, content, "המשך בכל זאת", "בטל")
        const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
        var dialogSub = dialogRef.afterClosed().subscribe(res => {
          dialogSub.unsubscribe();
          if (res) {
            this.openApprovePurchaseDialog();
          }
        });
      }
      else {
        this.openApprovePurchaseDialog();
      }
    }
  }

  openApprovePurchaseDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    // dialogConfig.maxWidth = '30vw';
    dialogConfig.data = new PurchaseData(this.paymentStartDate, this.packSelected);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
      }
    });
  }

  private get nextPaymentDate() {
    var cycles = this.userData.subscription.subscriptionPlan.billingCycleInMonths;
    var now = new Date();
    var createdAt = new Date(this.userData.subscription.subscriptionPlan.createdAt);
    var monthsDiff = this.monthDiff(createdAt, now);
    var numOfCycles = Math.ceil(monthsDiff / cycles);
    var numberOfMonthsToAdd = numOfCycles * cycles * millisecondsInMonth;
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(createdAt.getTime() + numberOfMonthsToAdd).toLocaleDateString('he-IL');
  }

  private monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }

  signInSignUp(): void {
    this.userAuthService.showSignInModal();
  }
}
