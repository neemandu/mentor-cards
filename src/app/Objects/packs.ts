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
  isFree: boolean;
  about: AboutInput;
  isOwnedByOrg: boolean;
  isHardCopyAvailable: boolean;
  brief: string;
  likesCounter: number;
  isExternalPack: boolean;
  subscriptionPlans: SubscriptionPlan[];
  topQuestions: string[];
  guidebookUrl: string;
  numberOfCards: number;
  ownerName: string;
  language: string;
  videoUrl: string;

  constructor() {}

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
  isFree: boolean;
  about: AboutInput;
  isOwnedByOrg: boolean;
  brief: string;
  likesCounter: number;
  topQuestions: string[];
  subscriptionPlans: SubscriptionPlan[];
  isExternalPack: boolean;
  guidebookUrl: string;
  numberOfCards: number;
  ownerName: string;
  language: string;
  videoUrl: string;
  isHardCopyAvailable: string;
  isReadingGuidebookAMust : boolean;

  constructor() {}

  deseralize(input: any) {
    Object.assign(this, input);
    this.guidebookUrl = input.guidebookUrl;
    if (input.cards) {
      this.cards = input.cards.map((card) => new Card().deserialize(card));
    }
    input.guideBook
      ? (this.guideBook = input.guideBook.map((element) =>
          new GuideBookElement().deseralize(element)
        ))
      : null;
    // input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
    input.freeUntilDate
      ? (this.freeUntilDate = new Date(input.freeUntilDate))
      : null;
    return this;
  }
}

// input.cards.map(card => new Card().deserialize(card, input.backImgUrl)) : null

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
    this.subElements = input.subElements?.map((element) =>
      new GuideBookElement().deseralize(element)
    );
    return this;
  }
}
