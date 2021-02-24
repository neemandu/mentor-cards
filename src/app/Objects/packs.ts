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
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        input.guideBook ? this.guideBook = new GuideBook().deseralize(input.guideBook) : null;
        return this;
    }
}

export class GuideBook {
    subjects: GuideBookSubject[];

    setDefault() {
        this.subjects = [new GuideBookSubject().setDefault("נושא ראשון"), new GuideBookSubject().setDefault("נושא שני"), new GuideBookSubject().setDefault("נושא שלישי")]
        return this;
    }

    deseralize(input: any) {
        this.subjects = input.subjects.map(subject => new GuideBookSubject().deseralize(subject))
        Object.assign(this, input);
        return this;
    }
}

export class GuideBookSubject {
    subjectName: string;
    subSubjects: SubSubject[];

    setDefault(subjectName: string) {
        this.subjectName = subjectName;
        this.subSubjects = [new SubSubject().setDefault("תת נושא ראשון"), new SubSubject().setDefault("תת נושא שני"), new SubSubject().setDefault("תת נושא שלישי")]
        return this;
    }

    deseralize(input: any) {
        Object.assign(this, input);
        this.subSubjects = input.subSubjects.map(subSubject => new SubSubject().deseralize(subSubject))
        return this;
    }
}

export class SubSubject {
    subSubjectName: string;
    questions: string[];

    setDefault(subjectName: string) {
        this.subSubjectName = subjectName;
        this.questions = ["שאלה מכווינה ראשונה", "שאלה מכווינה שנייה", "שאלה מכווינה שלישית"];
        return this;
    }

    deseralize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
