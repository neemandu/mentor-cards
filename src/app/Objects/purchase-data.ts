// import { SubscriptionPlan } from "./subscriptionPlans";

import { SubscriptionPlan } from "../API.service";

export class PurchaseData {
    paymentStartDate: Date;
    subscriptionPlanSelected: SubscriptionPlan;
    packId: number;

    constructor(paymentStartDate: Date, subscriptionPlanSelected: SubscriptionPlan, packId?:number) {
        this.paymentStartDate = paymentStartDate;
        this.subscriptionPlanSelected = subscriptionPlanSelected;
        this.packId = packId;
    }
}
