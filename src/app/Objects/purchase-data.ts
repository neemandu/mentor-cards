import { SubscriptionPlan } from "./subscriptionPlans";

export class PurchaseData {
    paymentStartDate: Date;
    packSelected: SubscriptionPlan;

    constructor(paymentStartDate: Date, packSelected: SubscriptionPlan) {
        this.paymentStartDate = paymentStartDate;
        this.packSelected = packSelected;
    }
}
