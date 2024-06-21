import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'he']);
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang') as string);
    } else {
      translate.use('he');
    }
    // translate.use('he');
    translate.onLangChange.subscribe((event) => {
      this.currentLangDirection = event.lang === 'he' ? 'rtl' : 'ltr';
    });
  }
}