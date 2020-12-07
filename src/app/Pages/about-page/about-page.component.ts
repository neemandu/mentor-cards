import { Component, OnInit } from '@angular/core';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private overlaySpinnerService: OverlaySpinnerService) {
  }

  ngOnInit(): void {
    setTimeout(() => { this.overlaySpinnerService.changeOverlaySpinner(false); }, 20);
  }

}
