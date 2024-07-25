export class Card {
    categoryName: string;
    categoryStepNumber: number;
    cardsImages: cardsImages[]
    index: number;

    constructor() { }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}


export class cardsImages {
  backImgUrl: string;
  frontImgUrl: string;
  rotation: number // 0, 90, 180, 270
  isPortrait: boolean ;
  flipped: boolean;
}