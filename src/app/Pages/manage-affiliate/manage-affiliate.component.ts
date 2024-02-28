import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { addDialogComponent } from './add-dialog/add-dialog.component';
import { Subject } from 'rxjs';
import { APIService } from 'src/app/API.service';

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



// affiliateID
// affiliateUrl
// contactEmail
// phoneNumber
// websiteURL
// paymentDetails
// commissionPercentage
// status

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
   
  affiliateData: any[] ;
  
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
        { orderable: false, targets: [0] } // replace 0 with the indexes of the columns you want to disable sorting for
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Hebrew.json'
      }
    };
    this.apiService.ListAffiliates().then(res => {
      this.affiliateData = [...res.items];
      console.log(this.affiliateData,'here');
    });
  }
  deleteItem(id: string) {
    this.affiliateData = this.affiliateData.filter(
      (item) => item.id !== id
    );
  }

  openAddDialog() {
    const addDialofRef = this.dialog.open(addDialogComponent, {
      width: '250px',
    });

    addDialofRef.afterClosed().subscribe((result) => {
      if (result) {
        // Generate a random ID
        const ID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
        // Add the ID to the result object
        result.ID = ID;
      
        console.log(result);
        this.apiService.CreateAffiliate(result).then(res => {
          this.affiliateData = [...this.affiliateData, res];
        });
      }
    });
  }

  editItem(index: number) {
    const item = this.affiliateData[index];

    const editDialogRef = this.dialog.open(EditDialogComponent, {
      width: '250px',
      data: item,
    });

    editDialogRef.afterClosed().subscribe((result) => {
      if (result) {
          console.log(result);
      }
    });
  }
}
