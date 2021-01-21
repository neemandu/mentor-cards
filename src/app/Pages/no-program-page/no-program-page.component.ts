import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { PostPurchaseSummeryDialogComponent } from 'src/app/Shared Components/Dialogs/post-purchase-summery-dialog/post-purchase-summery-dialog.component';
import { EnterGroupIdDialogComponent } from './enter-group-id-dialog/enter-group-id-dialog.component';
import { ProgramChoiseDialogComponent } from './program-choise-dialog/program-choise-dialog.component';

@Component({
  selector: 'app-no-program-page',
  templateUrl: './no-program-page.component.html',
  styleUrls: ['./no-program-page.component.css']
})
export class NoProgramPageComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: ElementRef;

  constructor(private overlaySpinnerService: OverlaySpinnerService, public dialog: MatDialog, public router: Router) {
    this.overlaySpinnerService.changeOverlaySpinner(false);
  }

  ngOnInit(): void {
  }

  openChooseProgramModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.maxHeight = '85vh';
    this.videoplayer.nativeElement.pause();
    const dialogRef = this.dialog.open(ProgramChoiseDialogComponent, dialogConfig);
    var dialogSub = dialogRef.afterClosed().subscribe((res: SubscriptionPlan) => {
      this.videoplayer.nativeElement.play();
      dialogSub.unsubscribe();
      if (res) {
        this.openPostPurchaseSummeryModal(res);
      }
    });
  }

  openPostPurchaseSummeryModal(packSelected: SubscriptionPlan): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
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
    dialogConfig.disableClose = false;
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

}
