import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/Objects/subscriptionPlans';
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
  // console.log("file: post-purchase-summery-dialog.component.ts ~ line 15 ~ data", this.data)
  }

  public navigate(path: string): void {
    this.closeDialog();
    this.ngZone.run(() => this.router.navigate([path]));
  }

  get trialMonthExpDate() {
    return this.userAuthService.trialMonthExpDate;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
