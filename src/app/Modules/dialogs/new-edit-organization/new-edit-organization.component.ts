import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateOrganizationMembershipInput, UpdateOrganizationMembershipInput } from 'src/app/API.service';

@Component({
  selector: 'app-new-edit-organization',
  templateUrl: './new-edit-organization.component.html',
  styleUrls: ['./new-edit-organization.component.css', '../mng-style.css']
})
export class NewEditOrganizationDialogComponent implements OnInit {

  orgsForm: FormGroup = this.formBuilder.group({
    days: [0, [Validators.required, Validators.min(0)]],
    name: ['', [Validators.required]],
    packsAmount: [0, [Validators.required, Validators.min(0)]],
  });
  currOrg = undefined;

  constructor(public dialogRef: MatDialogRef<NewEditOrganizationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.currOrg = this.data.org;
    if (this.currOrg) {
      this.orgsForm.controls.days.setValue(this.currOrg.membership.trialPeriodInDays);
      this.orgsForm.controls.name.setValue(this.currOrg.membership.name);
      this.orgsForm.controls.packsAmount.setValue(this.currOrg.membership.numberOfallowedCardsPacks);
    }
  }

  onSubmit(): void {
    if (this.checkOrgExists()) {
      this.orgsForm.controls.name.setErrors({ 'orgExists': true });
      return;
    }
    const res: CreateOrganizationMembershipInput | UpdateOrganizationMembershipInput = {
      id: this.currOrg ? this.currOrg.membership.id : null,
      name: this.orgsForm.controls.name.value,
      trialPeriodInDays: this.orgsForm.controls.days.value,
      numberOfallowedCardsPacks: this.orgsForm.controls.packsAmount.value,
    }
    this.dialogRef.close(res);
  }

  checkOrgExists(): boolean {
    const sameNameOrg = this.data.allOrgs.filter(org => org.membership.name === this.orgsForm.controls.name.value && this.data.org.id !== org.id)
    return sameNameOrg.length != 0;
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
