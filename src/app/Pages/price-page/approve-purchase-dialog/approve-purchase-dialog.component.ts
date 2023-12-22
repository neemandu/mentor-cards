import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { APIService, updatePaymentProgramInput } from 'src/app/API.service';
import { PurchaseData } from 'src/app/Objects/purchase-data';
import { MixpanelService } from 'src/app/Services/mixpanel.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';
import { SharedDialogsService } from 'src/app/Services/shared-dialogs.service';
import { UserAuthService } from 'src/app/Services/user-auth.service';
declare var paypal;

@Component({
  selector: 'app-approve-purchase-dialog',
  templateUrl: './approve-purchase-dialog.component.html',
  styleUrls: ['./approve-purchase-dialog.component.css']
})
export class ApprovePurchaseDialogComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  render_id: String = "";
  isPaypalEnabled = false;

  constructor(public dialogRef: MatDialogRef<ApprovePurchaseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PurchaseData,
    private userAuthService: UserAuthService, private sharedDialogsService: SharedDialogsService, private overlaySpinnerService: OverlaySpinnerService,
    private api: APIService,
    private mixpanel: MixpanelService) { }

  ngOnInit(): void {
    
  }

  handleCheckboxChange() {
    if (this.isPaypalEnabled && this.render_id === '') {
      this.renderPayPalButtons();
    }  else {
      this.hidePayPalButtons();
    }
  }

  hidePayPalButtons() {
    this.render_id = '';
    const paypalEl = this.paypalElement.nativeElement;
    paypalEl.innerHTML = ''; 
  }

  renderPayPalButtons() {
    // Logic to render PayPal buttons
    let plan_id = this.data.subscriptionPlanSelected.providerPlanId;
    this.render_id = 'paypal-button-container-' + plan_id;
    paypal
      .Buttons({
        createSubscription: (data, actions) => {//lastPlanSubstitutionDate - once in last 30 days
          // debugger
          if (this.userAuthService.userData?.status === "NOPLAN" || this.data.packId)
            return actions.subscription.create({
              'plan_id': plan_id
            });
          else if (this.userAuthService.userData?.status === "PLAN")
            return actions.subscription.revise(this.userAuthService.userData.subscription.providerTransactionId, {
              'plan_id': plan_id
            });
        },
        onApprove: async (data, actions) => {
          this.mixpanel.track("PlanPurchase", {"Provider": "PayPal", 
          "Plan ID": plan_id, 
          "Transaction ID": data.subscriptionID,
          "Subscription Plan": this.data.subscriptionPlanSelected, 
          "Subscription name": this.data.subscriptionPlanSelected.name,
          "Billing cycle": this.data.subscriptionPlanSelected.billingCycleInMonths,
          "Full price": this.data.subscriptionPlanSelected?.fullPrice,
          "Pack ID": this.data.packId});
          
          this.overlaySpinnerService.changeOverlaySpinner(true);
          var ids: updatePaymentProgramInput = { 'paymentProgramId': this.data.subscriptionPlanSelected.id, 'providerTransactionId': data.subscriptionID, 'packId': this.data.packId ? this.data.packId : -1 }
          this.api.UpdatePaymentProgram(ids).then(data => {
            this.userAuthService._snackBar.open('הרשמתך לתכנית בוצעה בהצלחה!', '', {
              duration: 4000,
              panelClass: ['rtl-snackbar']
            });
            this.userAuthService.loggedIn();
            this.overlaySpinnerService.changeOverlaySpinner(false);
            this.dialogRef.close(true);
            this.sharedDialogsService.openPostPurchaseSummeryDialog(this.data.subscriptionPlanSelected);
          }, error => {
            this.overlaySpinnerService.changeOverlaySpinner(false);
            console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 71 ~ ProgramChoiseDialogComponent ~ this.api.UpdatePaymentProgram ~ error", error)
          })
        },
        onError: err => {
          console.log("🚀 ~ file: program-choise-dialog.component.ts ~ line 77 ~ ProgramChoiseDialogComponent ~ stepChanged ~ err", err)
        },
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay',
        }
      })
      .render('#paypal');  }

  openSiteRulesModal(): void {
    this.sharedDialogsService.openSiteRulesDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
