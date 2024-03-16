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
import { Observable, Subject, of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
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
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AffiliatesDashboardPageComponent implements OnInit {
  animal: string;
  name: string;
  affiliateData: any;
  data: Element[] = [];

  displayedColumns: string[] = [
    'name',
    'purchaseDate',
    'renewsEvery',
    'email',
    'commission',
  ];
  dataSource: any;
  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');
  expandedElement: any;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private snackBarCoponent: MatSnackBar,
    public dialog: MatDialog,
    private apiService: APIService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    this.getAffiliates();
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
    user: 'https://www.mentor-cards.com/yossi',
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
    this.apiService.GetAffiliateData({ username: '' }).then(
      (affiliate) => {
        this.affiliateData = affiliate;
        this.overlaySpinnerService.changeOverlaySpinner(false);
      },
      (error) => {
        this.affiliateData = error.data.getAffiliateData;
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log(this.affiliateData, 'here');
        if (Array.isArray(this.affiliateData)) {
          this.affiliateData.map((item: any) => {
            const data = {
              id: item.id,
              name: item.fullName,
              purchaseDate: item.payments ? item.payments.date : '2022-02-01',
              renewsEvery: item.payments ? item.payments.payedMonths : '1 month',
              email: item.email,
              commission: item.payments ? item.payments.amount : 0,
            };
            this.data.push(data);
          });
        }
        this.dataSource = new ExampleDataSource(this.data);
        this.dataSource._updateChangeSubscription(); // Refresh the table
        this.changeDetectorRefs.detectChanges(); // Trigger change detection

        console.log(this.data, 'here in data');

        // console.log(
        //   'file: manage-affiliate.component.ts ~ line 42 ~ this.api.ListAffiliates ~ error',
        //   error
        // );
      }
    );
  }
}

export class ExampleDataSource extends DataSource<any> {
  private data: Element[];

  constructor(data: Element[]) {
    super();
    this.data = data;
  }

  connect(): Observable<Element[]> {
    const rows = [];
    this.data.forEach((element) =>
      rows.push(element, { detailRow: true, element })
    );
    console.log(rows);
    return of(rows);
  }

  disconnect() {}
}
