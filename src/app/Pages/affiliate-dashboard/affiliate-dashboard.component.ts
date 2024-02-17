import {Component} from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';


@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css'],
}) 

export class AffiliatesDashboardPageComponent {
  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }


  data = {
    discountCode: 'MC25PER',
    user:'https://www.mentor-cards.com/yossi'
  }

  copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copying to clipboard was successful!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }
  
}
