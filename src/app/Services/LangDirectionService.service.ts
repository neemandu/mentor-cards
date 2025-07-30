import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangDirectionService {
  currentLangDirection = 'rtl'; // default direction
  currentLang = 'he'; // Add this property

  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'he', 'ar', 'es', 'ru']);
    if (localStorage.getItem('lang')) {
      const savedLang = localStorage.getItem('lang') as string;
      translate.use(savedLang);
      this.currentLang = savedLang;
      this.updateDirection(savedLang);
    } else {
      translate.use('he');
      this.currentLang = 'he';
      this.updateDirection('he');
    }

    translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
      this.updateDirection(event.lang);
    });
  }

  private updateDirection(lang: string): void {
    // RTL languages: Hebrew and Arabic
    // LTR languages: English, Spanish, Russian
    this.currentLangDirection = lang === 'he' || lang === 'ar' ? 'rtl' : 'ltr';
  }
}
