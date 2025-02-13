import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlaySpinnerService {

  private spinners: Map<string, boolean> = new Map(); // Maps component name to its spinner state

  @Output() changeOverlaySpinnerEmmiter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  // This method is used to show/hide the spinner for a specific component
  changeOverlaySpinner(show: boolean, callingComponent: string = 'default'): void {
    if(!this.spinners.has(callingComponent)){
      this.spinners.set(callingComponent, false);
    }

    const currentState = this.spinners.get(callingComponent);
      
    // Only emit if the state is actually changing
    if (currentState !== show) {
      this.spinners.set(callingComponent, show);
      this.changeOverlaySpinnerEmmiter.emit({ component: callingComponent, show });
    }
    
  }

  // Optionally, you can add a method to get the state of a specific spinner
  getSpinnerState(callingComponent: string = 'default'): boolean {
    return this.spinners.get(callingComponent) || false; // Default to false if not set
  }

  // Optionally, you can add a method to clear the spinner state of a specific component
  clearSpinner(callingComponent: string = 'default'): void {
    this.spinners.delete(callingComponent);
  }

  // Optionally, a method to check if any spinner is active
  areAnySpinnersActive(): boolean {
    return Array.from(this.spinners.values()).includes(true);
  }
}
