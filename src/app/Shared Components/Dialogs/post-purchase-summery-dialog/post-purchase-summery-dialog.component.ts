import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/API.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';

@Component({
  selector: 'app-post-purchase-summery-dialog',
  templateUrl: './post-purchase-summery-dialog.component.html',
  styleUrls: ['./post-purchase-summery-dialog.component.css']
})
export class PostPurchaseSummeryDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SubscriptionPlan, public dialogRef: MatDialogRef<PostPurchaseSummeryDialogComponent>, 
  public router: Router, private ngZone: NgZone, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
  }

  public navigate(path: string): void {
    this.closeDialog();
    this.ngZone.run(() => this.router.navigate([path]));
  }

  get trialPeriodExpDate() {
    return this.userAuthService.trialPeriodExpDate;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
