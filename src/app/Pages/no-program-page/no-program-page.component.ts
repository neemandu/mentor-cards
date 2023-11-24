import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { PostPurchaseSummeryDialogComponent } from 'src/app/Shared Components/Dialogs/post-purchase-summery-dialog/post-purchase-summery-dialog.component';
import { EnterCouponCodeDialogComponent } from './enter-coupon-code-dialog/enter-coupon-code-dialog.component';
import { EnterGroupIdDialogComponent } from './enter-group-id-dialog/enter-group-id-dialog.component';

@Component({
  selector: 'app-no-program-page',
  templateUrl: './no-program-page.component.html',
  styleUrls: ['./no-program-page.component.css']
})
export class NoProgramPageComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog,
    public router: Router, private ngZone: NgZone, private userAuthService: UserAuthService) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
  }

  openPostPurchaseSummeryModal(packSelected: SubscriptionPlan): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = packSelected;
    this.videoplayer.nativeElement.pause();
    const dialogRef = this.dialog.open(PostPurchaseSummeryDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(() => {
      dialogSub.unsubscribe();
      this.videoplayer.nativeElement.play();
    });
  }

  openEnterGroupIdModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    this.videoplayer.nativeElement.pause();
    const dialogRef = this.dialog.open(EnterGroupIdDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      this.videoplayer.nativeElement.play();
      dialogSub.unsubscribe();
      if (res) {
        this.router.navigate(['all-packs-page']);
        window.location.reload();
      }
    });
  }

  openEnterCouponCodeModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    this.videoplayer.nativeElement.pause();
    const dialogRef = this.dialog.open(EnterCouponCodeDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe(res => {
      this.videoplayer.nativeElement.play();
      dialogSub.unsubscribe();
      if (res) {
        this.router.navigate(['all-packs-page']);
        window.location.reload();
      }
    });
  }

  // get trialMonthExpDate() {
  //   return this.userAuthService.trialMonthExpDate;
  // }

  // get codeCouponExpDate() {
  //   return this.userAuthService.codeCouponExpDate;
  // }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigate([path]));
  }

}
