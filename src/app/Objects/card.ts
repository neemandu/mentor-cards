export class Card {
    frontImgUrl: string;
    backImgUrl: string;
    index: number;

    constructor() { }

    deseralize(input: any, packBackImgUrl: string) {
        this.frontImgUrl = input.frontImgUrl;
        if (input.backImgUrl)
            this.backImgUrl = input.backImgUrl;
        else if (packBackImgUrl)
            this.backImgUrl = packBackImgUrl;
        return this;
    }
}
