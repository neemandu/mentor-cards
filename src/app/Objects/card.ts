export class Card {
    frontImgUrl: string;
    backImgUrl: string;
    index: number;
    flipped: boolean = false;
    rotation: number = 0; // 0, 90, 180, 270
    isPortrait: boolean = true;

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
