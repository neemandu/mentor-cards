import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubscriptionPlan } from 'src/app/API.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
import { LangDirectionService } from 'src/app/Services/LangDirectionService.service';

@Component({
  selector: 'app-facebook-welcome-dialog',
  templateUrl: './facebook-welcome-dialog.component.html',
  styleUrls: ['./facebook-welcome-dialog.component.css'],
})
export class FacebookWelcomeDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SubscriptionPlan,
    public dialogRef: MatDialogRef<FacebookWelcomeDialogComponent>,
    public router: Router,
    private ngZone: NgZone,
    private userAuthService: UserAuthService,
    public langDirectionService: LangDirectionService
  ) {}

  ngOnInit(): void {}

  public navigate(path: string): void {
    this.closeDialog();
    this.ngZone.run(() => this.router.navigate([path]));
  }

  openFacebookGroup(): void {
    // Open Facebook group in new tab - Replace with your actual Facebook group URL
    window.open('https://www.facebook.com/groups/mentorcards', '_blank');
    // After opening Facebook, close this dialog
    this.closeDialog();
  }

  get trialPeriodExpDate() {
    return this.userAuthService.trialPeriodExpDate;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
