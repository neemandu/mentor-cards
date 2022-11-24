import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { APIService } from 'src/app/API.service';
import { DynamicDialogData } from 'src/app/Objects/dynamic-dialog-data';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { UserData } from 'src/app/Objects/user-related';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { DynamicDialogYesNoComponent } from 'src/app/Shared Components/Dialogs/dynamic-dialog-yes-no/dynamic-dialog-yes-no.component';
import { ApprovePurchaseDialogComponent } from '../../price-page/approve-purchase-dialog/approve-purchase-dialog.component';
import { PlanTableObj } from '../user-page.component';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.css']
})
export class PlanTableComponent implements OnInit {

  displayedColumns: string[] = ['planName', 'price', 'startDate', 'nextChargeDate', 'yearlyMonthly', 'updateDate', 'cancel'];
  @Input() tableData: PlanTableObj[];
  @Input() userData: UserData;
  dataSource: MatTableDataSource<PlanTableObj>

  constructor(public dialog: MatDialog, private overlaySpinnerService: OverlaySpinnerService, private api: APIService,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<PlanTableObj>(this.tableData);
    // console.log("🚀 ~ file: plan-table.component.ts ~ line 27 ~ ngOnInit ~ this.tableData", this.tableData)
  }

  openCancelDialogModal(element: PlanTableObj, index: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = new DynamicDialogData("ביטול החיוב האוטומטי", ["האם לבטל את החיוב האוטומטי לתכנית זו?"], "אישור", "ביטול")
    const dialogRef = this.dialog.open(DynamicDialogYesNoComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.overlaySpinnerService.changeOverlaySpinner(true)
        this.api.Unsubscribe({ 'username': this.userAuthService.userData.username, 'providerTransactionId': element.providerTransactionId }).then((res2) => {
          this.userAuthService._snackBar.open('החיוב האוטומטי בוטל בהצלחה', '', {
            duration: 10000,
            panelClass: ['rtl-snackbar']
          });
          window.location.reload();
        }, reject => {
          console.log("file: user-page.component.ts ~ line 77 ~ this.api.Unsubscribe ~ reject", reject)
          this.overlaySpinnerService.changeOverlaySpinner(false)
          this.userAuthService._snackBar.open('שגיאה בביטול התכנית. נסו שנית בעוד מספר דקות', '', {
            duration: 10000,
            panelClass: ['rtl-snackbar']
          });
        })
      }
    });
  }

  openApprovePurchaseDialog(element: PlanTableObj): void {
    console.log("🚀 ~ file: plan-table.component.ts ~ line 64 ~ openApprovePurchaseDialog ~ element", element)
    if (element.homePlan) {
      this.openApproveHomePlanPurchaseDialog()
    } else {
      this.openApproveExternalPlanPurchaseDialog(element)
    }
  }

  openApproveHomePlanPurchaseDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    // dialogConfig.maxWidth = '30vw';
    dialogConfig.data = new PurchaseData(new Date(), this.userData.subscription.subscriptionPlan);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
      }
    });
  }
  
  openApproveExternalPlanPurchaseDialog(element): void {
    console.log(this.userData.externalPacksSubscriptions)
    const plan = this.userData.externalPacksSubscriptions.find(el => el.providerTransactionId === element.providerTransactionId).subscriptionPlan;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.data = new PurchaseData(new Date(), plan, +this.userData.externalPacksSubscriptions[0].includedCardPacksIds[0].id);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        window.location.reload();
      }
    });
  }

}
