import { AboutInput } from '../API.service';
import { Card } from './card';

export class PackInfo {
    cards: any[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];
    name: string;
    freeUntilDate: Date;
    about: AboutInput;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        this.freeUntilDate = new Date(input.freeUntilDate);
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
    name: string;
    freeUntilDate: Date;
    about: AboutInput;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        input.guideBook ? this.guideBook = new GuideBook().deseralize(input.guideBook) : null;
        // input.guideBook ? this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element)) : null;
        input.freeUntilDate ? this.freeUntilDate = new Date(input.freeUntilDate) : null;
        return this;
    }
}

export class GuideBook {
    guideBook: GuideBookElement[];

    setDefault() {
        var sub1 = new GuideBookElement();
        sub1.name = "הנחיות/הצעות לעבודה אישית (אחד על אחד)";
        var subsub11 = new GuideBookElement();
        subsub11.name = "עבודה עם קלפים במצב גלוי"
        subsub11.subElements = [new GuideBookElement("בחר את הקלף שיכול להיות סימן ההיכר שלך. מה הופך את הקלף למשמעותי עבורך?"), new GuideBookElement("איזה 2 קלפים היית שמח לקבל עכשיו במתנה. מדוע?")]
        var subsub12 = new GuideBookElement();
        subsub12.name = "עבודה עם קלפים במצב סמוי"
        subsub12.subElements = [new GuideBookElement("בחר 3 קלפים. מה הקלפים היו אומרים לך לו יכלו להביע דעתם?"), new GuideBookElement("בחר 2 קלפים. קלף אחד מסמן איך אנשים רואים אותך והקלף השני איך אתה רואה את עצמך. מה הדמיון בין הקלפים? מה השוני?")]
        sub1.subElements = [subsub11, subsub12];
        var sub2 = new GuideBookElement();
        sub2.name = "הנחיות/הצעות לעבודה קבוצתית/ארגונית";
        var subsub21 = new GuideBookElement();
        subsub21.name = "עבודה עם קלפים במצב גלוי"
        subsub21.subElements = [new GuideBookElement("כל משתתף בוחר את הקלף שהכי היה רוצה לקבל/להוסיף לעצמו במסגרת הקבוצה."), new GuideBookElement("כל משתתף בוחר קלף ומשתף דבר אחד שיפתיע את כולם.")]
        var subsub22 = new GuideBookElement();
        subsub22.name = "תהליך - עבודה עם יותר מקלף אחד (קלפים סמויים)."
        subsub22.subElements = [new GuideBookElement("בחר תחום מסוים והתמקד בו. שלוף 2 קלפים – הראשון מייצג תובנות ושיעורים שלמדת והשני שיעורים שעתידים להגיע."), new GuideBookElement("להאיר תהליך מסוים, שהתחיל בעבר, ממשיך בהווה ואמור להימשך גם בעתיד. מאפשר התבוננות רחבה יותר על ציר הזמן.")]
        sub2.subElements = [subsub21, subsub22];
        this.guideBook = [sub1, sub2]
        return this;
    }

    deseralize(input: any) {
        // Object.assign(this, input);
        this.guideBook = input.guideBook.map(element => new GuideBookElement().deseralize(element))
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