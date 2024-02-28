import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { addDialogComponent } from './add-dialog/add-dialog.component';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';

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
}

@Component({
  selector: 'app-manage-affiliate',
  templateUrl: './manage-affiliate.component.html',
  styleUrls: ['./manage-affiliate.component.css'],
})
export class ManageAffiliateComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  displayedColumn: string[] = [
    'affiliateID',
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
    private apiService: APIService
  ) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
    this.dtOptions = {
      columnDefs: [
        { orderable: false, targets: [0] }, // replace 0 with the indexes of the columns you want to disable sorting for
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Hebrew.json',
      },
    };
    this.overlaySpinnerService.changeOverlaySpinner(true);
    this.apiService.ListAffiliates().then(
      (affiliate) => {
        this.affiliateData = affiliate.items;
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

  // ID: 'qbn1p2bqv9cn7jr8ututw';
  // affiliateUrl: 'asd';
  // commissionPercentage: 'asd';
  // contactEmail: 'ada';
  // paymentDetails: 'asd';
  // phoneNumber: 'ada';
  // status: true;
  // websiteURL: 'asd';

  // export type CreateAffiliateInput = {
  //   id?: string | null;
  //   affiliateID: string;
  //   affiliateUrl?: string | null;
  //   contactEmail?: string | null;
  //   phoneNumber?: string | null;
  //   websiteURL?: string | null;
  //   paymentDetails?: string | null;
  //   commissionPercentage?: number | null;
  //   dateJoined?: string | null;
  //   status?: string | null;
  //   balance?: number | null;
  //   withdraws?: Array<WithdrawInput | null> | null;
  // };

  deleteItem(index: any): void {
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
          .DeleteAffiliate({ id: this.affiliateData[index].id })
          .then(
            (res) => {
              this.affiliateData.splice(index, 1);
              this.overlaySpinnerService.changeOverlaySpinner(false);
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
        // Generate a random ID
        const id =
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);

        // Add the id to the result object
        result.id = id;

        console.log(result);
        this.apiService.CreateAffiliate(result).then(
          (res) => {
            this.affiliateData = [...this.affiliateData, res];
            this.overlaySpinnerService.changeOverlaySpinner(false);
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

  // this.api.CreateOrganizations({ organizationsMembershipId: orgId }).then(res => {
  //   this.orgsData = [...this.orgsData, res];
  //   this.dataSource = new MatTableDataSource(this.orgsData);
  //   this.mngService.overlaySpinner(false);
  //   this.mngService.snackBarPositive("הארגון נשמר בהצלחה");
  // }, error => {
  //   console.log("🚀 ~ file: organization-management.component.ts ~ line 64 ~ this.api.CreateOrganizations ~ error", error)
  //   this.mngService.overlaySpinner(false);
  //   this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
  // })
  editItem(index: number) {
    const item = this.affiliateData[index];

    const editDialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: item,
    });

    var sub = editDialogRef
      .afterClosed()
      .subscribe((newAffiliateValue: any) => {
        sub.unsubscribe();
        if (newAffiliateValue) {
          this.overlaySpinnerService.changeOverlaySpinner(true);
          if (index != undefined) {
            //has id
            this.apiService
              .UpdateAffiliate({
                id: this.affiliateData[index].id,
                ...newAffiliateValue,
              })
              .then(
                (res) => {
                  this.affiliateData[index] = res;
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
}
