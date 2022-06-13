import { About } from "../API.service";
import { Subscription } from "./subscriptionPlans";

export class UserData {
    email: string;
    groupId: string | null;
    groupRole: string | null;
    id: string;
    lastPackSubstitutionDate: string | any;
    lastPlanSubstitutionDate: string | any;
    numberOfPacksSubstitutions: number | null;
    numberOfPlansSubstitutions: number | null;
    numberOfUsedPacks: number;
    status: string;
    subscription: Subscription;
    firstProgramRegistrationDate: Date;
    createdAt: Date;
    username: string;
    couponCodes: CouponCode[];
    cardsPacksIds: string[];
    providerTransactionId?: string | null;
    fullName?: string | null;
    endOfTrialDate: Date;
    orgMembership: OrgMembership;

    deseralize(input: any) {
        Object.assign(this, input);
        this.firstProgramRegistrationDate = new Date(input.firstProgramRegistrationDate);
        this.createdAt = input.createdAt ? new Date(input.createdAt) : undefined;
        this.couponCodes = input.couponCodes?.map(couponCode => new CouponCode(couponCode));
        this.endOfTrialDate = input.endOfTrialDate ? new Date(input.endOfTrialDate) : undefined;
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

export class CouponCode {
    id: string;
    organization: OrgMembership;
    couponCode: string;
    discount: number;
    trialPeriodInDays: number;
    createdAt: Date;
    updatedAt: Date;
    allowedCardsPacks: string[];

    constructor(input) {
        Object.assign(this, input);
        this.createdAt = new Date(input.createdAt);
        this.updatedAt = new Date(input.updatedAt);
    }
}

export class OrgMembership {
    id: string;
    name: string;
    trialPeriodInDays: number;
    numberOfallowedCardsPacks: number;          
    about: About;
    createdAt: string;
    updatedAt: string;
}
