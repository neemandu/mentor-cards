import { Withdraw } from './../../../API.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { addDialogWithdrawsComponent } from './add-dialog-withdraws/add-dialog-withdraws.component';
// date
// amount
// currency
// paymentway

export interface Element {
  id: string;
  date: string;
  amount: number;
  currency: string;
  paymentway: string;
  transactionID: string;
}

@Component({
  selector: 'app-affiliate-withdraws',
  templateUrl: './affiliate-withdraws.component.html',
  styleUrls: ['./affiliate-withdraws.component.css'],
})
export class AffiliateWithdrawsComponent implements OnInit {
  displayedColumn: string[] = ['date', 'amount', 'currency', 'paymentway'];

  affiliate: any;
  newAffiliate: any;
  withdraws: any[] | null;
  dataSource: MatTableDataSource<Element>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private overlaySpinnerService: OverlaySpinnerService,
    public langDirectionService: LangDirectionService,
    private apiService: APIService,
    private router: Router
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  id: number;
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.affiliate = history.state.data;
    console.log(this.affiliate, 'affiliate');
    this.withdraws = this.affiliate.withdraws;
    console.log(this.withdraws, 'withdraws');
    this.dataSource = new MatTableDataSource(this.withdraws);
    console.log(this.dataSource, 'dataSource');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    if (this.withdraws) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  updateWithdraw(withdraw: any) {
    // this.overlaySpinnerService.changeOverlaySpinner(true);
    this.newAffiliate = {
      ...this.affiliate,
      withdraws: withdraw,
    };
    console.log(this.newAffiliate);
    this.editAffiliate(this.id, this.newAffiliate);
  }

  addWithdraw(withdraw: any) {
    // Convert the withdraws object into an array
    const withdrawsArray = Object.values(this.affiliate.withdraws);
    withdraw.transactionId = null;
    withdraw.__typename = 'Withdraw';

    // Append the new withdraw to the array
    withdrawsArray.push(withdraw);

    // Update the affiliate with the new withdraws array
    this.newAffiliate = {
      ...this.affiliate,
      withdraws: withdrawsArray,
    };

    console.log(this.newAffiliate);
    this.editAffiliate(this.id, this.newAffiliate);
  }

  editAffiliate(affiliateID: number, newAffiliateValue: any) {
    if (newAffiliateValue) {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      if (affiliateID != undefined) {
        this.apiService
          .UpdateAffiliate({
            id: this.id,
            ...newAffiliateValue,
          })
          .then(
            (res) => {
              this.affiliate = res;
              this.overlaySpinnerService.changeOverlaySpinner(false);
            },
            (error) => {
              this.overlaySpinnerService.changeOverlaySpinner(false);
              console.log(
                'file: manage-affiliate.component.ts ~ line 42 ~ this.api.UpdateAffiliate ~ error',
                error
              );
            }
          );
      } else {
        this.apiService.CreateAffiliate(newAffiliateValue).then(
          (res) => {
            this.affiliate.push(res);
            this.overlaySpinnerService.changeOverlaySpinner(false);
          },
          (error) => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log(
              'file: manage-affiliate.component.ts ~ line 42 ~ this.api.UpdateAffiliate ~ error',
              error
            );
          }
        );
      }
    }
  }

  openAddDialog() {
    const addDialofRef = this.dialog.open(addDialogWithdrawsComponent, {
      width: '250px',
    });

    addDialofRef.afterClosed().subscribe((withdraw) => {
      if (withdraw) {
        delete this.affiliate.createdAt;
        delete this.affiliate.updatedAt;
        delete this.affiliate.__typename;
        this.newAffiliate = {
          ...this.affiliate,
          withdraws: [...(this.affiliate.withdraws || []), withdraw],
        };
        console.log(this.newAffiliate, 'here');
        this.addWithdraw(withdraw);
      }
    });
  }
}