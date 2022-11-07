import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/API.service';
import { PackContent, PackInfo } from 'src/app/Objects/packs';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { UserData } from 'src/app/Objects/user-related';
import { ApprovePurchaseDialogComponent } from 'src/app/Pages/price-page/approve-purchase-dialog/approve-purchase-dialog.component';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { AboutAuthorComponent } from '../about-author/about-author.component';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css']
})
export class PackPreviewComponent implements OnInit {

  loadedCards: number = 0;
  trialPeriodDate: Date | null;
  userData: UserData;
  isYearly: boolean = false;
  yearlyPlan: SubscriptionPlan;
  monthlyPlan: SubscriptionPlan;
  discount: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: previewData, public dialogRef: MatDialogRef<PackPreviewComponent>, public dialog: MatDialog,
    private userAuthService: UserAuthService, public router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.trialPeriodDate = this.userAuthService.getTrialPeriodExpDate();
    this.userData = this.userAuthService.userData;
    if (this.data.pack.subscriptionPlans) {
      this.yearlyPlan = this.data.pack.subscriptionPlans.find(el => el.billingCycleInMonths === 12)
      this.monthlyPlan = this.data.pack.subscriptionPlans.find(el => el.billingCycleInMonths === 1)
      this.discount = Math.round((1 - (this.yearlyPlan.fullPrice / (this.monthlyPlan.fullPrice * 12))) * 100)
    }
  }

  openAboutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxWidth = '40vw';
    dialogConfig.data = this.data;
    this.dialog.open(AboutAuthorComponent, dialogConfig);
  }

  navigateToPackView(): void {
    this.navigate(`/pack-view/${this.data.pack.id}`)
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  signInSignUp(): void {
    this.closeDialog();
    this.userAuthService.showSignInModal();
  }

  monthlyYearlyChanged(): void {
    this.isYearly = !this.isYearly;
  }

  openApprovePurchaseDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxHeight = '85vh';
    dialogConfig.data = new PurchaseData(new Date(), this.isYearly ? this.yearlyPlan : this.monthlyPlan, +this.data.pack.id);
    const dialogRef = this.dialog.open(ApprovePurchaseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      dialogSub.unsubscribe();
      if (res) {
        this.dialogRef.close();
      }
    });
  }

}

export interface previewData {
  pack: PackContent | PackInfo;
  showButtons: boolean;
}