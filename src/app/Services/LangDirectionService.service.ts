import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction

  constructor(translate: TranslateService) {
    translate.addLangs(['EN', 'HE']);
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang') as string);
    } else {
      translate.use('HE');
    }
    translate.use('HE');
    translate.onLangChange.subscribe((event) => {
      this.currentLangDirection = event.lang === 'HE' ? 'rtl' : 'ltr';
    });
  }
}