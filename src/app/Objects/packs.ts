import { Card } from './card';

export class PackInfo {
    cards: any[];
    categories: string[];
    description: string;
    id: string;
    imgUrl: string;
    tags: string[];

    constructor() {}
    
    deseralize(input: any){
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

    constructor() {}
    
    deseralize(input: any){
        // console.log("🚀 ~ file: packs.ts ~ line 30 ~ PackContent ~ deseralize ~ input", input)
        Object.assign(this, input);
        input.cards ? this.cards = input.cards.map(card => new Card().deseralize(card)) : null;
        return this;
    }
}
