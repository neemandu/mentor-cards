import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService, OrganizationMembership } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { CardsService } from 'src/app/Services/cards.service';
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
  displayedColumns: string[] = ['edit', 'remove', 'trialLength', 'code', 'packNames', 'org', 'discount'];
  couponData: any[];
  organizations: any[];

  constructor(private api: APIService, public dialog: MatDialog, public mngService: ManagementService) { }

  ngOnInit(): void {
    this.mngService.overlaySpinner(true);
    this.dataSource = new MatTableDataSource([]);
    this.getAllData();
  }

  getAllData(): void {
    this.api.ListCouponCodess().then((res) => {
      this.couponData = [...res.items]
      this.couponData.forEach(coupon => {
        coupon['packsNames'] = this.getPackNames(coupon);
      });
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 28 ~ this.api.ListCouponCodess ~ this.couponData", this.couponData)
      this.dataSource = new MatTableDataSource(this.couponData);
      this.mngService.overlaySpinner(false);
    });
    this.api.ListOrganizationss().then((res) => {
      this.organizations = [...res.items]
      console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 38 ~ this.api.ListOrganizationss ~ this.organizations", this.organizations)
    });
  }

  newEditCoupon(oldCoupon?): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { coupon: oldCoupon, organizations: this.organizations, allPacks: this.mngService.getAllPacks() };
    const dialogRef = this.dialog.open(NewEditCouponDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(newCoupon => {
      dialogSub.unsubscribe();
      if (!newCoupon) return;
      this.mngService.overlaySpinner(true);
      (oldCoupon ? this.api.UpdateCouponCodes(newCoupon) : this.api.CreateCouponCodes(newCoupon)).then(res => {
        this.mngService.overlaySpinner(false);
        res['packsNames'] = this.getPackNames(res);
        this.couponData = [...this.couponData, res];
        this.dataSource = new MatTableDataSource(this.couponData);
        this.mngService.snackBarPositive("הקופון נשמר בהצלחה");
      }, error => {
        this.mngService.overlaySpinner(false);
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 54 ~ error", error)
      })
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
      this.mngService.overlaySpinner(true);
      this.api.DeleteCouponCodes({ id: coupon.id }).then(res => {
        this.mngService.overlaySpinner(false);
        this.couponData.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.couponData);
        this.mngService.snackBarPositive("הקופון נמחק בהצלחה");
      }, error => {
        this.mngService.snackBarNegative("קרתה שגיאה, נסו שוב מאוחר יותר");
        console.log("🚀 ~ file: coupon-codes-management.component.ts ~ line 49 ~ this.api.DeleteCouponCodes ~ error", error)
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getPackNames(coupon): string[] {
    const packs = (this.mngService.getAllPacks().filter(pack => coupon.allowedCardsPacks.includes(pack.id)))
    return packs.map(pack => pack.name);
  }
}


export interface Coupon {
  allowedCardsPacks: Array<string | null> | null;
  couponCode: string | null;
  createdAt: string;
  discount: number | null;
  id: string;
  organization: OrganizationMembership | null;
  trialPeriodInDays: number | null;
  updatedAt: string;
  __typename: string;
}