import { Component, Inject, NgZone, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/API.service';
import { PackContent, PackInfo } from 'src/app/Objects/packs';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { UserData } from 'src/app/Objects/user-related';
import { ApprovePurchaseDialogComponent } from 'src/app/Pages/price-page/approve-purchase-dialog/approve-purchase-dialog.component';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { AboutAuthorComponent } from '../about-author/about-author.component';
import { Platform } from '@angular/cdk/platform';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';
import { PackDataService } from 'src/app/Services/pack-data.service';
const millisecondsInMonth: number = 2505600000;

@Component({
  selector: 'app-pack-preview',
  templateUrl: './pack-preview.component.html',
  styleUrls: ['./pack-preview.component.css'],
})
export class PackPreviewComponent implements OnInit {
  loadedCards: number = 0;
  trialPeriodDate: Date | null;
  userData: UserData;
  isYearly: boolean = false;
  yearlyPlan: SubscriptionPlan;
  monthlyPlan: SubscriptionPlan;
  discount: number;
  neverShowAgain: boolean = false;
  isMobile: boolean = false;
  isExpland: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: previewData,
    public dialogRef: MatDialogRef<PackPreviewComponent>,
    public dialog: MatDialog,
    private userAuthService: UserAuthService,
    public router: Router,
    private ngZone: NgZone,
    private mixpanel: MixpanelService,
    private platform: Platform,
    public langDirectionService: LangDirectionService,
    private packDataService: PackDataService
  ) {
    this.userData = this.userAuthService.userData;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const dialogElement = document.querySelector('.mat-dialog-container');
      if (dialogElement) {
        dialogElement.addEventListener('mouseleave', this.closeDialog);
      }
    });
  }

  ngOnInit(): void {
    console.log('pack preview', this.data.pack);
    let sub = this.userAuthService.userDataEmmiter.subscribe(() => {
      sub.unsubscribe();
      this.closeDialog();
    });
    const ls = localStorage.getItem('packsToOpenAutomatically');
    console.log('Top questions retrieved:', ls);
    const packsToOpenAutomatically = ls ? ls.split(',') : [];
    if (
      packsToOpenAutomatically.includes(this.data.pack.id) &&
      this.data.pack.cards.length !== 0
    ) {
      this.navigateToPackView(true);
    }

    this.trialPeriodDate = this.userAuthService.getTrialPeriodExpDate();
    if (this.data.pack.subscriptionPlans) {
      this.yearlyPlan = this.data.pack.subscriptionPlans.find(
        (el) => el?.billingCycleInMonths === 12
      );
      if (this.yearlyPlan) {
        this.yearlyPlan['priceForMentorCardsMembers'] =
          Math.round(
            this.yearlyPlan?.fullPrice *
              (1 - this.yearlyPlan?.discount / 100) *
              10
          ) / 10;
      }

      this.monthlyPlan = this.data.pack.subscriptionPlans.find(
        (el) => el?.billingCycleInMonths === 1
      );
      console.log(this.monthlyPlan, 'this.monthlyPlan');
      
      if (this.monthlyPlan) {
        this.monthlyPlan['priceForMentorCardsMembers'] =
          Math.round(
            this.monthlyPlan?.fullPrice *
              (1 - this.monthlyPlan?.discount / 100) *
              10
          ) / 10;
      }
      this.discount = Math.round(
        (1 - this.yearlyPlan?.fullPrice / (this.monthlyPlan?.fullPrice * 12)) *
          100
      );
    }

    if (this.platform.ANDROID || this.platform.IOS) {
      this.isMobile = true;
    }

    // Set top questions in PackDataService
    if (this.data.pack.topQuestions) {
      this.packDataService.setTopQuestions(this.data.pack.topQuestions);
      console.log('Top questions set:', this.data.pack.topQuestions);
    }
  }

  redirect(): string {
    this.mixpanel.track('RedirectToExternalCreator', {
      'Pack ID': this.data.pack.id,
      'Pack name': this.data.pack?.name,
      Link: this.data.pack?.about.link,
    });

    return this.data.pack.about.link
    // window.open(this.data.pack.about.link, '_blank');
  }

  openAboutDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxWidth = '40vw';
    dialogConfig.data = this.data;
    this.dialog.open(AboutAuthorComponent, dialogConfig);
  }

  toggleIsExpand(): void {
    this.isExpland = !this.isExpland;
  }

  navigateToPackView(exists): void {
    if (!exists && this.neverShowAgain) {
      const ls = localStorage.getItem('packsToOpenAutomatically');
      const packsToOpenAutomatically = ls ? ls.split(',') : [];
      localStorage.setItem(
        'packsToOpenAutomatically',
        [...packsToOpenAutomatically, this.data.pack.id].toString()
      );
    }
    this.navigate(`/pack-view/${this.data.pack.id}`);
  }

  navigate(path: string): void {
    this.closeDialog();
    this.ngZone.run(() => this.router.navigate([path]));
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
    dialogConfig.data = new PurchaseData(
      new Date(),
      this.isYearly ? this.yearlyPlan : this.monthlyPlan,
      +this.data.pack.id
    );
    const dialogRef = this.dialog.open(
      ApprovePurchaseDialogComponent,
      dialogConfig
    );
    var dialogSub = dialogRef.afterClosed().subscribe((res) => {
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
