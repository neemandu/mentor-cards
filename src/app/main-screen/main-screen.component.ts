import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OverlaySpinnerService } from '../Services/overlay-spinner.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {

  // @HostListener('window:keyup', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //   console.log("keyEvent -> event", event)
  //   if (event.key === 'PrintScreen') {
  //     event.preventDefault()
  //     return false;
  //   }
  // }

  subs: Subscription = new Subscription();
  showSpinner: boolean = true;

  constructor(private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit() {
    this.subs.add(this.overlaySpinnerService.changeOverlaySpinnerEmmiter.subscribe((show: boolean) => this.showSpinner = show));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
