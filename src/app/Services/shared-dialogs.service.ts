import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubscriptionPlan } from '../API.service';
// import { SubscriptionPlan } from '../Objects/subscriptionPlans';
import { PostPurchaseSummeryDialogComponent } from '../Shared Components/Dialogs/post-purchase-summery-dialog/post-purchase-summery-dialog.component';
import { SiteRulesDialogComponent } from '../Shared Components/Dialogs/site-rules-dialog/site-rules-dialog.component';
import { FacebookWelcomeDialogComponent } from '../Shared Components/Dialogs/facebook-welcome-dialog/facebook-welcome-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedDialogsService {
  constructor(public dialog: MatDialog) {}

  openSiteRulesDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = '80vw';
    this.dialog.open(SiteRulesDialogComponent, dialogConfig);
  }

  openPostPurchaseSummeryDialog(packSelected: SubscriptionPlan): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = packSelected;
    const dialogRef = this.dialog.open(
      PostPurchaseSummeryDialogComponent,
      dialogConfig
    );
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
    });
  }

  openFacebookWelcomeDialog(packSelected: SubscriptionPlan): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = packSelected;
    dialogConfig.maxWidth = '600px';
    const dialogRef = this.dialog.open(
      FacebookWelcomeDialogComponent,
      dialogConfig
    );
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
    });
  }
}
