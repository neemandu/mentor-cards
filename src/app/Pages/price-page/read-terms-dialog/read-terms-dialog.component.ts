import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { SharedDialogsService } from 'src/app/Services/shared-dialogs.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { ApprovePurchaseDialogComponent } from '../approve-purchase-dialog/approve-purchase-dialog.component';

@Component({
  selector: 'app-read-terms-dialog',
  templateUrl: './read-terms-dialog.component.html',
  styleUrls: ['./read-terms-dialog.component.css']
})
export class ReadTermsDialogComponent implements OnInit {
  termsAccepted = false; // Initial state of the checkbox

  constructor(public dialogRef: MatDialogRef<ApprovePurchaseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PurchaseData,
  private userAuthService: UserAuthService, public dialog: MatDialog, private sharedDialogsService: SharedDialogsService, private overlaySpinnerService: OverlaySpinnerService,
  private api: APIService,
  private mixpanel: MixpanelService) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openSiteRulesModal(): void {
    this.sharedDialogsService.openSiteRulesDialog();
  }

  openApprovePurchaseDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    // dialogConfig.maxWidth = '30vw';
    dialogConfig.data = new PurchaseData(this.data.paymentStartDate, this.data.subscriptionPlanSelected);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.dialogRef.close(true);
      }
    });
  }

}
