import { APIService, Affiliate } from './../../API.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { Observable, Subject, of, Subscription } from 'rxjs';
import { UserData } from 'src/app/Objects/user-related';
import { MatTableDataSource } from '@angular/material/table';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AffiliateDialogComponent } from './affiliate-dialog/affiliate-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

export interface Element {
  id: number;
  name: string;
  purchaseDate: string;
  renewsEvery: string;
  email: string;
  commission: string;
}

@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AffiliatesDashboardPageComponent implements OnInit {
  userAuthData: UserData;
  // dataSource = ELEMENT_DATA;
  // columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: Element   | null;

  Subscription: Subscription = new Subscription();
  columnTranslations = {
    'name': 'שם',
    'purchaseDate': 'תאריך רכישה',
    'date': 'תאריך',
    'renewsEvery': 'מתחדש כל',
    'email': 'אימייל',
    'commission': 'עמלה'
  };
  
  animal: string;
  name: string;
  affiliateData: any;
  data: Element[] = [];
  nextIncome: number;

  columnsToDisplay: string[] = [
    'name',
    'purchaseDate',
    'renewsEvery',
    'email',
    'commission',
  ];
  withdrawsColumnsToDisplay: string[] = [
    'date',
    'commission',
  ];
  dataSource: any;
  withdrawsDataSource: any;
  withdrawsdisplayedColumn: string[] = ['date', 'amount'];
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  // expandedElement: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private snackBarCoponent: MatSnackBar,
    private userAuthService: UserAuthService,
    public dialog: MatDialog,
    private apiService: APIService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    if(this.userAuthService.isLoggedIn){
      this.userAuthData = this.userAuthService.userData;
      this.getAffiliates();
    }
    else{
      this.Subscription.add(
        this.userAuthService.userDataEmmiter.subscribe((userAuthData: UserData) => {
          this.userAuthData = userAuthData;        
          this.getAffiliates();
        })
      );
    }




  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AffiliateDialogComponent, {
      width: '26vw',
      height: '260px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  userData = {
    discountCode: 'MC25PER',
    user: 'https://www.mentor-cards.com/'
  };

  copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Copying to clipboard was successful!');
        this.snackBarCoponent.open('ההעתקה ללוח הצליחה!', '', {
          duration: 1000,
          panelClass: ['rtl-snackbar'],
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }

  toggleExpand(row: any): void {
    console.log(row);
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  getAffiliates(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    console.log('userAuthData');
    console.log(this.userAuthData);
    this.withdrawsDataSource = this.userAuthData.myAffiliate.withdraws;
    console.log('this withdrows data',this.withdrawsDataSource);
    this.userData.user = 'https://www.mentor-cards.com/home-page?ref=' + this.userAuthData.myAffiliate?.affiliateUrl;
    this.apiService.GetAffiliateData({ username: '' }).then(
      (affiliate) => {
        this.affiliateData = affiliate;
        console.log('affiliate');
        console.log(this.affiliateData);
        this.overlaySpinnerService.changeOverlaySpinner(false);
      },
      (error) => {
        this.affiliateData = error.data.getAffiliateData;
        this.overlaySpinnerService.changeOverlaySpinner(false);

        const commisions = this.affiliateData.flatMap(obj => obj.payments).reduce((sum, payment) => sum + (payment.amount || 0), 0);
        const income = this.userAuthData.myAffiliate.withdraws.reduce((sum, payment) => sum + (payment.amount || 0), 0);

        this.nextIncome = commisions - income;
        console.log(this.affiliateData, 'here');
        if (Array.isArray(this.affiliateData)) {
          this.affiliateData.map((item: any) => {
            const data = {
              id: item.id,
              name: item.fullName,
              purchaseDate: item.payments ? item.payments[0].date : '2022-02-01',
              renewsEvery: item.payments ? item.payments[0].payedMonths : '1 month',
              email: item.email,
              commission: item.payments ? item.payments[0].amount : 0,
              childElement: item.payments
                ? item.payments.slice(1).map((payment: any) => {
                    return {
                      id: item.id,
                      name: item.fullName,
                      purchaseDate: payment.date,
                      renewsEvery: payment.payedMonths,
                      email: item.email,
                      commission: payment.amount,
                    };
                  })
                : [],
            }
            this.data.push(data);
          });
        }
        this.dataSource = this.data;
        console.log(this.dataSource, 'here data source');
        // this.dataSource._updateChangeSubscription(); // Refresh the table
        this.changeDetectorRefs.detectChanges(); // Trigger change detection
      }
    );
  }

  
  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
//   description: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     position: 1,
//     name: 'Hydrogen',
//     weight: 1.0079,
//     symbol: 'H',
//     description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
//         atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
//   }, {
//     position: 2,
//     name: 'Helium',
//     weight: 4.0026,
//     symbol: 'He',
//     description: `Helium is a chemical element with symbol He and atomic number 2. It is a
//         colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
//         group in the periodic table. Its boiling point is the lowest among all the elements.`
//   }, {
//     position: 3,
//     name: 'Lithium',
//     weight: 6.941,
//     symbol: 'Li',
//     description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
//         silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
//         lightest solid element.`
//   }, {
//     position: 4,
//     name: 'Beryllium',
//     weight: 9.0122,
//     symbol: 'Be',
//     description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
//         relatively rare element in the universe, usually occurring as a product of the spallation of
//         larger atomic nuclei that have collided with cosmic rays.`
//   }, {
//     position: 5,
//     name: 'Boron',
//     weight: 10.811,
//     symbol: 'B',
//     description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
//         by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
//         low-abundance element in the Solar system and in the Earth's crust.`
//   }, {
//     position: 6,
//     name: 'Carbon',
//     weight: 12.0107,
//     symbol: 'C',
//     description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
//         and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
//         to group 14 of the periodic table.`
//   }, {
//     position: 7,
//     name: 'Nitrogen',
//     weight: 14.0067,
//     symbol: 'N',
//     description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
//         discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
//   }, {
//     position: 8,
//     name: 'Oxygen',
//     weight: 15.9994,
//     symbol: 'O',
//     description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
//          the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
//          agent that readily forms oxides with most elements as well as with other compounds.`
//   }, {
//     position: 9,
//     name: 'Fluorine',
//     weight: 18.9984,
//     symbol: 'F',
//     description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
//         lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
//         conditions.`
//   }, {
//     position: 10,
//     name: 'Neon',
//     weight: 20.1797,
//     symbol: 'Ne',
//     description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
//         Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
//         two-thirds the density of air.`
//   },
// ];
