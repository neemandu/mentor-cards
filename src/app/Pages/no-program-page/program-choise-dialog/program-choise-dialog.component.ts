import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/API.service';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import * as bundleConfigs from 'src/assets/Bundle Configurations/BundleConfigs.json'

@Component({
  selector: 'app-program-choise-dialog',
  templateUrl: './program-choise-dialog.component.html',
  styleUrls: ['./program-choise-dialog.component.css'],
  // providers: [{
  //   provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  // }]
})
export class ProgramChoiseDialogComponent implements OnInit {

  isLinear = true;
  isEditable = false;
  configAmountsOfUsers: number[] = [];
  numOfUsersSelected: number;
  // numOfPacksSelected: number;
  packSelected: SubscriptionPlan;

  constructor(private userAuthService: UserAuthService) {
    // console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 27 ~ ProgramChoiseDialogComponent ~ constructor ~ this.userAuthService.subPlans", this.userAuthService.subPlans)
    this.packSelected = this.userAuthService.subPlans[0];
    this.userAuthService.subPlans.forEach(plan => {
      this.configAmountsOfUsers.push(plan.numberOfUsers);
    })
    this.configAmountsOfUsers = Array.from(new Set(this.configAmountsOfUsers)).sort((a, b) => a - b)//remove duplicates
    this.numOfUsersSelected = this.configAmountsOfUsers[0];

  }

  ngOnInit(): void {
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

  getOriginalPrice(plan: SubscriptionPlan): any {
    return (plan.price + plan.price*(plan.discount/100));
  }

  getPrice(): number {
    return this.packSelected.price;
  }

  getDiscount(): number {
    return this.packSelected.discount;
  }

  changePack(): void {
    this.packSelected = this.userAuthService.subPlans.find(pack =>
      pack.numberOfUsers === this.numOfUsersSelected && pack.numberOfCardPacks == this.packSelected.numberOfCardPacks
    )
  }
}

export enum amountOfPeople {
  'u-1' = "משתמש יחיד",
  'u-3' = "3 משתמשים",
  'u-10' = "10 משתמשים",
  'u-50' = "50 משתמשים"
}

export enum amountOfPacks {
  'p-2' = '2 חפיסות',
  'p-5' = '5 חפיסות',
  'p--1' = 'ללא הגבלה'
}
