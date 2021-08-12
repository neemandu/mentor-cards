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
    about: string;

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
    about: string;

    constructor() { }

    deseralize(input: any) {
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        input.guideBook ? this.guideBook = new GuideBook().deseralize(input.guideBook) : null;
        input.freeUntilDate ? this.freeUntilDate = new Date(input.freeUntilDate) : null;
        return this;
    }
}

export class GuideBook {
    subjects: GuideBookSubject[];

    setDefault() {
        var sub1 = new GuideBookSubject();
        sub1.subjectName = "הנחיות/הצעות לעבודה אישית (אחד על אחד)";
        var subsub11 = new SubSubject();
        subsub11.subSubjectName = "עבודה עם קלפים במצב גלוי"
        subsub11.questions = ["בחר את הקלף שיכול להיות סימן ההיכר שלך. מה הופך את הקלף למשמעותי עבורך?", "איזה 2 קלפים היית שמח לקבל עכשיו במתנה. מדוע?"]
        var subsub12 = new SubSubject();
        subsub12.subSubjectName = "עבודה עם קלפים במצב סמוי"
        subsub12.questions = ["בחר 3 קלפים. מה הקלפים היו אומרים לך לו יכלו להביע דעתם?", "בחר 2 קלפים. קלף אחד מסמן איך אנשים רואים אותך והקלף השני איך אתה רואה את עצמך. מה הדמיון בין הקלפים? מה השוני?"]
        sub1.subSubjects = [subsub11, subsub12];
        var sub2 = new GuideBookSubject();
        sub2.subjectName = "הנחיות/הצעות לעבודה קבוצתית/ארגונית";
        var subsub21 = new SubSubject();
        subsub21.subSubjectName = "עבודה עם קלפים במצב גלוי"
        subsub21.questions = ["כל משתתף בוחר את הקלף שהכי היה רוצה לקבל/להוסיף לעצמו במסגרת הקבוצה.", "כל משתתף בוחר קלף ומשתף דבר אחד שיפתיע את כולם."]
        var subsub22 = new SubSubject();
        subsub22.subSubjectName = "תהליך - עבודה עם יותר מקלף אחד (קלפים סמויים)."
        subsub22.questions = ["בחר תחום מסוים והתמקד בו. שלוף 2 קלפים – הראשון מייצג תובנות ושיעורים שלמדת והשני שיעורים שעתידים להגיע.", "להאיר תהליך מסוים, שהתחיל בעבר, ממשיך בהווה ואמור להימשך גם בעתיד. מאפשר התבוננות רחבה יותר על ציר הזמן."]
        sub2.subSubjects = [subsub21, subsub22];
        this.subjects = [sub1, sub2]
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
