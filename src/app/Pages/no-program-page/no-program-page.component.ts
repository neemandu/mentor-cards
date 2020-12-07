import { Component, OnInit } from '@angular/core';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-no-program-page',
  templateUrl: './no-program-page.component.html',
  styleUrls: ['./no-program-page.component.css']
})
export class NoProgramPageComponent implements OnInit {

  constructor(private overlaySpinnerService: OverlaySpinnerService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
  }

}
