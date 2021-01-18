import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { OverlaySpinnerService } from 'src/app/Services/overlay-spinner.service';

@Component({
  selector: 'app-enter-group-id-dialog',
  templateUrl: './enter-group-id-dialog.component.html',
  styleUrls: ['./enter-group-id-dialog.component.css']
})
export class EnterGroupIdDialogComponent implements OnInit {

  userForm: FormGroup;
  inGroup: boolean = true;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EnterGroupIdDialogComponent>, private api: APIService,
    private overlaySpinnerService: OverlaySpinnerService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      groupId: ['', [Validators.required]],
    });
  }

  get formControls() { return this.userForm.controls; }

  enterGroup(): void {
    this.overlaySpinnerService.changeOverlaySpinner(true);
    // console.log(this.formControls.groupId.value)
    this.api.JoinExistingGroup({ 'groupId': this.formControls.groupId.value }).then(res => {
      // console.log("file: enter-group-id-dialog.component.ts ~ line 31 ~ this.api.IsInGroup ~ res", res)
      this.overlaySpinnerService.changeOverlaySpinner(false);
      this.dialogRef.close(true);
    }, reject => {
      // console.log("file: enter-group-id-dialog.component.ts ~ line 33 ~ this.api.IsInGroup ~ reject", reject)
      if (reject.errors[0].message.startsWith("no such Group"))
        this.formControls.groupId.setErrors({ 'noSuchGroup': true });
      else if (reject.errors[0].message === "User is not authorized to join group")
        this.formControls.groupId.setErrors({ 'userNotInGroup': true });
      this.overlaySpinnerService.changeOverlaySpinner(false);
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
