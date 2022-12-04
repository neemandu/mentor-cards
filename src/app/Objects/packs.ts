import { AboutInput } from '../API.service';
import { Card } from './card';
import { SubscriptionPlan } from 'src/app/API.service';

export class PackInfo {
    cards: any[];
    cardsPreview: any[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];
    name: string;
    freeUntilDate: Date;
    about: AboutInput;
    isOwnedByOrg: boolean;
    brief: string;
    likesCounter: number;
    isExternalPack: boolean;
    subscriptionPlans: SubscriptionPlan[];
    topQuestions: string[];

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        this.freeUntilDate = new Date(input.freeUntilDate);
        return this;
    }
}

export class PackContent {
    cards: Card[];
    cardsPreview: any[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];
    guideBook: GuideBookElement[];
    name: string;
    freeUntilDate: Date;
    about: AboutInput;
    isOwnedByOrg: boolean;
    brief: string;
    likesCounter: number;
    topQuestions: string[];
    subscriptionPlans: SubscriptionPlan[];
    isExternalPack: boolean;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card, input.backImgUrl)) : null;
        input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
        // input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
        input.freeUntilDate ? this.freeUntilDate = new Date(input.freeUntilDate) : null;
        return this;
    }
}

export class GuideBookElement {
    name: string;
    subElements: GuideBookElement[];

    constructor(name?: string, list?: GuideBookElement[]) {
        this.name = name;
        this.subElements = list;
    }

    deseralize(input: any) {
        // Object.assign(this, input);
        this.name = input.name;
        this.subElements = input.subElements?.map(element => new GuideBookElement().deseralize(element))
        return this;
    }
}