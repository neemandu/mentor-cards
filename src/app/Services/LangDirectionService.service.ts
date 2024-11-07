import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction
  currentLang = 'he'; // Add this property

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'he']);
    if (localStorage.getItem('lang')) {
      const savedLang = localStorage.getItem('lang') as string;
      translate.use(savedLang);
      this.currentLang = savedLang;
    } else {
      translate.use('he');
      this.currentLang = 'he';
    }

    translate.onLangChange.subscribe((event) => {
      this.currentLangDirection = event.lang === 'he' ? 'rtl' : 'ltr';
      this.currentLang = event.lang;
    });
  }
}
