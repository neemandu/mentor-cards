import { Card } from './card';

export class PackInfo {
    cards: any[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class PackContent {
    cards: Card[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];
    guideBook: GuideBook;

    constructor() { }

    deseralize(input: any) {
        // console.log("🚀 ~ file: packs.ts ~ line 30 ~ PackContent ~ deseralize ~ input", input)
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        input.guideBook ? this.guideBook = new GuideBook().deseralize(input.guideBook) : null;
        return this;
    }
}

export class GuideBook {
    subjects: GuideBookSubject[];

    deseralize(input: any) {
        this.subjects = input.subjects.map(subject => new GuideBookSubject().deseralize(subject))
        Object.assign(this, input);
        return this;
    }
}

export class GuideBookSubject {
    subjectName: string;
    subSubjects: SubSubject[];

    deseralize(input: any) {
        Object.assign(this, input);
        this.subSubjects = input.subSubjects.map(subSubject => new SubSubject().deseralize(subSubject))
        return this;
    }
}

export class SubSubject {
    subSubjectName: string;
    questions: string[];

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }

}
