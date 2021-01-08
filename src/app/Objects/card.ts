export class Card {
    imgUrl: string;
    index: number;

    // constructor($imgUrl: string) {
    // 	this.imgUrl = $imgUrl;
    // }

    constructor() { }

    deseralize(input: any) {
        this.imgUrl = input;
        this.imgUrl = this.imgUrl.replace('{imgUrl=', '')
        this.imgUrl = this.imgUrl.replace('}', '')
        return this;
    }
}
