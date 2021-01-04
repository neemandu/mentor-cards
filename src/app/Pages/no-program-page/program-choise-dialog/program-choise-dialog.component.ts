import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService, updatePaymentProgramInput } from 'src/app/API.service';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import * as programData from '../../../../assets/Bundle Configurations/BundleConfigs.json';
declare var paypal;
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-program-choise-dialog',
  templateUrl: './program-choise-dialog.component.html',
  styleUrls: ['./program-choise-dialog.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ProgramChoiseDialogComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  isLinear = true;
  isEditable = false;
  configAmountsOfUsers: number[] = [];
  numOfUsersSelected: number;
  packSelected: SubscriptionPlan;
  rendered: boolean = false;
  changedPlansThisMonth: boolean = false;
  ownsCurrentPlanLabel: boolean = false;

  constructor(private userAuthService: UserAuthService, public dialogRef: MatDialogRef<ProgramChoiseDialogComponent>, private api: APIService) {
    this.userAuthService.subPlans.forEach(plan => {
      this.configAmountsOfUsers.push(plan.numberOfUsers);
    })
    this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
    if (this.userAuthService.userData.status === "PLAN") {//Plan already exists
      this.packSelected = this.userAuthService.subPlans.find(plan => plan.id === this.userAuthService.userData.subscription.subscriptionPlan.id);
      this.numOfUsersSelected = this.userAuthService.userData.subscription.subscriptionPlan.numberOfUsers;
    }
    else {//No plan for current user
      this.packSelected = this.userAuthService.subPlans[0];
      this.numOfUsersSelected = this.configAmountsOfUsers[0];
    }
  }

  ngOnInit(): void {
    if (this.userAuthService.userData.lastPlanSubstitutionDate &&
      new Date(this.userAuthService.userData.lastPlanSubstitutionDate).getTime() + millisecondsInMonth > new Date().getTime() && this.userAuthService.userData.numberOfPlansSubstitutions > 1) {
      this.changedPlansThisMonth = true;
    } else {
      this.ownsCurrentPlanLabel = true
    }
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

  stepChanged($event: any): void {
    if (!this.changedPlansThisMonth && !this.ownsCurrentPlanLabel && $event.selectedIndex == 2 && !this.rendered) {
      this.rendered = true;
      paypal
        .Buttons({
          // onInit: (data, actions) => {
          //   !this.changedPlansThisMonth ? actions.disable() : null;
          // },
          createSubscription: (data, actions) => {//lastPlanSubstitutionDate - once in last 30 days
            // debugger;
            if (this.userAuthService.userData.status === "NOPLAN")
              return actions.subscription.create({
                'plan_id': this.packSelected.providerPlanId
              });
            else if (this.userAuthService.userData.status === "PLAN")
              return actions.subscription.revise(this.userAuthService.userData.subscription.providerTransactionId, {
                'plan_id': this.packSelected.providerPlanId
              });
          },
          onApprove: async (data, actions) => {
            var ids: updatePaymentProgramInput = { 'paymentProgramId': this.packSelected.id, 'providerTransactionId': data.subscriptionID }
            this.api.UpdatePaymentProgram(ids).then(data => {
              // console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 68 ~ ProgramChoiseDialogComponent ~ this.api.UpdatePaymentProgram ~ data", data)
              this.userAuthService._snackBar.open('הרשמתך לחבילה בוצעה בהצלחה!', '', {
                duration: 4000,
                panelClass: ['rtl-snackbar']
              });
              this.userAuthService.updateUserData();
              this.dialogRef.close(this.packSelected);
            }, error => {
              console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 71 ~ ProgramChoiseDialogComponent ~ this.api.UpdatePaymentProgram ~ error", error)
              // this.userAuthService._snackBar.open(error, '', {
              //   duration: 3000,
              //   panelClass: ['rtl-snackbar']
              // });
            })
          },
          onError: err => {
            console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 77 ~ ProgramChoiseDialogComponent ~ stepChanged ~ err", err)
            this.userAuthService._snackBar.open(err, '', {
              duration: 3000,
              panelClass: ['rtl-snackbar']
            });
          },
          style: {
            layout: 'horizontal',
            color: 'gold',
            shape: 'pill',
            label: 'pay',
          }
        })
        .render(this.paypalElement.nativeElement);
    }
  }

  getProgramJsonDescription(userAmount): string {
    return programData.packDescriptions.find(data => data.amountOfPeople == userAmount).description;
  }

  get programJsonExtra(): string {
    return programData.packDescriptions.find(data => data.amountOfPeople == this.packSelected.numberOfUsers).extra;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}

// export enum amountOfPeople {
//   'u-1' = "משתמש יחיד",
//   'u-3' = "3 משתמשים",
//   'u-10' = "10 משתמשים",
//   'u-50' = "50 משתמשים"
// }

// export enum amountOfPacks {
//   'p-2' = '2 חפיסות',
//   'p-5' = '5 חפיסות',
//   'p--1' = 'ללא הגבלה'
// }
