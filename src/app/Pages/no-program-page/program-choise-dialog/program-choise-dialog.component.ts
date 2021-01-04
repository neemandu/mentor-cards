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

  constructor(private userAuthService: UserAuthService, public dialogRef: MatDialogRef<ProgramChoiseDialogComponent>, private api: APIService) {
    this.packSelected = this.userAuthService.subPlans[0];
    // console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 26 ~ ProgramChoiseDialogComponent ~ constructor ~ this.userAuthService.subPlans", this.userAuthService.subPlans)
    this.userAuthService.subPlans.forEach(plan => {
      this.configAmountsOfUsers.push(plan.numberOfUsers);
    })
    this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
    this.numOfUsersSelected = this.configAmountsOfUsers[0];
  }

  ngOnInit(): void {
    // console.log(programData)
    if (this.userAuthService.userData.lastPlanSubstitutionDate &&
      this.userAuthService.userData.lastPlanSubstitutionDate.getTime() + millisecondsInMonth > new Date().getTime()) {
      this.changedPlansThisMonth = true;
    }
  }

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

  changePack(): void {
    this.packSelected = this.userAuthService.subPlans.find(pack =>
      pack.numberOfUsers === this.numOfUsersSelected && pack.numberOfCardPacks == this.packSelected.numberOfCardPacks
    )
  }

  stepChanged($event: any): void {
    if (!this.changedPlansThisMonth && $event.selectedIndex == 2 && !this.rendered) {
      this.rendered = true;
      paypal
        .Buttons({
          // onInit: (data, actions) => {
          //   !this.changedPlansThisMonth ? actions.disable() : null;
          // },
          createSubscription: (data, actions) => {//lastPlanSubstitutionDate - once in last 30 days
            if (this.userAuthService.userData.status === "NOPLAN")
              return actions.subscription.create({
                'plan_id': this.packSelected.providerPlanId
              });
            else if (this.userAuthService.userData.status === "PLAN")
              return actions.subscription.revise(this.userAuthService.userData.subscription, {
                'plan_id': this.packSelected.providerPlanId
              });
          },
          onApprove: async (data, actions) => {
            var ids: updatePaymentProgramInput = { 'paymentProgramId': this.packSelected.providerPlanId, 'providerTransactionId': data.subscriptionID }
            this.api.UpdatePaymentProgram(ids).then(data => {
              console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 68 ~ ProgramChoiseDialogComponent ~ this.api.UpdatePaymentProgram ~ data", data)
              this.userAuthService._snackBar.open('הרשמת לחבילה בוצעה בהצלחה!', 'סגור', {
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

  renderNewPlanButton(): void {

  }

  renderPlanButton

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
