export class SubscriptionPlan {
    description: string;
    discount: number;
    id: string;
    name: string;
    numberOfCardPacks: number;
    numberOfUsers: number;
    price: number;
    providerPlanId: string;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class Subscription {
    id: string | number;
    providerTransactionId: string;
    username: string;
    subscriptionPlan: SubscriptionPlan;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}