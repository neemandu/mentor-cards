import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOrganizationsInput, UpdateOrganizationsInput } from 'src/app/API.service';

@Component({
  selector: 'app-new-edit-organization',
  templateUrl: './new-edit-organization.component.html',
  styleUrls: ['./new-edit-organization.component.css', '../mng-style.css']
})
export class NewEditOrganizationComponent implements OnInit {

  orgsForm: FormGroup = this.formBuilder.group({
    days: [0, [Validators.required, Validators.min(0)]],
    name: ['', [Validators.required]],
    packsAmount: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(public dialogRef: MatDialogRef<NewEditOrganizationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    const org = this.data.org;
    if (org) {
      this.orgsForm.controls.days.setValue(org.membership.trialPeriodInDays);
      this.orgsForm.controls.name.setValue(org.membership.name);
      this.orgsForm.controls.packsAmount.setValue(org.membership.numberOfallowedCardsPacks);
    }
  }

  onSubmit(): void {
    console.log(this.data.coupon)
    const res: CreateOrganizationsInput | UpdateOrganizationsInput = {
      id: this.data.org?.id ? this.data.org.id : null,
      membersEmails: this.orgsForm.controls.discount.value,
      organizationsMembershipId: this.orgsForm.controls.days.value,
    }
    this.dialogRef.close(res);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
