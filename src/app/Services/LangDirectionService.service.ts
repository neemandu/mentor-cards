import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'עב']);
    translate.setDefaultLang('עב');
    translate.use('עב');

    // Listen for language changes
    translate.onLangChange.subscribe((event) => {
      // Set text direction based on current language
      this.currentLangDirection = event.lang === 'עב' ? 'rtl' : 'ltr';
    });
  }
}