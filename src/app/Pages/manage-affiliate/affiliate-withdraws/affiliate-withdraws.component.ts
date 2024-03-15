import { Withdraw } from './../../../API.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from 'src/app/API.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { addDialogWithdrawsComponent } from './add-dialog-withdraws/add-dialog-withdraws.component';
import { EditDialogWithdrawsComponent } from './edit-dialog-withdraws/edit-dialog-withdraws.component';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
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
  displayedColumn: string[] = ['date', 'amount', 'currency', 'paymentway', 'id'];

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

  id: string;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAffiliate(this.id);
  }
  
  getAffiliate(id:string):void{
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.apiService.GetAffiliate(id).then(
      (affiliate) => {
        console.log(affiliate);
        this.affiliate = affiliate;
        this.withdraws = this.affiliate.withdraws;
        this.dataSource = new MatTableDataSource(this.withdraws);
        this.overlaySpinnerService.changeOverlaySpinner(false);
      },
      (error) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log(
          'file: manage-affiliate.component.ts ~ line 42 ~ this.api.GetAffiliate ~ error',
          error
        );
      }
    );
  }
  ngAfterViewInit() {
    if (this.withdraws) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
  updateWithdraw(withdraw: any) {
    this.newAffiliate = {
      ...this.affiliate,
      withdraws: withdraw,
    };
    console.log(this.newAffiliate);
    this.editAffiliate(this.id, this.newAffiliate);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addWithdraw(withdraw: any) {
    if (withdraw && this.affiliate) {
      // Convert the affiliate's withdraws object into an array if it's not null
      const withdrawsArray = this.affiliate.withdraws ? Object.values(this.affiliate.withdraws) : [];
      // withdraw.transactionId = null;
      // withdraw.__typename = 'Withdraw';
  
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
  }
  editAffiliate(id: string, newAffiliateValue: any) {
    console.log(newAffiliateValue, 'newAffiliateValue in editAffiliate');
    console.log(id, 'id in editAffiliate');

    if (newAffiliateValue) {
      this.overlaySpinnerService.changeOverlaySpinner(true);
      if (id != undefined) {
        this.apiService
          .UpdateAffiliate({
            id: this.id,
            ...newAffiliateValue,
          })
          .then(
            (res) => {
              this.affiliate = res;
              this.overlaySpinnerService.changeOverlaySpinner(false);
              this.getAffiliate(this.id);
              console.log('re fetched affiliate', this.affiliate,);
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
            this.getAffiliate(this.id);
            console.log('re fetched affiliate', this.affiliate,);
          
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

  editItem(id:string) {
    const item = this.withdraws.find(item => item.id === id);
    console.log(id,'id');
    console.log(this.withdraws,'withdraws');
    console.log(this.withdraws[id],'id');
    console.log(item);
    const editDialogRef = this.dialog.open(EditDialogWithdrawsComponent, {
      width: '250px',
      data: item,
    });
    var sub = editDialogRef
      .afterClosed()
      .subscribe((newWithdrawData: any) => {
        sub.unsubscribe();
        console.log(newWithdrawData , 'here aff');
        if (newWithdrawData) {
          this.overlaySpinnerService.changeOverlaySpinner(true);
          if (id != undefined) {
            //has id
            this.affiliate = {
              ...this.affiliate,
              withdraws: this.withdraws.map((withdraw) => {
                if (withdraw.id === id) {
                  return {
                    ...withdraw,
                    ...newWithdrawData,
                  };
                }
                return withdraw;
              }),
            };
            delete this.affiliate.__typename;
            delete this.affiliate.createdAt;
            delete this.affiliate.updatedAt;
            this.affiliate.withdraws.forEach(withdraw => delete withdraw.__typename);
            this.apiService
              .UpdateAffiliate({
                id: this.id,
                ...this.affiliate,
              })
              .then(
                (res) => {
                  this.withdraws[id] = res;
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  console.log('re fetched affiliate', this.affiliate,);
                  this.getAffiliate(this.id);
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
            //has no id
            this.apiService.CreateAffiliate(this.affiliate).then(
              (res) => {
                this.withdraws.push(res);
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
      });
  }
  openAddDialog() {
    const addDialofRef = this.dialog.open(addDialogWithdrawsComponent, {
      width: '250px',
    });

    addDialofRef.afterClosed().subscribe((withdraw) => {
      if (withdraw) {
        console.log(withdraw, 'withdraw in openAddDialog');
        delete this.affiliate.createdAt;
        delete this.affiliate.updatedAt;
        delete this.affiliate.__typename;
        delete withdraw.__typename;
      
        // Create a new array of withdraws without the __typename property
        const withdraws = this.affiliate.withdraws ? this.affiliate.withdraws.map((withdraw: any) => {
          delete withdraw.__typename;
          return withdraw;
        }) : [];
      
        this.newAffiliate = {
          ...this.affiliate,
          withdraws: [...withdraws, withdraw],
        };
        console.log(this.newAffiliate, 'here');
        this.addWithdraw(withdraw);
      }
    });
  }

  deleteItem(id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData(
      'מחיקת שותף',
      ['האם למחוק שותף זה?'],
      'אישור',
      'ביטול'
    );
    const dialogRef = this.dialog.open(
      DynamicDialogYesNoComponent,
      dialogConfig
    );
    var dialogSub = dialogRef.afterClosed().subscribe((result: boolean) => {
      dialogSub.unsubscribe();
      if (result) {
        this.overlaySpinnerService.changeOverlaySpinner(true);
  
        // Remove the withdraw with the specified id
        const withdraws = this.affiliate.withdraws ? this.affiliate.withdraws.filter(withdraw => withdraw.id !== id) : [];
  
        this.affiliate = {
          ...this.affiliate,
          withdraws: withdraws,
        };
        delete this.affiliate.__typename;
        delete this.affiliate.createdAt;
        delete this.affiliate.updatedAt;
        this.affiliate.withdraws.forEach(withdraw => delete withdraw.__typename);
        this.apiService
          .UpdateAffiliate({
            id: this.id,
            ...this.affiliate,
          })
          .then(
            (res) => {
              // Update the withdraws array in the component's state
              this.withdraws = withdraws;
              this.overlaySpinnerService.changeOverlaySpinner(false);
              console.log('re fetched affiliate', this.affiliate,);
              this.getAffiliate(this.id);
            },
            (error) => {
              this.overlaySpinnerService.changeOverlaySpinner(false);
              console.log(
                'file: manage-affiliate.component.ts ~ line 42 ~ this.api.UpdateAffiliate ~ error',
                error
              );
            }
          );
      }}
    );
  }
}