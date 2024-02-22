import { Affiliate } from './../../API.service';
import {AfterViewInit, Component, Inject, OnInit, VERSION, ViewChild} from '@angular/core';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import {Observable, Subject, of} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataSource } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-affiliate-dashboard',
  templateUrl: './affiliate-dashboard.component.html',
  styleUrls: ['./affiliate-dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
}) 

export class AffiliatesDashboardPageComponent{

  animal: string;
  name: string;


  displayedColumns: string[] = ['name', 'purchaseDate', 'subscriptionType', 'renewsEvery', 'email', 'commission'];
  dataSource = new ExampleDataSource();
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private snackBarCoponent: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AffiliateDialog, {
      width: '350px',
      height: '350px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  userData = {
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

  toggleExpand(row: any): void {
    console.log(row);
    this.expandedElement = this.expandedElement === row ? null : row;
  }


  // selectItemCoverages(index: number) {
  //   // this.openCoverages = this.openCoverages && this.indexSelectedCoverage === index ? false : true;
  //   // this.indexSelectedCoverage = index;
  // }

}

export interface Element {
  id: number;
  name: string;
  purchaseDate: string;
  subscriptionType: string;
  renewsEvery: string;
  email: string;
  commission: string;
}

const data: Element[] = [
  {
    id: 1,
    name: 'John Doe',
    purchaseDate: '2022-01-01',
    subscriptionType: 'Yearly',
    renewsEvery: '12 months',
    email: 'john.doe@example.com',
    commission: '50 USD'
  },
  {
    id: 2,
    name: 'Jane Smith',
    purchaseDate: '2022-02-01',
    subscriptionType: 'Monthly',
    renewsEvery: '1 month',
    email: 'jane.smith@example.com',
    commission: '5 USD'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    purchaseDate: '2022-03-01',
    subscriptionType: 'Quarterly',
    renewsEvery: '3 months',
    email: 'bob.johnson@example.com',
    commission: '15 USD'
  },
  // ... add more data as needed ...
];

const newData: Element[] = [
  {
    id:1,
    name: 'Alice Williams',
    purchaseDate: '2022-04-01',
    subscriptionType: 'Yearly',
    renewsEvery: '12 months',
    email: 'alice.williams@example.com',
    commission: '60 USD'
  },
  {
    id: 2,
    name: 'David Taylor',
    purchaseDate: '2022-05-01',
    subscriptionType: 'Monthly',
    renewsEvery: '1 month',
    email: 'david.taylor@example.com',
    commission: '6 USD'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    purchaseDate: '2022-06-01',
    subscriptionType: 'Quarterly',
    renewsEvery: '3 months',
    email: 'charlie.brown@example.com',
    commission: '18 USD'
  },
  // ... add more data as needed ...
];


export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    console.log(rows);
    return of(rows);
  }

  disconnect() { }
}


@Component({
  selector: 'dialog',
  templateUrl: './dialog.html',
})
export class AffiliateDialog {

  constructor(
    public dialogRef: MatDialogRef<AffiliateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}