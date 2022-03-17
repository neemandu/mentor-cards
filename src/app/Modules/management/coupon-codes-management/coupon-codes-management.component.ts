import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService, ListCouponCodessQuery } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { ManagementService } from 'src/app/Services/management.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { NewEditCouponDialogComponent } from '../../dialogs/new-edit-coupon-dialog/new-edit-coupon-dialog.component';

@Component({
  selector: 'app-coupon-codes-management',
  templateUrl: './coupon-codes-management.component.html',
  styleUrls: ['./coupon-codes-management.component.css']
})

export class CouponCodesManagementComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['edit', 'remove', 'trialLength', 'code', 'packIds', 'org', 'discount'];
  couponData: any[];

  constructor(private api: APIService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListCouponCodess().then(res => {
      this.couponData = [...res.items]
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 28 ~ this.api.ListCouponCodess ~ this.couponData", this.couponData)
      this.dataSource = new MatTableDataSource(this.couponData);
    });
  }

  newEditCoupon(coupon?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = coupon;
    const dialogRef = this.dialog.open(NewEditCouponDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(coupon => {
      dialogSub.unsubscribe();
      
    });
  }

  removeCoupon(coupon, index): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("מחיקת קוד הטבה", [`האם למחוק קוד הטבה ${coupon.couponCode}`], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: boolean) => {
      dialogSub.unsubscribe();
      if (!res) return;
      this.api.DeleteCouponCodes({ id: coupon.id }).then(res => {
        this.couponData.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.couponData);
      }, error => {
        console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 49 ~ this.api.DeleteCouponCodes ~ error", error)
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
