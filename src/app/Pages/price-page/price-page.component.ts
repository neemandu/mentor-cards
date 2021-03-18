import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import * as programData from '../../../assets/Bundle Configurations/BundleConfigs.json'
import { ApprovePurchaseDialogComponent } from './approve-purchase-dialog/approve-purchase-dialog.component';
const millisecondsInMonth: number = 2505600000;


@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.css']
})
export class PricePageComponent implements OnInit {

  configAmountsOfUsers: number[] = [];
  numOfUsersSelected: number;
  packSelected: SubscriptionPlan;
  changedPlansThisMonth: boolean = false;
  ownsCurrentPlanLabel: boolean = false;
  userData: UserData;
  Subscription: Subscription = new Subscription();


  constructor(private userAuthService: UserAuthService, private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog) {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    // debugger
    this.Subscription.add(this.userAuthService.subPlansEmmiter.subscribe(() => {
      this.userAuthService.subPlans.forEach(plan => {
        this.configAmountsOfUsers.push(plan.numberOfUsers);
      })
      this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
      this.overlaySpinnerService.changeOverlaySpinner(false);
      if (!this.userAuthService.userData) {
        this.packSelected = this.userAuthService.subPlans[5];
        this.numOfUsersSelected = this.configAmountsOfUsers[1];
      }
    }));
    if (this.userAuthService.userData || this.userAuthService.subPlans) {
      this.userAuthService.subPlans.forEach(plan => {
        this.configAmountsOfUsers.push(plan.numberOfUsers);
      })
      this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
      if (this.userAuthService.userData && this.userAuthService.userData.status === "PLAN") {//Plan already exists
        this.packSelected = this.userAuthService.subPlans.find(plan => plan.id === this.userAuthService.userData.subscription.subscriptionPlan.id);
        this.numOfUsersSelected = this.userAuthService.userData.subscription.subscriptionPlan.numberOfUsers;
        this.overlaySpinnerService.changeOverlaySpinner(false);
      }
      else {//No plan for current user
        // debugger
        this.packSelected = this.userAuthService.subPlans[5];
        this.numOfUsersSelected = this.configAmountsOfUsers[1];
        this.overlaySpinnerService.changeOverlaySpinner(false);
      }
    }
  }

  ngOnInit(): void {
    if (this.userAuthService.userData?.lastPlanSubstitutionDate &&
      new Date(this.userAuthService.userData?.lastPlanSubstitutionDate).getTime() + millisecondsInMonth > new Date().getTime() && this.userAuthService.userData?.numberOfPlansSubstitutions > 1) {
      this.changedPlansThisMonth = true;
    } else {
      this.ownsCurrentPlanLabel = false;
    }
    this.Subscription.add(this.userAuthService.loggedInEmmiter.subscribe((userData: UserData) => {
      this.userData = userData;
      this.overlaySpinnerService.changeOverlaySpinner(false);
    }));
    this.userData = this.userAuthService.userData;
  }

  /**
   * Get all plans (amount of packs) to let user choose
   */
  getPlans(): SubscriptionPlan[] {
    return this.userAuthService.subPlans.filter(plan => plan.numberOfUsers == this.numOfUsersSelected).sort((a, b) => {
      if (a.numberOfCardPacks == -1)
        return 1
      else if (b.numberOfCardPacks == -1)
        return -1
      else
        return a.numberOfCardPacks - b.numberOfCardPacks
    })
  }

  /**
   * Change pack after changing amount of users
   */
  changePack(): void {
    this.packSelected = this.userAuthService.subPlans.find(pack =>
      pack.numberOfUsers === this.numOfUsersSelected && pack.numberOfCardPacks == this.packSelected.numberOfCardPacks
    )
  }

  /**
   * After any change in plan - check if plan chosen is users current plan  
   */
  fixParameters(): void {
    !this.changedPlansThisMonth && this.packSelected.numberOfCardPacks === this.userAuthService.userData.subscription?.subscriptionPlan?.numberOfCardPacks &&
      this.numOfUsersSelected == this.userAuthService.userData.subscription?.subscriptionPlan?.numberOfUsers ? this.ownsCurrentPlanLabel = true : this.ownsCurrentPlanLabel = false;
  }

  getProgramJsonDescription(userAmount): string {
    return programData.packDescriptions.find(data => data.amountOfPeople == userAmount).description;
  }

  getNumOfPacksDesc(numberOfCardPacks): string {
    if (numberOfCardPacks == -1)
      return 'כל מה שיש לכם!'
    else if(numberOfCardPacks == 2)
      return numberOfCardPacks + '- בקטנה'
    else if(numberOfCardPacks == 5)
      return numberOfCardPacks + '- מספיק לי'
  }
  // getNumOfPacksDesc(numberOfCardPacks): string {
  //   if (numberOfCardPacks == -1)
  //     return 'כל הערכות'
  //   else
  //     return numberOfCardPacks + ' ערכות'
  // }

  getAmountOfUsersDesc(userAmount): string {
    if (userAmount == 1)
      return userAmount +'- אני'
    else if(userAmount ==3)
      return userAmount +'- חברים קרובים'
    else if(userAmount ==10)
      return userAmount +'- כל החבר\'ה'
    else if(userAmount ==50)
      return userAmount +'- כל הארגון'
  }

  // getAmountOfUsersDesc(userAmount): string {
  //   if (userAmount == 1)
  //     return 'משתמש יחיד'
  //   else
  //     return userAmount + ' משתמשים'
  // }

  getDiscountAmount(userAmount): string {
    var plan = this.userAuthService.subPlans.find(plan => plan.numberOfUsers == userAmount)
    if (plan.discount != 0)
      return Math.floor((plan.discount / plan.price) * 100) + '% הנחה'
    else
      return '- - - -';
  }

  get programJsonExtra(): string {
    return programData.packDescriptions.find(data => data.amountOfPeople == this.packSelected.numberOfUsers).extra;
  }

  get paymentStartDate() {
    if (this.userData) {
      return new Date(this.userData.firstProgramRegistrationDate.getTime() + millisecondsInMonth);
    }
    return new Date(new Date().getTime() + millisecondsInMonth);
  }

  get userSingedIn() {
    return this.userAuthService.userData;
  }

  get nextPlanChangeDate() {
    return this.userAuthService.nextPlanChangeDate;
  }

  get purchaseBtnVisible() {
    return this.userSingedIn && (this.userAuthService.userData.status !== 'PLAN' || !this.userAuthService.planChangedThisMonth)
  }

  get noChangingProgramThisMonth() {
    return this.userSingedIn && this.userAuthService.userData.status === 'PLAN' && this.userAuthService.planChangedThisMonth;
  }

  openApprovePurchaseDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.maxWidth = '30vw';
    dialogConfig.data = new PurchaseData(this.paymentStartDate, this.packSelected);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
      }
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
