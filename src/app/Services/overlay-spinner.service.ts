import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {

  show: boolean = true;

  @Output() changeOverlaySpinnerEmmiter: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  changeOverlaySpinner(show: boolean): void {
    if(this.show != show){
      this.changeOverlaySpinnerEmmiter.emit(show);
      this.show = show;
    }
  }
}
