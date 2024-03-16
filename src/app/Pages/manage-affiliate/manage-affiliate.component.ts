import { Withdraw } from './../../API.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { addDialogComponent } from './add-dialog/add-dialog.component';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

export interface Element {
  id: string;
  affiliateID: string;
  affiliateUrl: string;
  contactEmail: string;
  phoneNumber: string;
  websiteURL: string;
  paymentDetails: string;
  commissionPercentage: number;
  status: string;
  Withdraws?: Withdraw[];
}

@Component({
  selector: 'app-manage-affiliate',
  templateUrl: './manage-affiliate.component.html',
  styleUrls: ['./manage-affiliate.component.css'],
})
export class ManageAffiliateComponent implements OnInit , AfterViewInit {
 
  displayedColumn: string[] = [
    'affiliateUrl',
    'contactEmail',
    'phoneNumber',
    'websiteURL',
    'paymentDetails',
    'commissionPercentage',
    'status',
    'id',
  ];

  affiliateData: any[];
  dataSource: MatTableDataSource<Element>;

  // = [
  //   // {
  //   //   id: 1,
  //   //   affiliateID: 1,
  //   //   affiliateUrl: 'http://affiliate1.com',
  //   //   contactEmail: 'contact1@affiliate.com',
  //   //   phoneNumber: '123-456-7890',
  //   //   websiteURL: 'http://website1.com',
  //   //   paymentDetails: 'Bank Transfer',
  //   //   commissionPercentage: 10,
  //   //   status: 'Active'
  //   // },
  //   // {
  //   //   id: 2,
  //   //   affiliateID: 2,
  //   //   affiliateUrl: 'http://affiliate2.com',
  //   //   contactEmail: 'contact2@affiliate.com',
  //   //   phoneNumber: '234-567-8901',
  //   //   websiteURL: 'http://website2.com',
  //   //   paymentDetails: 'PayPal',
  //   //   commissionPercentage: 15,
  //   //   status: 'Inactive'
  //   // },
  //   // {
  //   //   id: 3,
  //   //   affiliateID: 3,
  //   //   affiliateUrl: 'http://affiliate2.com',
  //   //   contactEmail: 'contact2@affiliate.com',
  //   //   phoneNumber: '234-567-8901',
  //   //   websiteURL: 'http://website2.com',
  //   //   paymentDetails: 'PayPal',
  //   //   commissionPercentage: 15,
  //   //   status: 'Inactive'
  //   // },
  //   // Add more data as needed
  // ];

  constructor(
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

  ngOnInit(): void {
    
    this.getAffiliates();
    this.dataSource = new MatTableDataSource(this.affiliateData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  getAffiliates(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.apiService.ListAffiliates().then(
      (affiliate) => {
        this.affiliateData = affiliate.items;
        this.dataSource = new MatTableDataSource(this.affiliateData);
        this.dataSource.sort = this.sort;
        this.overlaySpinnerService.changeOverlaySpinner(false);
        
        console.log(this.affiliateData, 'here');
      },
      (error) => {
        this.overlaySpinnerService.changeOverlaySpinner(false);
        console.log(
          'file: manage-affiliate.component.ts ~ line 42 ~ this.api.ListAffiliates ~ error',
          error
        );
      }
    );
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
        this.apiService
          .DeleteAffiliate({ id: this.affiliateData.find(item => item.id === id).id  })
          .then(
            (res) => {
              // this.affiliateData.splice(id, 1);
              this.overlaySpinnerService.changeOverlaySpinner(false);
              this.getAffiliates();
            },
            (error) => {
              this.overlaySpinnerService.changeOverlaySpinner(false);
              console.log(
                'file: manage-affiliate.component.ts ~ line 42 ~ this.api.DeleteAffiliate ~ error',
                error
              );
            }
          );
      }
    });
  }

  openAddDialog() {
    const addDialofRef = this.dialog.open(addDialogComponent, {
      width: '250px',
    });

    addDialofRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.apiService.CreateAffiliate(result).then(
          (res) => {
            this.affiliateData = [...this.affiliateData, res];
            this.overlaySpinnerService.changeOverlaySpinner(false);
            this.getAffiliates();
          },
          (error) => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log(
              'file: manage-affiliate.component.ts ~ line 42 ~ this.api.CreateAffiliate ~ error',
              error
            );
          }
        );
      }
    });
  }

  editItem(id: string) {
    const item = this.affiliateData.find(item => item.id === id);
    console.log(id,'id');
    console.log(this.affiliateData,'affiliateData');
    console.log(this.affiliateData[id],'id');
    console.log(item);

    const editDialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: item,
    });

    var sub = editDialogRef
      .afterClosed()
      .subscribe((newAffiliateValue: any) => {
        sub.unsubscribe();
        console.log(newAffiliateValue , 'here aff');
        if (newAffiliateValue) {
          this.overlaySpinnerService.changeOverlaySpinner(true);
          if (id != undefined) {
            //has id
            this.apiService
              .UpdateAffiliate({
                id: this.affiliateData.find(item => item.id === id).id,
                ...newAffiliateValue,
              })
              .then(
                (res) => {
                  this.affiliateData[id] = res;
                  this.overlaySpinnerService.changeOverlaySpinner(false);
                  this.getAffiliates();
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
            this.apiService.CreateAffiliate(newAffiliateValue).then(
              (res) => {
                this.affiliateData.push(res);
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

  clickWithdraws(id: string) {
    const item = this.affiliateData.find(item => item.id === id);
    console.log(id,'id');
    console.log(this.affiliateData,'affiliateData');
    console.log(this.affiliateData[id],'id');
    console.log(item);
    this.router.navigate(['/affiliate-withdraws/', id],  { state: { data: item } });
  }
}