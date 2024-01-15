import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  constructor(private translate: TranslateService) {}
  public currentLanguage = new BehaviorSubject<string>('heb');
  translateString(key: string): Observable<string> {
    console.log('key', key);

    return this.translate.get(key);
  }
}
