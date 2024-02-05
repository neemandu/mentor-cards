import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-select-language',
  template: `
  <div>
  <img src="assets/icons/world.svg" alt="Logo" class="mx-2" width="20vw"/>
  <select #langSelect (change)="translate.use(langSelect.value)" style="border: none; padding:7px">
    <option
      *ngFor="let lang of translate.getLangs()"
      [value]="lang"
      [attr.selected]="lang === translate.currentLang ? '' : null"
      style="padding: 10px;"
    >
      {{ lang }}
    </option>
  </select>
</div>
  `,
})
export class SelectLanguageComponent {
  constructor(public translate: TranslateService) {}
}
