import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction

  constructor(translate: TranslateService) {
    translate.addLangs(['EN', 'HE']);
    translate.setDefaultLang('HE');
    translate.use('HE');

    // Listen for language changes
    translate.onLangChange.subscribe((event) => {
      // Set text direction based on current language
      this.currentLangDirection = event.lang === 'HE' ? 'rtl' : 'ltr';
    });
  }
}