// card-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacksCardService {
    private isAnyCardOpen = new BehaviorSubject<boolean>(false);

    setCardOpen(isOpen: boolean) {
      this.isAnyCardOpen.next(isOpen);
    }
  
    getCardOpenState() {
      return this.isAnyCardOpen.asObservable();
    }
}