import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-org-members-dialog',
  templateUrl: './org-members-dialog.component.html',
  styleUrls: ['./org-members-dialog.component.css', '../mng-style.css']
})
export class OrgMembersDialogComponent implements OnInit {

  orgMembersForm: FormGroup = this.formBuilder.group({
    members: ['', [Validators.required]],
  });
  textAreaRows: number = 5;
  badAddress: string = '';

  constructor(public dialogRef: MatDialogRef<OrgMembersDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.data.membersEmails.length > 0 ? this.textAreaRows = this.data.membersEmails.length + 2 : null;
    this.orgMembersForm.controls.members.setValue(this.data.membersEmails.join('\n'));
  }

  onSubmit(): void {
    this.badAddress = ''
    const emails = this.orgMembersForm.controls.members.value.split('\n');
    emails.forEach(email => {
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        this.badAddress = email;
        this.orgMembersForm.controls.members.setErrors({ 'badEmail': true });
      }
    });
    this.badAddress ? null : this.dialogRef.close(emails);

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
