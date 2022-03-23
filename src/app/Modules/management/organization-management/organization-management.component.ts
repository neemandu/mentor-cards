import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { ManagementService } from 'src/app/Services/management.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.css']
})
export class OrganizationManagementComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['edit', 'remove', 'name', 'trialLength', 'amountOfPacks', 'orgUsers'];
  orgsData: any[];

  constructor(private api: APIService, public dialog: MatDialog, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource([]);
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListOrganizationss().then((res) => {
      this.orgsData = [...res.items]
      this.dataSource = new MatTableDataSource(this.orgsData);
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 38 ~ this.api.ListOrganizationss ~ this.organizations", this.orgsData)
      this.mngService.overlaySpinner(false);
    });
  }

  newEdit(oldOrg?, index?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {};
    // const dialogRef = this.dialog.open(NewEditCouponDialogComponent, dialogConfig);
    // var dialogSub = dialogRef.afterClosed().subscribe(newCoupon => {
    //   dialogSub.unsubscribe();
    //   if (!newCoupon) return;
    //   this.mngService.overlaySpinner(true);
    //   (oldCoupon ? this.api.UpdateCouponCodes(newCoupon) : this.api.CreateCouponCodes(newCoupon)).then(res => {
    //     this.mngService.overlaySpinner(false);
    //     if (res.allowedCardsPacks && res.allowedCardsPacks.length != 0) {
    //       res['packsNames'] = this.getPackNames(res);
    //     }
    //     if (oldCoupon) {
    //       this.couponData.splice(index, 1, res);
    //     }
    //     else {
    //       this.couponData = [...this.couponData, res];
    //     }
    //     this.dataSource = new MatTableDataSource(this.couponData);
    //     this.mngService.snackBarPositive("הקופון נשמר בהצלחה");
    //   }, error => {
    //     this.mngService.overlaySpinner(false);
    //     this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
    //     console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 54 ~ error", error)
    //   })
    // });
  }

  remove(org, index): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת קוד הטבה", [`האם למחוק את ארגון "${org.membership.name}"`], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (!res) return;
      this.mngService.overlaySpinner(true);
      this.api.DeleteOrganizations({ id: org.id }).then(res => {
        this.mngService.overlaySpinner(false);
        this.orgsData.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.orgsData);
        this.mngService.snackBarPositive("הארגון נמחק בהצלחה");
      }, error => {
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 49 ~ this.api.DeleteCouponCodes ~ error", error)
      });
    });
  }

  showMembers(org, index): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
