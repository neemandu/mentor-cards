import { Subscription } from "./subscriptionPlans";

export class UserData {
    email: string;
    groupId: string | null;
    id: string;
    lastPackSubstitutionDate: string | any;//TODO check if date or string
    lastPlanSubstitutionDate: string | any;//TODO check if date or string
    numberOfPacksSubstitutions: number | null;
    numberOfPlansSubstitutions: number | null;
    numberOfUsedPacks: number;
    status: string;
    subscription: Subscription;

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class GroupData {
    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}