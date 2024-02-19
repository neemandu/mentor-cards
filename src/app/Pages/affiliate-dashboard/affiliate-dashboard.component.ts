import {AfterViewInit, Component, OnInit, VERSION, ViewChild} from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import {Subject} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css'],
}) 

export class AffiliatesDashboardPageComponent implements OnInit, AfterViewInit {
  affiliateData :any = [
    {
      id: 1,
      quantity: '40 ש”ח',
      email: 'neemandu@gmail.com',
      renewsAll: '12 חודשים',
      subscriptionType: 'לכל החיים',
      purchaseDate: '5.1.2024',
      Name: 'דודי נאמן',
      commission: '10 ש”ח',
      pastPurchases: [
        {
          id: 1,
          quantity: '30 ש”ח',
          email: 'neemandu@gmail.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '5.1.2023',
          Name: 'דודי נאמן',
          commission: '5 ש”ח',
        },
        {
          id: 2,
          quantity: '35 ש”ח',
          email: 'neemandu@gmail.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '5.1.2022',
          Name: 'דודי נאמן',
          commission: '7 ש”ח',
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
      commission: '12 ש”ח',
      pastPurchases: [
        {
          id: 1,
          quantity: '45 ש”ח',
          email: 'john@example.com',
          renewsAll: '6 חודשים',
          subscriptionType: 'לשנה',
          purchaseDate: '6.2.2023',
          Name: 'John Doe',
          commission: '9 ש”ח',
        },
        // more past purchases...
      ],
    },
    // more users...
  ];
  
  // displayedColumns: string[] = ['עמלה','אימייל', 'מתחדש כל ', 'סוג מנוי ', 'תאריך רכישה' , 'שם'];
  displayedColumns: string[] = ['name', 'purchaseDate', 'subscriptionType', 'renewsEvery', 'email', 'commission'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private snackBarCoponent: MatSnackBar
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.affiliateData.map(user => {
      return {
        name: user.Name,
        purchaseDate: user.purchaseDate,
        subscriptionType: user.subscriptionType,
        renewsEvery: user.renewsAll,
        email: user.email,
        // Assuming commission is a calculated field, replace the calculation as necessary
        commission: user.commission, 
      };
    }));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  data = {
    discountCode: 'MC25PER',
    user:'https://www.mentor-cards.com/yossi'
  }

  copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copying to clipboard was successful!');
      this.snackBarCoponent.open(
        'ההעתקה ללוח הצליחה!',
        '',
        {
          duration: 1000,
          panelClass: ['rtl-snackbar'],
        }
      );
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
