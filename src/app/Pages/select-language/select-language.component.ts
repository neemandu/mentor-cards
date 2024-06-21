import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-select-language',
  template: `
  <div>
    <button mat-button [matMenuTriggerFor]="menu" [matTooltip]="'selectLanguageTooltip' | translate">
      <div  class=" flex gap-2 items-center">
        <div>
          {{ translate.currentLang == 'en' ? 'EN' : 'HE' }}
        </div>
        <div>
          <img src="/assets/New/nav-bar/lang.svg" alt="" class="w-4">
        </div>
      </div>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of translate.getLangs()" (click)="translate.use(lang)">
        <!-- {{ lang }} -->
        {{ lang == 'en' ? 'English' : 'עברית'}}
      </button>
    </mat-menu>
  </div>
  `,
  styles: [`
    ::ng-deep .mat-tooltip {
      background-color: #333;
      color: #fff;
      border-radius: 5px;
      padding: 10px;
      font-size: 13px;
    }
  `]
})
export class SelectLanguageComponent {

  constructor(public translate: TranslateService) { 
    translate.onLangChange.subscribe((event) => {
      localStorage.setItem('lang', event.lang);
    }
  );

  }

}