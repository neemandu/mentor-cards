import { EventEmitter, Injectable, Output } from '@angular/core';
import { debounce } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {

  show: boolean = true;

  @Output() changeOverlaySpinnerEmmiter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    //this.changeOverlaySpinner = debounce(this.changeOverlaySpinner.bind(this), 1000);
  }

  changeOverlaySpinner(show: boolean): void {
    if (this.show !== show) {
      if(!show){
        setTimeout(() => {
          this.changeOverlaySpinnerEmmiter.emit(show);
          this.show = show;
        }, 5000); 
      }
      else{
        this.changeOverlaySpinnerEmmiter.emit(show);
        this.show = show;
      }
    }
  }
}
