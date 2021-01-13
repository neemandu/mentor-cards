import { Subscription } from "./subscriptionPlans";

export class UserData {
    email: string;
    groupId: string | null;
    id: string;
    lastPackSubstitutionDate: string | any;
    lastPlanSubstitutionDate: string | any;
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
    groupUsers: GroupUser[];
    id: string;

    deseralize(input: any) {
        Object.assign(this, input);
        this.groupUsers = input.groupUsers.map(groupUser => new GroupUser().deseralize(groupUser));
        return this;
    }
}

export class GroupUser {
    email: string;
    role: string;

    deseralize(input: any) {
        this.email = input.email;
        this.role = input.role;
        // Object.assign(this, input);
        return this;
    }
}