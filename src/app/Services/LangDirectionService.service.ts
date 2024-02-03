import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'ltr'; // default direction

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'heb']);
    translate.setDefaultLang('heb');
    translate.use('heb');

    // Listen for language changes
    translate.onLangChange.subscribe((event) => {
      // Set text direction based on current language
      this.currentLangDirection = event.lang === 'heb' ? 'ltr' : 'rtl';
    });
  }
}