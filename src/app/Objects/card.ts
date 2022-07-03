export class Card {
    frontImgUrl: string;
    backImgUrl: string;
    index: number;

    // constructor($imgUrl: string) {
    // 	this.imgUrl = $imgUrl;
    // }

    constructor() { }

    deseralize(input: any) {
        this.frontImgUrl = input.backImgUrl;
        this.backImgUrl = input.backImgUrl;
        // this.imgUrl = this.imgUrl.replace('{imgUrl=', '')
        // this.imgUrl = this.imgUrl.replace('}', '')
        return this;
    }
}
