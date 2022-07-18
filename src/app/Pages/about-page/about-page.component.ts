import { Component, OnDestroy, OnInit } from '@angular/core';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit, OnDestroy {

  selectedIndex: number = 0;
  interval;

  constructor(private overlaySpinnerService: OverlaySpinnerService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    this.interval = setInterval(() => { this.selectedIndex = (this.selectedIndex + 1) % 6 }, 5000);
  }

  ngOnInit(): void {
    // setTimeout(() => { this.overlaySpinnerService.changeOverlaySpinner(false); }, 20);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }

}
