import {Component, OnInit, VERSION} from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css'],
}) 

export class AffiliatesDashboardPageComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  affiliateData :any = [
    {
      id: 1,
      quantity: '40 ש”ח',
      email: 'neemandu@gmail.com',
      renewsAll: '12 חודשים',
      subscriptionType: 'לכל החיים',
      purchaseDate: '5.1.2024',
      Name: 'דודי נאמן',
      pastPurchases: [
        {
          id: 1,
          quantity: '30 ש”ח',
          email: 'neemandu@gmail.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '5.1.2023',
          Name: 'דודי נאמן',
        },
        {
          id: 2,
          quantity: '35 ש”ח',
          email: 'neemandu@gmail.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '5.1.2022',
          Name: 'דודי נאמן',
        },
        // more past purchases...
      ],
    },
    {
      id: 2,
      quantity: '50 ש”ח',
      email: 'john@example.com',
      renewsAll: '6 חודשים',
      subscriptionType: 'לשנה',
      purchaseDate: '6.2.2024',
      Name: 'John Doe',
      pastPurchases: [
        {
          id: 1,
          quantity: '45 ש”ח',
          email: 'john@example.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '6.2.2023',
          Name: 'John Doe',
        },
        // more past purchases...
      ],
    },
    // more users...
  ];
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

  name = 'Angular ' + VERSION.major;

  openCoverages = false;
  indexSelectedCoverage = 1;

  ngOnInit() {
    this.affiliateData.forEach((_affiliateData) => {
      _affiliateData.isExpanded = false;
    });
  }
  selectItemCoverages(index: number) {
    // this.openCoverages = this.openCoverages && this.indexSelectedCoverage === index ? false : true;
    // this.indexSelectedCoverage = index;
  }
  

}
