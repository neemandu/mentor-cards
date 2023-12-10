import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIService, SubscriptionPlan } from '../../API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { PurchaseData } from 'src/app/Objects/purchase-data';
// import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
// import * as programData from '../../../assets/Bundle Configurations/BundleConfigs.json'
import { ApprovePurchaseDialogComponent } from './approve-purchase-dialog/approve-purchase-dialog.component';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
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
  lifeTimeSubscription: SubscriptionPlan;
  halfYearlySubscriptionPercentage: number;
  yearlySubscriptionPercentage: number;

  constructor(public _snackBar: MatSnackBar, public router: Router, private api: APIService,private ngZone: NgZone,
    private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog,
    private mixpanelService: MixpanelService) {
  }

  ngOnInit(): void {
    // track events
    this.mixpanelService.track("PageViewed", { 'Page Title': 'price-page' });
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
    this.lifeTimeSubscription = this.subPlans.find(plan => plan.billingCycleInMonths == 1200);

    this.halfYearlySubscriptionPercentage = Math.round(100-((this.halfYearlySubscription?.fullPrice * 100)/(this.monthlySubscription?.fullPrice * this.halfYearlySubscription.billingCycleInMonths)));
    this.yearlySubscriptionPercentage = Math.round(100-((this.yearlySubscription?.fullPrice * 100)/(this.monthlySubscription?.fullPrice * this.yearlySubscription.billingCycleInMonths)));

console.log(this.lifeTimeSubscription);


    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  openEnterCouponCodeModal(): void {
    
    this.mixpanelService.track("ButtonClicked", { "Name": "Enter Coupon code"});
    if (this.userData) {
      this.userAuthService.openEnterCouponCodeModal();
    } else {
      this.userAuthService.showSignInModal();
    }
  }
  public navigate(path: string): void {
    // console.log(path)
    this.ngZone.run(() => this.router.navigate([path]));
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
    console.log(packId);
    if (!this.userSingedIn) {
      this.signInSignUp();
    }
    else {
      this.packSelected = this.subPlans.find(pack => pack.id == packId)
      if (this.userData?.status === 'PLAN') {
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
    console.log('openApprovePurchaseDialog');
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
    let cycles = this.userData.subscription.subscriptionPlan.billingCycleInMonths;
    let now = new Date();
    let createdAt = new Date(this.userData.subscription.startDate);
    let monthsDiff = this.monthDiff(createdAt, now);
    let numOfCycles = Math.floor(monthsDiff / cycles) + 1;
    let numberOfMonthsToAdd = numOfCycles * cycles * millisecondsInMonth;
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(createdAt.getTime() + numberOfMonthsToAdd).toLocaleDateString('he-IL');
  }

  private monthDiff(d1, d2) {
    let months;
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
