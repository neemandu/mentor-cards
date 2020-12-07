import { Card } from './card';

export class PackInfo {
    categories: string[];
    description: string;
    id: number;
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
    id: number = 0;
    imgUrl: string;
    tags: string[];

    constructor() {}
    
    deseralize(input: any){
        Object.assign(this, input);
        this.cards = input.cards.map(card => new Card().deseralize(card))
        return this;
    }
}
