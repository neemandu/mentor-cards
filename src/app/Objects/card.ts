export class Card {
    imgUrl: string;
    index: number;

	// constructor($imgUrl: string) {
	// 	this.imgUrl = $imgUrl;
    // }
    
    constructor(){}

    deseralize(input: any){
        Object.assign(this, input);
        return this;
    }
}
