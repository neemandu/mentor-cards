import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, getDirection, LANGUAGES } from 'src/configs';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = getDirection(DEFAULT_LANGUAGE.code); // default direction
  currentLang = DEFAULT_LANGUAGE.code; // Add this property

  constructor(translate: TranslateService) {
    translate.addLangs(LANGUAGES.map(lang => lang.code));
    if (localStorage.getItem('lang')) {
      const savedLang = localStorage.getItem('lang') as string;
      translate.use(savedLang);
      this.currentLang = savedLang;
    } else {
      translate.use(this.currentLang);
    }

    translate.onLangChange.subscribe((event) => {
      this.currentLangDirection = getDirection(event.lang);
      this.currentLang = event.lang;
    });
  }
}
