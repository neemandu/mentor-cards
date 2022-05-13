import { AboutInput } from '../API.service';
import { Card } from './card';

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

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
        // input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
        input.freeUntilDate ? this.freeUntilDate = new Date(input.freeUntilDate) : null;
        return this;
    }
}

// export class GuideBookSubject {
//     // subjectName: string;
//     value: string;
//     subSubjects: GuideBookSubSubject[];

//     // setDefault(subjectName: string) {
//     //     this.value = subjectName;
//     //     this.subSubjects = [new SubSubject().setDefault("תת נושא ראשון"), new SubSubject().setDefault("תת נושא שני"), new SubSubject().setDefault("תת נושא שלישי")]
//     //     return this;
//     // }

//     deseralize(input: any) {
//         // Object.assign(this, input);
//         this.value = input.subjectName
//         this.subSubjects = input.subSubjects.map(subSubject => new GuideBookSubSubject().deseralize(subSubject))
//         return this;
//     }
// }

// export class GuideBookSubSubject {
//     // subSubjectName: string;
//     value: string;
//     questions: string[];

//     // setDefault(subjectName: string) {
//     //     this.value = subjectName;
//     //     this.questions = ["שאלה מכווינה ראשונה", "שאלה מכווינה שנייה", "שאלה מכווינה שלישית"];
//     //     return this;
//     // }

//     deseralize(input: any) {
//         // Object.assign(this, input);
//         this.value = input.subSubjectName;
//         this.questions = input.questions;
//         return this;
//     }
// }

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

/*
interface GuideBookElement {
    name: string;
    subElements: GuideBookElement[] | null;
}

let res: GuideBookElement;

let x: any = {} //old guidebook

res = x.subjects.map((subject: any) => {
    const obj1: GuideBookElement = {
        name: subject.subjectName,
        subElements: subject.subSubjects.map((subSubject: any) => {
            const obj2: GuideBookElement = {
                name: subSubject.subSubjectName,
                subElements: subSubject.questions.map((question: any) => {
                    const obj3: GuideBookElement = {
                        name: question,
                        subElements: null
                    };
                    return obj3;
                })
            };
            return obj2;
        })
    };
    return obj1;
})

console.log(res); //new guidebook
*/